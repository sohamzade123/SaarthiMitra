'use client';

import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import styles from './SOSButton.module.css';

interface SOSButtonProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

// Function to create and play SOS alarm sound using Web Audio API
function playSOSAlarm(audioContextRef: React.MutableRefObject<AudioContext | null>) {
    // Create or resume AudioContext
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const audioContext = audioContextRef.current;

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Create oscillator for alarm sound
    const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, startTime);

        // Envelope for the alarm
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.setValueAtTime(0.3, startTime + duration - 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    };

    // Play alternating high-low alarm pattern (like emergency siren)
    const currentTime = audioContext.currentTime;
    for (let i = 0; i < 6; i++) {
        playTone(880, currentTime + i * 0.3, 0.15);  // High tone
        playTone(660, currentTime + i * 0.3 + 0.15, 0.15);  // Low tone
    }
}

export default function SOSButton({ size = 'large', className = '' }: SOSButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Cleanup audio context on unmount
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const handleSOSClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmSOS = () => {
        setIsEmergencyActive(true);

        // Play alarm sound
        playSOSAlarm(audioContextRef);

        // Simulate emergency request
        setTimeout(() => {
            setIsEmergencyActive(false);
            setIsModalOpen(false);
        }, 3000);
    };

    return (
        <>
            <button
                className={`${styles.sosButton} ${styles[size]} ${className}`}
                onClick={handleSOSClick}
                aria-label="Emergency SOS"
            >
                <span className={styles.text}>SOS</span>
                <span className={styles.pulse}></span>
                <span className={styles.pulse} style={{ animationDelay: '0.5s' }}></span>
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => !isEmergencyActive && setIsModalOpen(false)}
                title={isEmergencyActive ? '' : 'Emergency SOS'}
            >
                {isEmergencyActive ? (
                    <div className={styles.emergencyActive}>
                        <div className={styles.emergencyIcon}>
                            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className={styles.emergencyTitle}>Emergency Request Sent!</h3>
                        <p className={styles.emergencyText}>
                            Help is on the way. Stay calm and stay in a safe location.
                        </p>
                        <div className={styles.alarmIndicator}>
                            <span className={styles.alarmDot}></span>
                            <span>Alert Sound Active</span>
                        </div>
                        <div className={styles.loadingBar}>
                            <div className={styles.loadingProgress}></div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.confirmContent}>
                        <div className={styles.warningIcon}>
                            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className={styles.confirmText}>
                            This will send an emergency alert to nearby responders and your emergency contacts.
                        </p>
                        <p className={styles.alarmWarning}>
                            ⚠️ An alarm sound will play when activated
                        </p>
                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.confirmBtn}
                                onClick={handleConfirmSOS}
                            >
                                Confirm Emergency
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}

