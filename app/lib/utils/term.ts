import { sql } from "@vercel/postgres";
import { Term } from "../db/definitions";

export async function getCurrentTerm() {
    try {
        const term = await sql<Term>`SELECT * FROM public.term WHERE CURDATE() BETWEEN term_start_date AND term_end_date`

        return term;
    } catch (error) {
        console.error('Database Error: ', error);
        return null;
    }
}