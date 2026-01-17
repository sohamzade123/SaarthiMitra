'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SOSButton from '@/components/SOSButton';
import Card from '@/components/Card';
import styles from './page.module.css';

export default function DriverDashboard() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            id: 'mechanic',
            title: 'Nearby Mechanic',
            description: 'Find mechanics near you for quick assistance',
            icon: (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: '#f59e0b',
            route: '/driver/mechanic'
        },
        {
            id: 'tyre',
            title: 'Tyre Emergency',
            description: 'Instant help for tyre puncture or burst',
            icon: (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: '#ef4444',
            route: '/driver/tyre-emergency'
        },
        {
            id: 'amenities',
            title: 'Route Amenities',
            description: 'Find fuel, food, and rest stops along your route',
            icon: (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            color: '#10b981',
            route: '/driver/route-amenities'
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.greeting}>
                        <h1>Hello, Driver! 👋</h1>
                        <p>How can we assist you today?</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            className={styles.profileBtn}
                            onClick={() => router.push('/driver/profile')}
                            title="My Profile"
                        >
                            <span className={styles.profileAvatar}>R</span>
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
                {/* SOS Section */}
                <section className={styles.sosSection}>
                    <Card variant="glass" className={styles.sosCard}>
                        <div className={styles.sosContent}>
                            <div className={styles.sosInfo}>
                                <h2>Emergency SOS</h2>
                                <p>Press if you need immediate assistance. Help will be dispatched to your location.</p>
                            </div>
                            <SOSButton size="large" />
                        </div>
                    </Card>
                </section>

                {/* Quick Actions */}
                <section className={styles.quickActions}>
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

                {/* Safety Tips */}
                <section className={styles.tipsSection}>
                    <h2 className={styles.sectionTitle}>Safety Tips</h2>
                    <Card variant="glass" padding="medium">
                        <div className={styles.tipsList}>
                            <div className={styles.tip}>
                                <span className={styles.tipIcon}>💡</span>
                                <span>Always keep your emergency contacts updated</span>
                            </div>
                            <div className={styles.tip}>
                                <span className={styles.tipIcon}>🔋</span>
                                <span>Ensure your phone is charged before long trips</span>
                            </div>
                            <div className={styles.tip}>
                                <span className={styles.tipIcon}>🛞</span>
                                <span>Check tyre pressure before starting your journey</span>
                            </div>
                        </div>
                    </Card>
                </section>
            </main>
        </div>
    );
}
