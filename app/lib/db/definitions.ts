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