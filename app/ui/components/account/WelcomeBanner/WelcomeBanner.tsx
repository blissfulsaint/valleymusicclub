'use client';
import { useAuthStatus } from "@/app/hooks/useAuthStatus";

export default function WelcomeBanner() {
    const { user, loading } = useAuthStatus();

    return (
        <>
            {loading ? (
                <>
                    <h1><span className="animate-pulse bg-gray-300 inline-block w-full max-w-3xl h-[1em] rounded-md"></span></h1> 
                    <p><span className="animate-pulse bg-gray-300 inline-block w-full max-w-lg h-[1em] rounded-md"></span></p>
                </>
            ) : (
                <>
                    <h1>Welcome to your dashboard, {user?.first_name}</h1>
                    <p>This page is still in development. Please check back later for more features!</p>
                </>
            )}
        </>
    )
}