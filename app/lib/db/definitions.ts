export type User = {
    user_id: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    password: string;
    phone: string | null;
    email_verified: 'y' | 'n';
};

export type UserTokenPayload = Pick<
    User,
    'user_id' | 'email' | 'first_name' | 'middle_name' | 'last_name' | 'phone'
> & {
    middle_name?: string | null;
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
};

export type ClubDues = {
    club_dues_id: string;
    club_dues_name: string;
    dues: number;
    term_id: string;
};

export type UserClubDues = {
    club_dues_id: string;
    user_id: string;
    paid: boolean;
    payment_mode: string;
    transaction_id: string;
};

export type ClubDuesPaidStatus = Pick<UserClubDues, 'paid'>;

export type ParticipantType = {
    participant_type_id: string;
    participant_type: string;
    national_federation_dues: number;
    has_base_dues: boolean;
    base_dues: number | null;
};

export type VoluntaryDues = {
    voluntary_dues_id: string;
    voluntary_dues_name: string;
    term_id: number;
};