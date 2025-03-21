'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/db/definitions';

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    loading: true,
    refreshAuth: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function checkAuth() {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/user', { credentials: 'include' });
            const data = await res.json();

            setIsAuthenticated(data.isAuthenticated);
            setUser(data.user);
        } catch (error) {
            console.error('Failed to check authentication:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    function refreshAuth() {
        checkAuth();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}