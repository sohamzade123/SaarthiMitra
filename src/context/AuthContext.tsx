'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'driver' | 'passenger' | null;

interface User {
    fullName: string;
    email: string;
    phone: string;
    altPhone: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    role: UserRole;
    setRole: (role: UserRole) => void;
    login: (userData: Omit<User, 'role'>) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRoleState] = useState<UserRole>(null);

    const setRole = (newRole: UserRole) => {
        setRoleState(newRole);
        if (user) {
            setUser({ ...user, role: newRole });
        }
    };

    const login = (userData: Omit<User, 'role'>) => {
        setUser({ ...userData, role });
    };

    const logout = () => {
        setUser(null);
        setRoleState(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            role,
            setRole,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
