'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function LandingPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.container}>
      {/* Background decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        {/* Logo Icon - Centered above heading */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <Image
              src="/logo-icon.svg"
              alt="SaarthiMitra Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleGradient}>Saarthi</span>
            <span className={styles.titleAccent}>Mitra</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Your trusted companion for <span className={styles.highlight}>safe</span> journeys
        </p>

        {/* Features */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🛡️</span>
            <span>Verified Drivers</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🚨</span>
            <span>24/7 Emergency SOS</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📍</span>
            <span>Real-time Tracking</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className={styles.ctaButton}
          onClick={() => router.push('/role-select')}
        >
          <span>Get Started</span>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Trust badges */}
        <div className={styles.trustBadges}>
          <div className={styles.badge}>
            <strong>10K+</strong>
            <span>Safe Trips</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.badge}>
            <strong>500+</strong>
            <span>Verified Drivers</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.badge}>
            <strong>4.9★</strong>
            <span>User Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
