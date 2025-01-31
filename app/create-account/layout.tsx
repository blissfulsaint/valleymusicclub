import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Create an Account',
};

export default function CreateAccountLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}