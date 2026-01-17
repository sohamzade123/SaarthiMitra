'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SOSButton from '@/components/SOSButton';
import Card from '@/components/Card';
import styles from './page.module.css';

export default function PassengerDashboard() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            id: 'book',
            title: 'Book a Cab',
            description: 'Find and book verified drivers near you',
            icon: (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17v-4m0 4H5a2 2 0 01-2-2v-3a2 2 0 012-2h1.5l1.5-3h8l1.5 3H19a2 2 0 012 2v3a2 2 0 01-2 2h-3m0 0v-4m-8 0a2 2 0 104 0m4 0a2 2 0 104 0" />
                </svg>
            ),
            color: '#0ea5e9',
            route: '/passenger/book'
        },
        {
            id: 'trip',
            title: 'My Trip',
            description: 'View your current trip with geo-fencing safety',
            icon: (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            color: '#10b981',
            route: '/passenger/trip'
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.greeting}>
                        <h1>Hello, Passenger! 👋</h1>
                        <p>Where would you like to go today?</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            className={styles.profileBtn}
                            onClick={() => router.push('/passenger/profile')}
                            title="My Profile"
                        >
                            <span className={styles.profileAvatar}>P</span>
                        </button>
                        <button
                            className={styles.logoutBtn}
                            onClick={() => router.push('/')}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={`${styles.main} ${isVisible ? styles.visible : ''}`}>
                {/* Quick Book Section */}
                <section className={styles.quickBookSection}>
                    <Card variant="gradient" className={styles.quickBookCard} onClick={() => router.push('/passenger/book')}>
                        <div className={styles.quickBookContent}>
                            <div className={styles.quickBookIcon}>
                                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className={styles.quickBookText}>
                                <h2>Where to?</h2>
                                <p>Tap to enter your destination</p>
                            </div>
                            <div className={styles.quickBookArrow}>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Features Grid */}
                <section className={styles.featuresSection}>
                    <h2 className={styles.sectionTitle}>Quick Actions</h2>
                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <Card
                                key={feature.id}
                                className={styles.featureCard}
                                onClick={() => router.push(feature.route)}
                                hoverable
                            >
                                <div
                                    className={styles.featureIcon}
                                    style={{ background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`, color: feature.color }}
                                >
                                    {feature.icon}
                                </div>
                                <div className={styles.featureContent}>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                                <div className={styles.featureArrow}>
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Safety Features */}
                <section className={styles.safetySection}>
                    <h2 className={styles.sectionTitle}>Your Safety Features</h2>
                    <div className={styles.safetyGrid}>
                        <Card padding="medium" className={styles.safetyCard}>
                            <div className={styles.safetyIcon}>🛡️</div>
                            <h4>Verified Drivers</h4>
                            <p>All drivers are background checked</p>
                        </Card>
                        <Card padding="medium" className={styles.safetyCard}>
                            <div className={styles.safetyIcon}>📍</div>
                            <h4>Geo-Fencing</h4>
                            <p>Route deviation alerts for safety</p>
                        </Card>
                        <Card padding="medium" className={styles.safetyCard}>
                            <div className={styles.safetyIcon}>🔔</div>
                            <h4>Live Tracking</h4>
                            <p>Share your ride with loved ones</p>
                        </Card>
                    </div>
                </section>

                {/* SOS Section */}
                <section className={styles.sosSection}>
                    <Card variant="glass" className={styles.sosCard}>
                        <div className={styles.sosContent}>
                            <div className={styles.sosInfo}>
                                <h2>Emergency SOS</h2>
                                <p>Press if you feel unsafe during your ride. Help will be dispatched immediately.</p>
                            </div>
                            <SOSButton size="large" />
                        </div>
                    </Card>
                </section>
            </main>
        </div>
    );
}
