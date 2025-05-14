import { sql } from "@vercel/postgres";
import { Term } from "../db/definitions";

export async function getCurrentTerm(): Promise<Term | null> {
    try {
        const result = await sql<Term>`SELECT * FROM public.term WHERE CURRENT_DATE BETWEEN term_start_date AND term_end_date`;

        // Check if any rows were returned
        if (result.rows.length > 0) {
            return result.rows[0];
        }

        return null;
    } catch (error) {
        console.error('Database Error:', error);
        return null;
    }
}