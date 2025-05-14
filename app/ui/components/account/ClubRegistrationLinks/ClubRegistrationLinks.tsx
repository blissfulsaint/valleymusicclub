import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { getCurrentTerm } from '@/app/lib/utils/term';
import { clubDuesPaid } from '@/app/lib/utils/clubDues';
import type { Term } from '@/app/lib/db/definitions';

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function ClubRegistrationLinks() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth_token')?.value;

    if (!token) {
        return <p>User not authenticated</p>;
    }

    let user_id: string | null = null;

    try {
        const decoded = verify(token, JWT_SECRET) as { user_id: string };
        user_id = decoded.user_id;
    } catch (error) {
        console.error('Invalid token:', error);
        return <p>Invalid token</p>;
    }

    const currentTerm: Term | null = await getCurrentTerm();
    const paidStatus = currentTerm && user_id
        ? await clubDuesPaid(user_id, currentTerm.term_id)
        : null;

    return (
        <>
            <p>In time, you will be able to access links to register and pay necessary dues to Valley Music Club right here!</p>
            {currentTerm?.school_year ? (
                <p>{currentTerm.school_year}</p>
            ) : (
                <p>No term found</p>
            )}
            {paidStatus && <p>Dues Paid: {paidStatus.paid ? "Yes" : "No"}</p>}
        </>
    );
}