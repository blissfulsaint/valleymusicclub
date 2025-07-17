export type User = {
    user_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    email_verified: 'y' | 'n';
}

export type UserTokenPayload = {
    user_id: string;
    email: string;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    phone?: string | null;
};

export type Term = {
    term_id: string;
    school_year: string;
    club_registration_open: string;
    club_dues_deadline: string;
    festival_registration_open: string;
    festival_fees_deadline: string;
    term_start_date: string;
    term_end_date: string;
}

export type ClubDues = {
    club_dues_id: string;
    club_dues_name: string;
    dues: number;
    term_id: string;
}

export type UserClubDues = {
    club_dues_id: string;
    user_id: string;
    paid: boolean;
    payment_mode: string;
    transaction_id: string;
}