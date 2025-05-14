import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { getCurrentTerm } from '@/app/lib/utils/term';
import { formatDate } from '@/app/lib/utils/helpers';
import { clubDuesPaid } from '@/app/lib/utils/clubDues';
import type { Term } from '@/app/lib/db/definitions';

import PageLink from '../../PageLink/PageLink';

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
            {paidStatus?.paid ? (
                <p>Thank you for joining the Valley Music Club! We are glad you are here and look forward to providing a wide variety of musical and educational experiences for you and your students. We look forward to your participation as we work together to teach, encourage, support, and celebrate musical growth and the achievements of musicians in our community.</p>
            ) : (
                <>
                    <p>Thank you for your interest in the Valley Music Club! We are glad you are here and look forward to providing a wide variety of musical and educational experiences for you and your students. We look forward to your participation as we work together to teach, encourage, support, and celebrate musical growth and the achievements of musicians in our community.</p>
                    <h3>Join Our Club Today!</h3>
                    <p>{currentTerm?.school_year} Club Registration is due: {currentTerm && formatDate(currentTerm.club_dues_deadline)}</p>
                    <p>Membership in VMC will give you and your students opportunities to participate in luncheons, workships, clinics, and the annual Festival with the National Federation of Music Clubs.</p>
                    <PageLink button href='/page-in-development'>Join Our Club!</PageLink>
                    <p>Questions? Email <PageLink className='inline' href='mailto:valleymusicclubaz@gmail.com'>valleymusicclubaz@gmail.com</PageLink>.</p>
                </>
            )}
        </>
    );
}