'use client';
import { useEffect } from "react";
import { LayoutBand } from "blisskit-ui";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LogoutPage() {
    const router = useRouter();
    const { refreshAuth } = useAuth();

    useEffect(() => {
        async function logout() {
            try {
                await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                refreshAuth(); // ✅ Trigger auth state update in context
                router.push('/');
            } catch (error) {
                console.error('Logout failed: ', error);
            }
        }

        logout();
    }, [refreshAuth, router]);

    return (
        <LayoutBand>
            <p>Logging out...</p>
        </LayoutBand>
    )
}