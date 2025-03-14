import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'About Us'
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}