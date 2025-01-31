'use client';
import { Metadata } from "next"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { LayoutBand } from "blisskit-ui"
import LoginForm from "@/app/ui/components/account/LoginForm/LoginForm"

export const metadata: Metadata = {
    title: 'Login',
}

export default function Login() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/account');
        }
    }, [isAuthenticated, router]);

    return (
        <LayoutBand>
            <LoginForm></LoginForm>
        </LayoutBand>
    )
}