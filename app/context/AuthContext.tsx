'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({ isAuthenticated: false, refreshAuth: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function checkAuth() {
        try {
            const res = await fetch('/api/auth/status', { credentials: 'include' });
            const data = await res.json();
            setIsAuthenticated(data.isAuthenticated);
        } catch (error) {
            console.error('Failed to check authentication:', error);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    function refreshAuth() {
        checkAuth();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}