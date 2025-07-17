import { cookies } from 'next/headers';
import { LayoutBand } from 'blisskit-ui';
import ClubRegistrationForm from "@/app/ui/components/account/ClubRegistrationFormComponents/ClubRegistrationForm/ClubRegistrationForm";

export default async function ClubRegistration() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth_token')?.value;

    if (!token) {
        return <p>User not authenticated</p>;
    }
    
    return (
        <LayoutBand>
            <ClubRegistrationForm />
        </LayoutBand>
    )
}