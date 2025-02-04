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
                // Show a skeleton or a loading message while fetching
                <h1 className="animate-pulse bg-gray-300 w-48 h-8 rounded-md"></h1> 
            ) : (
                <h1>Welcome to your dashboard, {user?.first_name}</h1>
            )}
            <p>This page is still in development. Please check back later for more features!</p>
        </LayoutBand>
    )
}