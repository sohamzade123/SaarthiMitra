'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import styles from './page.module.css';

export default function RoleSelectPage() {
    const router = useRouter();
    const { setRole } = useAuth();
    const [selectedRole, setSelectedRole] = useState<'driver' | 'passenger' | null>(null);

    const handleRoleSelect = (role: 'driver' | 'passenger') => {
        setSelectedRole(role);
        setRole(role);

        // Animate then navigate
        setTimeout(() => {
            router.push('/login');
        }, 400);
    };

    return (
        <div className={styles.container}>
            {/* Back button */}
            <button
                className={styles.backButton}
                onClick={() => router.push('/')}
            >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <div className={styles.content}>
                <h1 className={styles.title}>Choose Your Role</h1>
                <p className={styles.subtitle}>Select how you want to use SaarthiMitra today</p>

                <div className={styles.cardsContainer}>
                    {/* Driver Card */}
                    <div
                        className={`${styles.roleCard} ${selectedRole === 'driver' ? styles.selected : ''}`}
                        onClick={() => handleRoleSelect('driver')}
                    >
                        <div className={styles.cardIcon}>
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17v-4m0 4H5a2 2 0 01-2-2v-3a2 2 0 012-2h1.5l1.5-3h8l1.5 3H19a2 2 0 012 2v3a2 2 0 01-2 2h-3m0 0v-4m-8 0a2 2 0 104 0m4 0a2 2 0 104 0" />
                            </svg>
                        </div>
                        <h2 className={styles.cardTitle}>Driver</h2>
                        <p className={styles.cardDescription}>
                            Access emergency assistance, find mechanics, and get route-based amenities
                        </p>
                        <ul className={styles.cardFeatures}>
                            <li>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Emergency SOS Support
                            </li>
                            <li>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Nearby Mechanic Finder
                            </li>
                            <li>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Route Amenities Map
                            </li>
                        </ul>
                        <div className={styles.cardArrow}>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* Passenger Card */}
                    <div
                        className={`${styles.roleCard} ${selectedRole === 'passenger' ? styles.selected : ''}`}
                        onClick={() => handleRoleSelect('passenger')}
                    >
                        <div className={styles.cardIcon}>
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className={styles.cardTitle}>Passenger</h2>
                        <p className={styles.cardDescription}>
                            Book verified drivers, track your ride, and stay safe with geo-fencing
                        </p>
                        <ul className={styles.cardFeatures}>
                            <li>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Verified Driver Booking
                            </li>
                            <li>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Geo-Fencing Safety
                            </li>
                            <li>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Emergency SOS Button
                            </li>
                        </ul>
                        <div className={styles.cardArrow}>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
