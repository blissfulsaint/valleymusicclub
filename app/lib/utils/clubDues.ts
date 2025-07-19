// Any functions relating to the club_dues table in the DB are included here.
// This includes many-to-many tables such as user_club_dues

import { sql } from "@vercel/postgres";
import { ClubDues, ClubDuesPaidStatus } from "../db/definitions";

export async function getClubDuesByTerm(term_id: string): Promise<ClubDues[]> {
    const result = await sql<ClubDues>`
        SELECT *
        FROM club_dues
        WHERE term_id = ${term_id}
    `;

    return result.rows;
}

export async function clubDuesPaid(user_id: string, term_id: string): Promise<ClubDuesPaidStatus> {
    const result = await sql<ClubDuesPaidStatus>`
        SELECT paid
        FROM user_club_dues ucd
        JOIN club_dues cd
        ON ucd.club_dues_id = cd.club_dues_id
        WHERE ucd.user_id = ${user_id} AND cd.term_id = ${term_id};
    `;

    return result.rows[0];
}

export async function addUserClubDues(user_id: string, club_dues_id: string): Promise<number | null> {
    const result = await sql`
        INSERT INTO user_club_dues(user_id, club_dues_id, paid)
        VALUES (${user_id}, ${club_dues_id}, FALSE)
    `;

    return result.rowCount;
}

export async function setClubDuesTransactionDetailsByCompositeId(user_id: string, club_dues_id: string, paid: boolean, payment_mode: string, transaction_id: string): Promise<number | null> {
    const result = await sql`
        UPDATE user_club_dues
        SET paid = ${paid}, payment_mode = ${payment_mode}, transaction_id = ${transaction_id}
        WHERE club_dues_id = ${club_dues_id} AND user_id = ${user_id}
    `;

    return result.rowCount;
}

export async function checkExistingClubDuesByCompositeId(user_id: string, club_dues_id: string): Promise<boolean> {
    const result = await sql<number[]>`
        SELECT 1
        FROM user_club_dues
        WHERE club_dues_id = ${club_dues_id} AND user_id = ${user_id}
        LIMIT 1
    `;

    return result.rows.length > 0;
}