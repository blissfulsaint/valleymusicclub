import { sql } from "@vercel/postgres";
import type { VoluntaryDues } from "../db/definitions";

export async function getVoluntaryDuesByTerm(term_id: string): Promise<VoluntaryDues> {
    const result = await sql<VoluntaryDues>`
        SELECT *
        FROM voluntary_dues
        WHERE term_id = ${term_id}
    `;

    return result.rows[0];
}

export async function checkExistingVoluntaryDuesByCompositeId(user_id: string, voluntary_dues_id: string): Promise<boolean> {
    const result = await sql<number[]>`
        SELECT 1
        FROM user_voluntary_dues
        WHERE voluntary_dues_id = ${voluntary_dues_id} AND user_id = ${user_id}
        LIMIT 1
    `;

    return result.rows.length > 0;
}

export async function addUserVoluntaryDues(user_id: string, voluntary_dues_id: string, total_due: number): Promise<number | null> {
    const result = await sql`
        INSERT INTO user_voluntary_dues(user_id, voluntary_dues_id, total_due, paid)
        VALUES (${user_id}, ${voluntary_dues_id}, ${total_due}, FALSE)
    `;

    return result.rowCount;
}

export async function updateUserVoluntaryDues(user_id: string, voluntary_dues_id: string, total_due: number, paid: boolean): Promise<number | null> {
    const result = await sql`
        UPDATE user_voluntary_dues
        SET total_due = ${total_due}, paid = ${paid}
        WHERE user_id = ${user_id} AND voluntary_dues_id = ${voluntary_dues_id}
    `;

    return result.rowCount;
}

export async function setVoluntaryDuesTransactionDetails(user_id: string, voluntary_dues_id: string, paid: boolean, payment_mode: string, transaction_id: string): Promise<number | null> {
    const result = await sql`
        UPDATE user_voluntary_dues
        SET paid = ${paid}, payment_mode = ${payment_mode}, transaction_id = ${transaction_id}
        WHERE voluntary_dues_id = ${voluntary_dues_id} AND user_id = ${user_id}
    `;

    return result.rowCount;
}

export async function deleteUserVoluntaryDuesByCompositeId(user_id: string, voluntary_dues_id: string): Promise<number | null> {
    const result = await sql`
        DELETE FROM user_voluntary_dues
        WHERE voluntary_dues_id = ${voluntary_dues_id} AND user_id = ${user_id}
    `;

    return result.rowCount;
}