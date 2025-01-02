'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { User } from '../db/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const AccountFormSchema = z.object({
    user_id: z.string(),
    first_name: z.string({
        required_error: 'Please provide a first name',
        invalid_type_error: 'Please provide a valid first name',
    }),
    middle_name: z.string({
        invalid_type_error: 'Please provide a valid middle name',
    }).optional(),
    last_name: z.string({
        required_error: 'Please provide a last name',
        invalid_type_error: 'Please provide a valid last name',
    }),
    email: z.string()
        .email('Please provide a valid email address'),
    password: z.string()
        .min(1, 'Please provide a password'),
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
    message: {
        status: string;
        text: string;
    };
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
            message: {
                status: 'error',
                text: 'Missing or Invalid Fields. Failed to Login.',
            },
        };
    }

    const { email, password } = validatedFields.data

    try {
        const user = await sql<User>`SELECT * FROM dev.test_user WHERE email=${email} AND password=${password}`;
        if (user.rows[0]) {
            return {
                message: {
                    status: 'success',
                    text: `Welcome, ${user.rows[0]['first_name']}!`
                }
            };
        } else {
            return {
                message: {
                    status: 'error',
                    text: 'The email and/or password you entered was invalid. Please try again or create an account.',
                }
            };
        }
    } catch (error) {
        console.log(error);
        return {
            message: {
                status: 'error',
                text: 'Database Error: Failed to Login.'
            }
        };
    }
    
    revalidatePath('/');
    redirect('/');
}

const CreateUser = AccountFormSchema.omit({
    user_id: true,
})

export async function createUser(prevState: AuthState, formData: FormData) {
    const validatedFields = CreateUser.safeParse({
        first_name: formData.get('first_name'),
        middle_name: formData.get('middle_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: {
                status: 'error',
                text: 'Missing or Invalid Fields. Failed to create account.'
            }
        };
    }

    // const { first_name, middle_name, last_name, email, password, phone } = validatedFields.data;
    const { email } = validatedFields.data; // Temporary code while other variables are not in use

    try {
        const duplicateEmail = await sql`SELECT COUNT(*) FROM dev.test_user WHERE email = ${email}`;
        console.log(duplicateEmail);
        if (duplicateEmail.rows[0].count > 0) {
            return {
                message: {
                    status: 'error',
                    text: 'The email address submitted is already associated with another account. Please use a different email address.'
                }
            }
        }
    } catch (error) {
        console.log(error);
        return {
            message: {
                status: 'error',
                text: 'Database error. Failed to create account.'
            }
        }
    }

    return {
        message: {
            status: 'success',
            text: 'Account Creation Initiated'
        }
    }
}