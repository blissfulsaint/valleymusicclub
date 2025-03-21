'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/db/definitions';

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    refreshAuth: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function checkAuth() {
        try {
            const res = await fetch('/api/auth/user', { credentials: 'include' });
            const data = await res.json();

            setIsAuthenticated(data.isAuthenticated);
            setUser(data.user);
        } catch (error) {
            console.error('Failed to check authentication:', error);
            setIsAuthenticated(false);
            setUser(null);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    function refreshAuth() {
        checkAuth();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}