'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ThemeToggle />
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
}
