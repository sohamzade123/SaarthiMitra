'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import { mockMechanics, Mechanic } from '@/data/mockMechanics';
import { requestMechanicHelp } from '@/services/mockApi';
import styles from './page.module.css';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

export default function MechanicPage() {
    const router = useRouter();
    const [mechanics, setMechanics] = useState<Mechanic[]>([]);
    const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [issueDescription, setIssueDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setMechanics(mockMechanics);
            setIsLoading(false);
        }, 800);
    }, []);

    const handleMechanicSelect = (mechanic: Mechanic) => {
        setSelectedMechanic(mechanic);
        setIsModalOpen(true);
    };

    const handleRequestHelp = async () => {
        if (!selectedMechanic) return;

        setIsSubmitting(true);
        try {
            await requestMechanicHelp({
                mechanicId: selectedMechanic.id,
                issue: issueDescription
            });
            setIsSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setIsSuccess(false);
                setIssueDescription('');
            }, 3000);
        } catch {
            console.error('Failed to request help');
        } finally {
            setIsSubmitting(false);
        }
    };

    const mapMarkers = mechanics.map(m => ({
        id: m.id,
        position: m.location,
        title: m.shopName,
        type: 'mechanic' as const,
        info: `${m.distance} • ${m.eta}`
    }));

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
                <h1>Nearby Mechanics</h1>
            </header>

            <main className={styles.main}>
                {/* Map Section */}
                <section className={styles.mapSection}>
                    <MapComponent
                        markers={mapMarkers}
                        zoom={14}
                        height="350px"
                    />
                </section>

                {/* Mechanics List */}
                <section className={styles.mechanicsSection}>
                    <h2 className={styles.sectionTitle}>
                        Available Mechanics
                        <span className={styles.count}>{mechanics.length} found</span>
                    </h2>

                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Finding nearby mechanics...</p>
                        </div>
                    ) : (
                        <div className={styles.mechanicsList}>
                            {mechanics.map((mechanic, index) => (
                                <Card
                                    key={mechanic.id}
                                    className={styles.mechanicCard}
                                    onClick={() => handleMechanicSelect(mechanic)}
                                    hoverable
                                    padding="medium"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={styles.mechanicHeader}>
                                        <div className={styles.mechanicInfo}>
                                            <h3>{mechanic.shopName}</h3>
                                            <p className={styles.ownerName}>{mechanic.name}</p>
                                        </div>
                                        <div className={styles.mechanicRating}>
                                            <span className={styles.ratingValue}>⭐ {mechanic.rating}</span>
                                            <span className={styles.ratingCount}>({mechanic.reviews} reviews)</span>
                                        </div>
                                    </div>

                                    <div className={styles.mechanicMeta}>
                                        <span className={styles.metaItem}>
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {mechanic.distance}
                                        </span>
                                        <span className={styles.metaItem}>
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            ETA: {mechanic.eta}
                                        </span>
                                        <span className={`${styles.statusBadge} ${mechanic.isOpen ? styles.open : styles.closed}`}>
                                            {mechanic.isOpen ? 'Open' : 'Closed'}
                                        </span>
                                    </div>

                                    <div className={styles.specialties}>
                                        {mechanic.specialties.map(specialty => (
                                            <span key={specialty} className={styles.specialtyTag}>{specialty}</span>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Request Help Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => !isSubmitting && setIsModalOpen(false)}
                title={isSuccess ? '' : 'Request Assistance'}
            >
                {isSuccess ? (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3>Request Sent!</h3>
                        <p>{selectedMechanic?.shopName} has been notified. ETA: {selectedMechanic?.eta}</p>
                    </div>
                ) : (
                    <div className={styles.requestForm}>
                        <div className={styles.selectedMechanic}>
                            <h4>{selectedMechanic?.shopName}</h4>
                            <p>{selectedMechanic?.address}</p>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Describe your issue</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="e.g., Tyre puncture, engine not starting..."
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className={styles.uploadOptions}>
                            <button className={styles.uploadBtn}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Upload Image
                            </button>
                            <button className={styles.uploadBtn}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                Voice Message
                            </button>
                        </div>

                        <div className={styles.actionButtons}>
                            <a href={`tel:${selectedMechanic?.phone}`} className={styles.callBtn}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Mechanic
                            </a>
                            <button
                                className={styles.submitBtn}
                                onClick={handleRequestHelp}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className={styles.spinner}></div>
                                ) : (
                                    'Send Request'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
