'use server';

import { sql } from "@vercel/postgres";
import { User } from "../db/definitions";

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        if (!email) {
            throw new Error('Email is required');
        }

        const user = await sql<User>`SELECT * FROM dev.test_user WHERE email = ${email}`;

        return user.rows.length > 0 ? user.rows[0] : null
    } catch (error) {
        console.error('Database Error: ', error);
        return null;
    }
}