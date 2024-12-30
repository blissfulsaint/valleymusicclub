'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { User } from '../db/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const AccountFormSchema = z.object({
    user_id: z.string(),
    first_name: z.string({
        invalid_type_error: 'Please provide a valid first name',
    }),
    middle_name: z.string({
        invalid_type_error: 'Please provide a valid middle name',
    }).optional(),
    last_name: z.string({
        invalid_type_error: 'Please provide a valid last name',
    }),
    email: z.string({
        invalid_type_error: 'Please provide a valid email address',
    }).email(),
    password: z.string(),
    phone: z.string().regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        "Invalid phone number format"
    ).optional(),
});

export type AuthState = {
    errors?: {
        user_id?: string[];
        first_name?: string[];
        middle_name?: string[];
        last_name?: string[];
        email?: string[];
        password?: string[];
        phone?: string[];
    };
    message: string;
}

const AuthenticateUser = AccountFormSchema.omit({
    user_id: true,
    first_name: true,
    middle_name: true,
    last_name: true,
    phone: true,
})

export async function authenticateUser(prevState: AuthState, formData: FormData) {
    const validatedFields = AuthenticateUser.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Login.'
        };
    }

    const { email, password } = validatedFields.data

    try {
        const user = await sql<User>`SELECT * FROM dev.test_user WHERE email=${email} AND password=${password}`;
        if (user.rows[0]) {
            return { message: `Welcome, ${user.rows[0]['first_name']}!`};
        } else {
            return { message: 'Login failed.'};
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'Database Error: Failed to Login.'
        };
    }
    
    revalidatePath('/');
    redirect('/');
}

export async function createUser() {

}