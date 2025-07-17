import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Register for Valley Music Club'
}

export default function ClubRegistrationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}