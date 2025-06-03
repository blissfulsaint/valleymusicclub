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
    user_id: z.string(),
    first_name: z.string({
        invalid_type_error: 'Please provide a valid first name',
    })
        .min(1, 'Please provide a first name'),
    middle_name: z.string({
        invalid_type_error: 'Please provide a valid middle name',
    }).optional().transform(value => value?.trim() === '' ? null : value),
    last_name: z.string({
        invalid_type_error: 'Please provide a valid last name',
    })
        .min(1, 'Please provide a last name'),
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
        .transform(value => value?.trim() === '' ? null : value)
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
        const user = await sql<User>`SELECT * FROM public.user WHERE email=${email}`;

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
        const token = generateToken({ 
            user_id: user.rows[0].user_id, 
            email, 
            first_name: user.rows[0].first_name,
            middle_name: user.rows[0].middle_name,
            last_name: user.rows[0].last_name,
            phone: user.rows[0].phone 
        });

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

    return {
        message: {
            status: 'success',
            text: 'Successfully logged in!',
        },
    };
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

    const { first_name, middle_name, last_name, email, password, phone } = validatedFields.data;

    try {
        const duplicateEmail = await sql`SELECT COUNT(*) FROM public.user WHERE email = ${email}`;
        const duplicatePhone = phone ? await sql`SELECT COUNT(*) FROM public.user WHERE phone = ${phone}` : { rows: [{ count: 0 }] };
        
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
            INSERT INTO public.user (first_name, middle_name, last_name, email, password, phone)
            VALUES (${first_name}, ${middle_name}, ${last_name}, ${email}, ${hashedPassword}, ${phone})
            RETURNING user_id, email
        `

        const token = generateToken({ 
            user_id: newUser.rows[0].id, 
            email, 
            first_name,
            middle_name,
            last_name,
            phone
        });

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
                text: 'Database error. Failed to create account.'
            }
        }
    }

    return {
        message: {
            status: 'success',
            text: 'Account Created Successfully!',
        }
    }
}

const UpdateUser = AccountFormSchema.omit({
    password: true,
})

export async function updateUser(prevState: AuthState, formData: FormData) {
    const validatedFields = UpdateUser.safeParse({
        user_id: formData.get('user_id'),
        first_name: formData.get('first_name'),
        middle_name: formData.get('middle_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: {
                status: 'error',
                text: 'Missing or Invalid Fields. Failed to update account.'
            }
        };
    }

    const { user_id, first_name, middle_name, last_name, email, phone } = validatedFields.data;

    try {
        const duplicateEmail = await sql`SELECT COUNT(*) FROM public.user WHERE email = ${email} AND user_id != ${user_id}`;
        const duplicatePhone = phone ? await sql`SELECT COUNT(*) FROM public.user WHERE phone = ${phone} AND user_id != ${user_id}` : { rows: [{ count: 0 }] };
        
        if (duplicateEmail.rows[0].count > 0) {
            return {
                message: {
                    status: 'error',
                    text: 'Email is already in use by another user.'
                }
            }
        };

        if (duplicatePhone.rows[0].count > 0) {
            return {
                message: {
                    status: 'error',
                    text: 'Phone number is already in use by another user.'
                }
            }
        };

        await sql`
            UPDATE public.user 
            SET 
                first_name = ${first_name}, 
                middle_name = ${middle_name}, 
                last_name = ${last_name}, 
                email = ${email}, 
                phone = ${phone}
            WHERE user_id = ${user_id}
        `

        const token = generateToken({ 
            user_id, 
            email, 
            first_name,
            middle_name,
            last_name,
            phone
        });

        (await cookies()).set('auth_token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        })
    } catch (error) {
        console.log(error);
        return {
            message: {
                status: 'error',
                text: 'Database error. Failed to update account.'
            }
        }
    }

    return {
        message: {
            status: 'success',
            text: 'Account Updated Successfully!',
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


const UpdatePasswordSchema = z.object({
    oldPassword: z.string()
        .min(8, 'Old password is required.'),
    newPassword: z.string()
        .min(8, 'New password must be at least 8 characters in length.'),
    confirmNewPassword: z.string()
        .min(8, 'Confirm password must match the new password.')
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match.',
    path: ['confirmNewPassword'],
});

export type PasswordState = {
    errors?: {
        oldPassword?: string[];
        newPassword?: string[];
        confirmNewPassword?: string[];
    };
    message: {
        status: string;
        text: string;
    };
}

export async function updatePassword(prevState: PasswordState, formData: FormData) {
    const validatedFields = UpdatePasswordSchema.safeParse({
        oldPassword: formData.get('old-password'),
        newPassword: formData.get('new-password'),
        confirmNewPassword: formData.get('confirm-password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: {
                status: 'error',
                text: 'Invalid form input.',
            },
        };
    }

    const { oldPassword, newPassword } = validatedFields.data;

    const authToken = (await cookies()).get('auth_token')?.value;
    if (!authToken) {
        return {
            message: {
                status: 'error',
                text: 'User not authenticated.',
            },
        };
    }

    let user;
    try {
        user = verifyToken(authToken) as { user_id: string };
    } catch (error) {
        console.error(error);
        return {
            message: {
                status: 'error',
                text: 'Invalid or expired session. Please log in again.',
            }
        }
    }

    try {
        const result = await sql`SELECT password FROM public.user WHERE user_id = ${user?.user_id}`;
        if (!result.rows[0]) {
            return {
                message: {
                    status: 'error',
                    text: 'User not found.',
                },
            };
        }

        const storedPasswordHash = result.rows[0].password;

        const isOldPasswordValid = await bcrypt.compare(oldPassword, storedPasswordHash);
        if (!isOldPasswordValid) {
            return {
                message: {
                    status: 'error',
                    text: 'Old password is incorrect.',
                },
            };
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        await sql`UPDATE public.user SET password = ${newPasswordHash} WHERE user_id = ${user.user_id}`;

        return {
            message: {
                status: 'success',
                text: 'Password updated successfully!',
            },
        };
    } catch (error) {
        console.error('Error updating password: ', error);
        return {
            message: {
                status: 'error',
                text: 'Database error. Failed to update password.',
            },
        };
    }
}