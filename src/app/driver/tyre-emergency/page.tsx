'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Card from '@/components/Card';
import SOSButton from '@/components/SOSButton';
import { requestTyreEmergency } from '@/services/mockApi';
import styles from './page.module.css';

export default function TyreEmergencyPage() {
    const router = useRouter();
    const [isRequesting, setIsRequesting] = useState(false);
    const [requestState, setRequestState] = useState<'idle' | 'requesting' | 'dispatched'>('idle');
    const [eta, setEta] = useState('');

    const handleEmergencyRequest = async () => {
        setIsRequesting(true);
        setRequestState('requesting');

        try {
            const response = await requestTyreEmergency({ lat: 28.6139, lng: 77.2090 });
            setEta(response.eta);
            setRequestState('dispatched');
        } catch {
            console.error('Failed to request emergency');
            setRequestState('idle');
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={() => router.push('/driver')}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1>Tyre Emergency Support</h1>
            </header>

            <main className={styles.main}>
                {/* Emergency Card */}
                <Card variant="glass" className={styles.emergencyCard}>
                    <div className={styles.emergencyIcon}>
                        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                            <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                        </svg>
                    </div>

                    <h2 className={styles.emergencyTitle}>
                        If a tyre bursts, immediate assistance will be provided.
                    </h2>

                    <p className={styles.emergencyDescription}>
                        Press the button below to request emergency tyre assistance. A verified mechanic will be dispatched to your location with a replacement tyre.
                    </p>

                    {requestState === 'idle' && (
                        <button
                            className={styles.emergencyButton}
                            onClick={handleEmergencyRequest}
                            disabled={isRequesting}
                        >
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Request Tyre Assistance
                        </button>
                    )}

                    {requestState === 'requesting' && (
                        <div className={styles.requestingState}>
                            <div className={styles.spinner}></div>
                            <p>Finding nearest mechanic...</p>
                        </div>
                    )}

                    {requestState === 'dispatched' && (
                        <div className={styles.dispatchedState}>
                            <div className={styles.dispatchedIcon}>
                                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3>Mechanic Dispatched!</h3>
                            <p>A mechanic is arriving with a replacement tyre</p>

                            <div className={styles.etaCard}>
                                <span className={styles.etaLabel}>Estimated Arrival</span>
                                <span className={styles.etaTime}>{eta}</span>
                            </div>

                            <div className={styles.trackingAnimation}>
                                <div className={styles.trackingDot}></div>
                                <div className={styles.trackingLine}></div>
                                <div className={styles.trackingDotEnd}></div>
                            </div>

                            <p className={styles.waitingText}>
                                Stay safe and wait at your current location
                            </p>
                        </div>
                    )}
                </Card>

                {/* Safety Tips */}
                <section className={styles.safetySection}>
                    <h3 className={styles.sectionTitle}>While Waiting</h3>
                    <div className={styles.safetyGrid}>
                        <Card padding="medium" className={styles.safetyCard}>
                            <div className={styles.safetyIcon}>⚠️</div>
                            <h4>Turn on Hazard Lights</h4>
                            <p>Alert other drivers of your situation</p>
                        </Card>
                        <Card padding="medium" className={styles.safetyCard}>
                            <div className={styles.safetyIcon}>🚗</div>
                            <h4>Move to Safety</h4>
                            <p>Pull over to the side of the road if possible</p>
                        </Card>
                        <Card padding="medium" className={styles.safetyCard}>
                            <div className={styles.safetyIcon}>📍</div>
                            <h4>Stay Visible</h4>
                            <p>Place a warning triangle if available</p>
                        </Card>
                    </div>
                </section>

                {/* SOS Section */}
                <section className={styles.sosSection}>
                    <Card variant="glass" padding="large" className={styles.sosCard}>
                        <div className={styles.sosContent}>
                            <div>
                                <h3>Need More Help?</h3>
                                <p>If you&apos;re in immediate danger, use the SOS button</p>
                            </div>
                            <SOSButton size="medium" />
                        </div>
                    </Card>
                </section>
            </main>
        </div>
    );
}
