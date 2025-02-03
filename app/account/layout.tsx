import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Account Home'
}

export default function AccountHomeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}