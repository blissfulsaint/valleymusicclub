'use client';
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayoutBand } from "blisskit-ui"
import { useAuthStatus } from "../hooks/useAuthStatus";
import LoginForm from "@/app/ui/components/account/LoginForm/LoginForm"

export default function Login() {
    const { isAuthenticated } = useAuthStatus();
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