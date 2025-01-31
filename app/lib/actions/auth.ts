'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { User } from '../db/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { generateToken } from '../utils/jwt';
import { cookies } from 'next/headers';
import { verifyToken } from '../utils/jwt';

const AccountFormSchema = z.object({
    id: z.string(),
    first_name: z.string({
        invalid_type_error: 'Please provide a valid first name',
    })
        .min(1, 'Please provide a first name'),
    middle_name: z.string({
        invalid_type_error: 'Please provide a valid middle name',
    }).optional(),
    last_name: z.string({
        invalid_type_error: 'Please provide a valid last name',
    })
        .min(1, 'Please provide a first name'),
    email: z.string()
        .email('Please provide a valid email address'),
    password: z.string()
        .min(8, 'Please provide a password longer than 8 characters'),
    phone: z.string()
        .regex(
          /^$|^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
          "Please provide a valid phone number"
        )
        .optional()
});

export type AuthState = {
    errors?: {
        id?: string[];
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
    id: true,
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
        const user = await sql<User>`SELECT * FROM dev.test_user WHERE email=${email}`;

        if (!user.rows[0]) {
            return {
                message: {
                    status: 'error',
                    text: 'Invalid email or password.',
                },
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

        if (!isPasswordValid) {
            return {
                message: {
                    status: 'error',
                    text: 'Invalid email or password.',
                },
            };
        }

        // ✅ Set the auth token
        const token = generateToken({ id: user.rows[0].id, email });

        (await cookies()).set('auth_token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        });
    } catch (error) {
        console.log(error);
        return {
            message: {
                status: 'error',
                text: 'Database Error: Failed to Login.'
            }
        };
    }
    
    revalidatePath('/account');
    redirect('/account');
}

const CreateUser = AccountFormSchema.omit({
    id: true,
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

    const { first_name, middle_name, last_name, email, password, phone } = validatedFields.data;

    try {
        const duplicateEmail = await sql`SELECT COUNT(*) FROM dev.test_user WHERE email = ${email}`;
        const duplicatePhone = await sql`SELECT COUNT(*) FROM dev.test_user WHERE phone = ${phone}`;
        
        if (duplicateEmail.rows[0].count > 0) {
            return {
                message: {
                    status: 'error',
                    text: 'Email is already in use.'
                }
            }
        };

        if (duplicatePhone.rows[0].count > 0) {
            return {
                message: {
                    status: 'error',
                    text: 'Phone number is already in use.'
                }
            }
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await sql`
            INSERT INTO dev.test_user (first_name, middle_name, last_name, email, password, phone)
            VALUES (${first_name}, ${middle_name}, ${last_name}, ${email}, ${hashedPassword}, ${phone})
            RETURNING id, email
        `

        const token = generateToken({ id: newUser.rows[0].id, email});

        (await cookies()).set('auth_token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        })

        revalidatePath('/account');
        redirect('/account');

        return {
            message: {
                status: 'success',
                text: 'Account Created Successfully!',
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
}

export async function logoutUser() {
    (await cookies()).set('auth_token', '', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Immediately expires
    });

    revalidatePath('/');
    redirect('/');
}

export async function getAuthStatus() {
    const authToken = (await cookies()).get('auth_token')?.value;

    if (!authToken) {
        return { isAuthenticated: false };
    }

    try {
        const user = verifyToken(authToken);
        return { isAuthenticated: !!user, user };
    } catch (error) {
        return { isAuthenticated: false, error: error };
    }
}