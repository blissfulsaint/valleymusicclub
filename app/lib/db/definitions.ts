export type User = {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    email_verified: 'y' | 'n';
}