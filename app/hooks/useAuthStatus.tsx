'use client';

import { useEffect, useState } from 'react';
import { getAuthStatus } from '@/app/lib/actions/auth';
import { UserTokenPayload } from '../lib/db/definitions';

const AUTH_STORAGE_KEY = 'vmc-auth-status';

export function useAuthStatus() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserTokenPayload | undefined>();
    const [loading, setLoading] = useState(true);

    // Load from localStorage on first render
    useEffect(() => {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setIsAuthenticated(parsed.isAuthenticated);
                setUser(parsed.user);
            } catch (e) {
                console.error('Failed to parse auth data from localStorage:' + e);
            }
        }

        // Always verify fresh status
        check();
        const handle = () => check();
        window.addEventListener('authChanged', handle);
        return () => window.removeEventListener('authChanged', handle);
    }, []);

    const check = async () => {
        setLoading(true);
        const { isAuthenticated, user } = await getAuthStatus();
        setIsAuthenticated(isAuthenticated);
        setUser(user);

        // Save to localStorage
        localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ isAuthenticated, user })
        );

        setLoading(false);
    };

    return { isAuthenticated, user, loading };
}