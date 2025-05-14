import { sql } from "@vercel/postgres";

export type UserPaidStatus = {
    paid: boolean;
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