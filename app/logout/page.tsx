'use client';
import { useEffect } from "react";
import { LayoutBand } from "blisskit-ui";
import { logoutUser } from "../lib/actions/auth";

export default function LogoutPage() {
    useEffect(() => {
        async function logout() {
            try {
                await logoutUser();
                window.location.href = '/';
            } catch (error) {
                console.error('Logout failed: ', error);
            }
        }

        logout();
    }, []);

    return (
        <LayoutBand>
            <p>Logging out...</p>
        </LayoutBand>
    )
}