import { sql } from "@vercel/postgres";
import { ClubDues } from "../db/definitions";

export type UserPaidStatus = {
    paid: boolean;
}

export async function getClubDuesByTerm(term_id: string): Promise<ClubDues[]> {
    const result = await sql<ClubDues>`
        SELECT *
        FROM club_dues
        WHERE term_id = ${term_id}
    `;

    return result.rows;
}

export async function clubDuesPaid(user_id: string, term_id: string): Promise<UserPaidStatus> {
    const result = await sql<UserPaidStatus>`
        SELECT paid
        FROM user_club_dues ucd
        JOIN club_dues cd
        ON ucd.club_dues_id = cd.club_dues_id
        WHERE ucd.user_id = ${user_id} AND cd.term_id = ${term_id};
    `;

    return result.rows[0];
}