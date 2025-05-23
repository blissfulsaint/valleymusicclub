'use client';
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { LayoutBand } from "blisskit-ui"
import CreateAccountForm from "@/app/ui/components/account/CreateAccountForm/CreateAccountForm"

export default function CreateAccount() {
    const { isAuthenticated } = useAuth();
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