// Any functions relating to the participant_type table in the DB are included here.
// This includes many-to-many tables dealing primarily with participant_type such as user_participants

import { sql } from "@vercel/postgres";

import type { ParticipantType } from "../db/definitions";

export async function getParticipantTypeInfoById(participant_type_id: string): Promise<ParticipantType> {
    const result = await sql<ParticipantType>`
        SELECT *
        FROM participant_type
        WHERE participant_type_id = ${participant_type_id}
    `;

    return result.rows[0];
}

export async function getParticipantTypeInfoByTerm(term_id: string): Promise<ParticipantType> {
    const result = await sql<ParticipantType>`
        SELECT *
        FROM participant_type
        WHERE term_id = ${term_id}
    `;

    return result.rows[0];
}

export async function checkExistingUserParticipantsByCompositeId(user_id: string, participant_type_id: string): Promise<boolean> {
    const result = await sql<number[]>`
        SELECT 1
        FROM user_participants
        WHERE participant_type_id = ${participant_type_id} AND user_id = ${user_id}
        LIMIT 1
    `;

    return result.rows.length > 0;
}

export async function addUserParticipants(user_id: string, participant_type_id: string, participant_amt: number, total_due: number): Promise<number | null> {
    const result = await sql`
        INSERT INTO user_participants(user_id, participant_type_id, participant_amt, total_due, paid)
        VALUES (${user_id}, ${participant_type_id}, ${participant_amt}, ${total_due}, FALSE)
    `;

    return result.rowCount;
}

export async function updateUserParticipants(user_id: string, participant_type_id: string, participant_amt: number, total_due: number, paid: boolean): Promise<number | null> {
    const result = await sql`
        UPDATE user_participants
        SET participant_amt = ${participant_amt}, total_due = ${total_due}, paid = ${paid}
        WHERE user_id = ${user_id} AND participant_type_id = ${participant_type_id}
    `;

    return result.rowCount;
}

export async function setParticipantDuesTransactionDetails(user_id: string, participant_type_id: string, paid: boolean, payment_mode: string, transaction_id: string): Promise<number | null> {
    const result = await sql`
        UPDATE user_participants
        SET paid = ${paid}, payment_mode = ${payment_mode}, transaction_id = ${transaction_id}
        WHERE participant_type_id = ${participant_type_id} AND user_id = ${user_id} 
    `;

    return result.rowCount;
}

export async function deleteUserParticipantsByCompositeId(user_id: string, participant_type_id: string): Promise<number | null> {
    const result = await sql`
        DELETE FROM user_participants
        WHERE user_id = ${user_id} AND participant_type_id = ${participant_type_id}
    `;

    return result.rowCount;
}