import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music Festivals'
}

export default function FestivalsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}