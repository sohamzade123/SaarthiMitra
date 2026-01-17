'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { mockLogin } from '@/services/mockApi';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { role, login } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        altPhone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await mockLogin(formData);
            login(formData);

            // Navigate based on role
            if (role === 'driver') {
                router.push('/driver');
            } else {
                router.push('/passenger');
            }
        } catch {
            console.error('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className={styles.container}>
            {/* Back button */}
            <button
                className={styles.backButton}
                onClick={() => router.push('/role-select')}
            >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <div className={styles.content}>
                {/* Role indicator */}
                <div className={styles.roleIndicator}>
                    {role === 'driver' ? (
                        <>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17v-4m0 4H5a2 2 0 01-2-2v-3a2 2 0 012-2h1.5l1.5-3h8l1.5 3H19a2 2 0 012 2v3a2 2 0 01-2 2h-3m0 0v-4" />
                            </svg>
                            <span>Driver Sign Up</span>
                        </>
                    ) : (
                        <>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Passenger Sign Up</span>
                        </>
                    )}
                </div>

                <h1 className={styles.title}>Create Your Account</h1>
                <p className={styles.subtitle}>Enter your details to get started with SaarthiMitra</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={`${styles.inputGroup} ${focusedField === 'fullName' ? styles.focused : ''}`}>
                        <label className={styles.label}>Full Name</label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.inputIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                onFocus={() => setFocusedField('fullName')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputGroup} ${focusedField === 'email' ? styles.focused : ''}`}>
                        <label className={styles.label}>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.inputIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputGroup} ${focusedField === 'phone' ? styles.focused : ''}`}>
                        <label className={styles.label}>Phone Number</label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.inputIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                    </div>

                    <div className={`${styles.inputGroup} ${focusedField === 'altPhone' ? styles.focused : ''}`}>
                        <label className={styles.label}>
                            Alternate Phone Number
                            <span className={styles.optional}>(Emergency Contact)</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.inputIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <input
                                type="tel"
                                className={styles.input}
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.altPhone}
                                onChange={(e) => handleChange('altPhone', e.target.value)}
                                onFocus={() => setFocusedField('altPhone')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className={styles.spinner}></div>
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Continue</span>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                <p className={styles.terms}>
                    By continuing, you agree to our
                    <a href="#"> Terms of Service</a> and
                    <a href="#"> Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
