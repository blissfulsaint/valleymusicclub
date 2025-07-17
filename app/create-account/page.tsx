'use client';
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayoutBand } from "blisskit-ui"
import { useAuthStatus } from "../hooks/useAuthStatus";
import CreateAccountForm from "@/app/ui/components/account/CreateAccountForm/CreateAccountForm"

export default function CreateAccount() {
    const { isAuthenticated } = useAuthStatus();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/account');
        }
    }, [isAuthenticated, router]);

    return (
        <LayoutBand>
            <CreateAccountForm></CreateAccountForm>
        </LayoutBand>
    )
}