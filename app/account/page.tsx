'use client';
import { LayoutBand } from "blisskit-ui";
import { useEffect, useState } from "react";

export default function AccountHome() {
    const [user, setUser] = useState<{ id: string; email: string; first_name: string; } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/user');
                if (!res.ok) throw new Error('Not authenticated');
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <LayoutBand>
            {loading ? (
                <>
                    <h1><span className="animate-pulse bg-gray-300 w-96 rounded-md"></span></h1> 
                    <p><span className="animate-pulse bg-gray-300 w-48 rounded-md"></span></p>
                </>
            ) : (
                <>
                    <h1>Welcome to your dashboard, {user?.first_name}</h1>
                    <p>This page is still in development. Please check back later for more features!</p>
                </>
            )}
        </LayoutBand>
    )
}