'use server';

import { sql } from "@vercel/postgres";
import { User } from "../db/definitions";

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        if (!email) {
            throw new Error('Email is required');
        }

        const user = await sql<User>`SELECT * FROM public.user WHERE email = ${email}`;

        return user.rows.length > 0 ? user.rows[0] : null
    } catch (error) {
        console.error('Database Error: ', error);
        return null;
    }
}

export async function insertPasswordRecoveryToken(userId: string, token: string, expiresAt: Date) {
    try {
        const expiresAtISO = expiresAt.toISOString();

        await sql`INSERT INTO public.password_recovery_token (user_id, token, expires_at, used)
            VALUES (${userId}, ${token}, ${expiresAtISO}, FALSE)`
    } catch (error) {
        console.error('Database Error: ', error);
        return null;
    }
}