'use client';

import { useEffect, useState } from 'react';
import { getAuthStatus } from '@/app/lib/actions/auth';

export function useAuthStatus() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const check = async () => {
        setLoading(true);
        const { isAuthenticated } = await getAuthStatus();
        setIsAuthenticated(isAuthenticated);
        setLoading(false);
    };

    useEffect(() => {
        check();

        const handle = () => check();
        window.addEventListener('authChanged', handle);
        return () => window.removeEventListener('authChanged', handle);
    }, []);

    return { isAuthenticated, loading };
}