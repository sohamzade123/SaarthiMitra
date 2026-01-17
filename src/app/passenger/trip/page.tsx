'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import SOSButton from '@/components/SOSButton';
import Modal from '@/components/Modal';
import styles from './page.module.css';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

// Function to play deviation alert sound
function playDeviationAlert(audioContextRef: React.MutableRefObject<AudioContext | null>) {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

export default function TripPage() {
    const router = useRouter();
    const [tripPhase, setTripPhase] = useState<'waiting' | 'onway' | 'inprogress'>('waiting');
    const [showDeviationAlert, setShowDeviationAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [geoFenceStatus, setGeoFenceStatus] = useState<'safe' | 'warning' | 'danger'>('safe');
    const [deviationDistance, setDeviationDistance] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(35);
    const [showSpeedAlert, setShowSpeedAlert] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Simulate trip progression
    useEffect(() => {
        const phases = [
            { phase: 'waiting' as const, duration: 3000 },
            { phase: 'onway' as const, duration: 3000 },
            { phase: 'inprogress' as const, duration: 0 }
        ];

        let timeout: NodeJS.Timeout;

        const runPhases = async () => {
            for (const { phase, duration } of phases) {
                setTripPhase(phase);
                if (duration > 0) {
                    await new Promise(resolve => {
                        timeout = setTimeout(resolve, duration);
                    });
                }
            }
        };

        runPhases();

        return () => clearTimeout(timeout);
    }, []);

    // Simulate progress, deviation, and speed monitoring
    useEffect(() => {
        if (tripPhase !== 'inprogress') return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 500);

        // Simulate speed changes
        const speedInterval = setInterval(() => {
            const newSpeed = Math.floor(Math.random() * 30) + 30; // 30-60 km/h
            setCurrentSpeed(newSpeed);
            if (newSpeed > 55) {
                setShowSpeedAlert(true);
                setTimeout(() => setShowSpeedAlert(false), 2000);
            }
        }, 3000);

        // Simulate route deviation at 40% progress
        const deviationTimeout = setTimeout(() => {
            setDeviationDistance(250);
            setGeoFenceStatus('warning');
            playDeviationAlert(audioContextRef);
            setShowDeviationAlert(true);
        }, 10000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(speedInterval);
            clearTimeout(deviationTimeout);
        };
    }, [tripPhase]);

    // Cleanup audio context
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const driverInfo = {
        name: 'Rajesh Kumar',
        vehicle: 'Maruti Suzuki Dzire',
        number: 'DL 01 AB 1234',
        rating: 4.9,
        phone: '+91 98765 43210'
    };

    const emergencyContacts = [
        { name: 'Mom', phone: '+91 98765 11111' },
        { name: 'Dad', phone: '+91 98765 22222' },
    ];

    const handleDismissDeviation = () => {
        setShowDeviationAlert(false);
        setGeoFenceStatus('safe');
        setDeviationDistance(0);
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={() => router.push('/passenger')}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1>My Trip</h1>
                <div className={styles.headerSOS}>
                    <SOSButton size="small" />
                </div>
            </header>

            <main className={styles.main}>
                {/* Trip Status */}
                <Card variant="glass" className={styles.statusCard}>
                    {tripPhase === 'waiting' && (
                        <div className={styles.statusContent}>
                            <div className={styles.statusIcon}>
                                <div className={styles.pulsingDot}></div>
                            </div>
                            <div className={styles.statusText}>
                                <h3>Finding your driver...</h3>
                                <p>Please wait while we connect you</p>
                            </div>
                        </div>
                    )}

                    {tripPhase === 'onway' && (
                        <div className={styles.statusContent}>
                            <div className={styles.statusIconSuccess}>
                                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h8M8 17v-4m0 4H5a2 2 0 01-2-2v-3a2 2 0 012-2h1.5l1.5-3h8l1.5 3H19a2 2 0 012 2v3a2 2 0 01-2 2h-3" />
                                </svg>
                            </div>
                            <div className={styles.statusText}>
                                <h3>Driver is on the way!</h3>
                                <p>Arriving in 3 minutes</p>
                            </div>
                        </div>
                    )}

                    {tripPhase === 'inprogress' && (
                        <div className={styles.tripInProgress}>
                            <div className={styles.tripHeader}>
                                <span className={styles.tripLabel}>Trip in Progress</span>
                                <span className={styles.tripProgress}>{progress}% complete</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Geo-Fencing Safety Card */}
                {tripPhase === 'inprogress' && (
                    <Card variant="glass" className={`${styles.geoFenceCard} ${styles[geoFenceStatus]}`}>
                        <div className={styles.geoFenceHeader}>
                            <div className={styles.geoFenceTitle}>
                                <div className={`${styles.geoFenceStatusDot} ${styles[geoFenceStatus]}`}></div>
                                <span>Geo-Fencing Safety</span>
                            </div>
                            <span className={`${styles.geoFenceStatusText} ${styles[geoFenceStatus]}`}>
                                {geoFenceStatus === 'safe' && '✓ On Route'}
                                {geoFenceStatus === 'warning' && '⚠ Deviation Detected'}
                                {geoFenceStatus === 'danger' && '🚨 Off Route'}
                            </span>
                        </div>

                        <div className={styles.safetyMetrics}>
                            <div className={styles.safetyMetric}>
                                <div className={styles.metricIcon}>🛡️</div>
                                <div className={styles.metricInfo}>
                                    <span className={styles.metricLabel}>Safety Zone</span>
                                    <span className={styles.metricValue}>
                                        {deviationDistance === 0 ? 'Within Zone' : `${deviationDistance}m away`}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.safetyMetric}>
                                <div className={styles.metricIcon}>🚗</div>
                                <div className={styles.metricInfo}>
                                    <span className={styles.metricLabel}>Current Speed</span>
                                    <span className={`${styles.metricValue} ${showSpeedAlert ? styles.speedAlert : ''}`}>
                                        {currentSpeed} km/h
                                    </span>
                                </div>
                            </div>
                            <div className={styles.safetyMetric}>
                                <div className={styles.metricIcon}>📍</div>
                                <div className={styles.metricInfo}>
                                    <span className={styles.metricLabel}>Tracking</span>
                                    <span className={styles.metricValue}>Live</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Map Section */}
                <section className={styles.mapSection}>
                    <MapComponent
                        showRoute
                        origin={{ lat: 28.6139, lng: 77.2090 }}
                        destination={{ lat: 28.5672, lng: 77.2100 }}
                        zoom={13}
                        height="300px"
                    />

                    {/* Geo-fence indicator */}
                    <div className={`${styles.geoFenceIndicator} ${styles[geoFenceStatus]}`}>
                        <div className={styles.geoFenceIcon}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span>
                            {geoFenceStatus === 'safe' && 'Geo-Fencing Active'}
                            {geoFenceStatus === 'warning' && 'Route Deviation!'}
                            {geoFenceStatus === 'danger' && 'Emergency Mode'}
                        </span>
                    </div>
                </section>

                {/* Driver Info */}
                <Card padding="medium" className={styles.driverCard}>
                    <div className={styles.driverHeader}>
                        <div className={styles.driverAvatar}>
                            <span>{driverInfo.name.charAt(0)}</span>
                        </div>
                        <div className={styles.driverInfo}>
                            <h4>{driverInfo.name}</h4>
                            <div className={styles.driverRating}>⭐ {driverInfo.rating}</div>
                        </div>
                        <a href={`tel:${driverInfo.phone}`} className={styles.callBtn}>
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </a>
                    </div>
                    <div className={styles.vehicleInfo}>
                        <span>{driverInfo.vehicle}</span>
                        <span className={styles.vehicleNumber}>{driverInfo.number}</span>
                    </div>
                </Card>

                {/* Trip Details */}
                <Card padding="medium" className={styles.tripDetailsCard}>
                    <h4 className={styles.detailsTitle}>Trip Details</h4>

                    <div className={styles.locationsList}>
                        <div className={styles.locationItem}>
                            <div className={styles.locationDot}></div>
                            <div className={styles.locationContent}>
                                <span className={styles.locationLabel}>Pickup</span>
                                <span className={styles.locationName}>Connaught Place, New Delhi</span>
                            </div>
                        </div>

                        <div className={styles.locationLine}></div>

                        <div className={styles.locationItem}>
                            <div className={styles.locationDotEnd}></div>
                            <div className={styles.locationContent}>
                                <span className={styles.locationLabel}>Drop-off</span>
                                <span className={styles.locationName}>AIIMS Hospital, New Delhi</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tripMeta}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Distance</span>
                            <span className={styles.metaValue}>6.5 km</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Est. Time</span>
                            <span className={styles.metaValue}>22 mins</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Fare</span>
                            <span className={styles.metaValue}>₹180</span>
                        </div>
                    </div>
                </Card>

                {/* Emergency Contacts */}
                <Card padding="medium" className={styles.emergencyContactsCard}>
                    <h4 className={styles.detailsTitle}>Emergency Contacts</h4>
                    <p className={styles.contactsSubtitle}>These contacts will be notified if you trigger SOS</p>
                    <div className={styles.contactsList}>
                        {emergencyContacts.map((contact, index) => (
                            <div key={index} className={styles.contactItem}>
                                <div className={styles.contactAvatar}>{contact.name.charAt(0)}</div>
                                <div className={styles.contactInfo}>
                                    <span className={styles.contactName}>{contact.name}</span>
                                    <span className={styles.contactPhone}>{contact.phone}</span>
                                </div>
                                <a href={`tel:${contact.phone}`} className={styles.contactCall}>
                                    📞
                                </a>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Share Trip */}
                <Card padding="medium" className={styles.shareCard}>
                    <div className={styles.shareContent}>
                        <div>
                            <h4>Share your trip</h4>
                            <p>Let your loved ones track your journey</p>
                        </div>
                        <button className={styles.shareBtn}>
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share
                        </button>
                    </div>
                </Card>
            </main>

            {/* Route Deviation Alert Modal */}
            <Modal
                isOpen={showDeviationAlert}
                onClose={handleDismissDeviation}
                title="Route Deviation Alert"
            >
                <div className={styles.deviationModal}>
                    <div className={styles.deviationIcon}>
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3>Route Deviation Detected!</h3>
                    <p>The vehicle has deviated <strong>{deviationDistance}m</strong> from the planned route.</p>

                    <div className={styles.deviationDetails}>
                        <div className={styles.deviationDetail}>
                            <span>📍</span>
                            <span>Current deviation: {deviationDistance}m</span>
                        </div>
                        <div className={styles.deviationDetail}>
                            <span>🚗</span>
                            <span>Speed: {currentSpeed} km/h</span>
                        </div>
                        <div className={styles.deviationDetail}>
                            <span>⏱️</span>
                            <span>Detected: Just now</span>
                        </div>
                    </div>

                    <p className={styles.deviationNote}>
                        This could be due to traffic, road conditions, or driver preference.
                        If you feel unsafe, press Emergency SOS.
                    </p>

                    <div className={styles.deviationActions}>
                        <button
                            className={styles.dismissBtn}
                            onClick={handleDismissDeviation}
                        >
                            I&apos;m Safe
                        </button>
                        <button className={styles.sosAlertBtn}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Emergency SOS
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

