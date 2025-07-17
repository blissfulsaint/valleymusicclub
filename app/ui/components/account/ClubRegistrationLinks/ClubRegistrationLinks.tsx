import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { getCurrentTerm, getAllTerms } from '@/app/lib/utils/term';
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

    const termList = await getAllTerms();
    const currentDate = new Date();

    return (
        <>
            {paidStatus?.paid ? (
                <p>Thank you for joining the Valley Music Club! We are glad you are here and look forward to providing a wide variety of musical and educational experiences for you and your students. We look forward to your participation as we work together to teach, encourage, support, and celebrate musical growth and the achievements of musicians in our community.</p>
            ) : (
                <p>Thank you for your interest in the Valley Music Club! We are glad you are here and look forward to providing a wide variety of musical and educational experiences for you and your students. We look forward to your participation as we work together to teach, encourage, support, and celebrate musical growth and the achievements of musicians in our community.</p>
            )}
            <ul>
                {termList?.map((term, index) => {
                    const openDate = new Date(term.club_registration_open);
                    const openFormattedDate = formatDate(openDate);

                    const openDateMinus3Months = new Date(openDate);
                    openDateMinus3Months.setMonth(openDate.getMonth() - 3);

                    const closeDate = new Date(term.club_dues_deadline);
                    const closeFormattedDate = formatDate(closeDate);

                    const closeDatePlus3Months = new Date(closeDate);
                    closeDatePlus3Months.setMonth(closeDate.getMonth() + 3);

                    const isPreOpen = currentDate >= openDateMinus3Months && currentDate < openDate;
                    const isOpen = currentDate >= openDate && currentDate <= closeDate;
                    const isRecentlyClosed = currentDate > closeDate && currentDate <= closeDatePlus3Months;

                    return (
                        <li key={index}>
                            {isPreOpen && (
                                <>
                                    <h3>{term.school_year} Club Registration</h3>
                                    <p>Club Registration will open on {openFormattedDate}</p>
                                </>
                            )}

                            {isOpen && (
                                paidStatus?.paid ? (
                                    <>
                                        <h3>{term.school_year} Club Registration</h3>
                                        <p>Club Registration Completed!</p>
                                    </>
                                ) : (
                                    <>
                                        <h3>Join Our Club Today!</h3>
                                        <p>{term.school_year} Club Registration is due: {closeFormattedDate}</p>
                                        <p>Membership in VMC will give you and your students opportunities to participate in luncheons, workshops, clinics, and the annual Festival with the National Federation of Music Clubs.</p>
                                        <PageLink button href='/account/club-registration'>
                                            Join Our Club!
                                        </PageLink>
                                        <p>Questions? Email <PageLink className="inline" href="mailto:valleymusicclubaz@gmail.com">valleymusicclubaz@gmail.com</PageLink></p>
                                    </>
                                )
                            )}

                            {isRecentlyClosed && (
                                <>
                                    <h3>{term.school_year} Club Registration</h3>
                                    <p>Club Registration has closed</p>
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>
        </>
    );
}