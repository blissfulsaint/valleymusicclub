'use client';
import { LayoutBand } from "blisskit-ui";
import PageLink from "../ui/components/PageLink/PageLink";
import { useAuth } from "../context/AuthContext";

export default function AccountHome() {
    const { user, loading } = useAuth();

    return (
        <LayoutBand>
            {loading ? (
                <>
                    <h1><span className="animate-pulse bg-gray-300 inline-block w-full max-w-3xl h-[1em] rounded-md"></span></h1> 
                    <p><span className="animate-pulse bg-gray-300 inline-block w-full max-w-lg h-[1em] rounded-md"></span></p>
                    <p><span className="animate-pulse bg-gray-300 inline-block w-full max-w-lg h-[1em] rounded-md"></span></p>
                </>
            ) : (
                <>
                    <h1>Welcome to your dashboard, {user?.first_name}</h1>
                    <p>This page is still in development. Please check back later for more features!</p>
                    <PageLink href='/account/settings'>Account Settings</PageLink>
                </>
            )}
        </LayoutBand>
    )
}