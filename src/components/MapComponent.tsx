'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './MapComponent.module.css';

interface Location {
    lat: number;
    lng: number;
}

interface Marker {
    id: string;
    position: Location;
    title: string;
    type: 'mechanic' | 'fuel' | 'rest' | 'driver' | 'user';
    info?: string;
}

interface MapComponentProps {
    center?: Location;
    zoom?: number;
    markers?: Marker[];
    showRoute?: boolean;
    origin?: Location;
    destination?: Location;
    onMarkerClick?: (marker: Marker) => void;
    className?: string;
    height?: string;
}

// Demo Map Icons for different marker types
const markerIcons: Record<Marker['type'], string> = {
    mechanic: '🔧',
    fuel: '⛽',
    rest: '🛏️',
    driver: '🚗',
    user: '📍'
};

export default function MapComponent({
    markers = [],
    showRoute = false,
    className = '',
    height = '400px'
}: MapComponentProps) {
    const { theme } = useTheme();

    // Generate sample positions for demo pins
    const getPinPosition = (index: number, total: number) => {
        const baseX = 15 + (index * 60) / Math.max(total, 1);
        const baseY = 30 + ((index % 3) * 20);
        return { x: Math.min(baseX, 80), y: Math.min(baseY, 70) };
    };

    return (
        <div
            className={`${styles.demoMapContainer} ${className}`}
            style={{ height }}
            data-theme={theme}
        >
            {/* Map Grid Background */}
            <div className={styles.demoMapGrid}>
                <svg width="100%" height="100%" className={styles.gridSvg}>
                    <defs>
                        <pattern id="demoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                opacity="0.15"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#demoGrid)" />
                </svg>
            </div>

            {/* Sample Route Line */}
            {showRoute && (
                <svg className={styles.routeSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 10 70 Q 25 50, 40 55 T 70 35 T 90 25"
                        fill="none"
                        stroke="var(--accent-primary)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="0"
                        className={styles.routePath}
                    />
                    {/* Start point */}
                    <circle cx="10" cy="70" r="4" fill="var(--success)" className={styles.pulsePin} />
                    {/* End point */}
                    <circle cx="90" cy="25" r="4" fill="var(--danger)" className={styles.pulsePin} />
                </svg>
            )}

            {/* Demo Markers */}
            <div className={styles.markersContainer}>
                {markers.length > 0 ? (
                    markers.slice(0, 6).map((marker, index) => {
                        const pos = getPinPosition(index, markers.length);
                        return (
                            <div
                                key={marker.id}
                                className={styles.demoMarker}
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                    animationDelay: `${index * 150}ms`
                                }}
                                title={marker.title}
                            >
                                <span className={styles.markerIcon}>
                                    {markerIcons[marker.type]}
                                </span>
                                <span className={styles.markerLabel}>{marker.title}</span>
                            </div>
                        );
                    })
                ) : (
                    /* Default demo pins when no markers provided */
                    <>
                        <div className={styles.demoMarker} style={{ left: '20%', top: '35%', animationDelay: '0ms' }}>
                            <span className={styles.markerIcon}>🚗</span>
                            <span className={styles.markerLabel}>Driver</span>
                        </div>
                        <div className={styles.demoMarker} style={{ left: '45%', top: '55%', animationDelay: '150ms' }}>
                            <span className={styles.markerIcon}>🔧</span>
                            <span className={styles.markerLabel}>Mechanic</span>
                        </div>
                        <div className={styles.demoMarker} style={{ left: '70%', top: '40%', animationDelay: '300ms' }}>
                            <span className={styles.markerIcon}>⛽</span>
                            <span className={styles.markerLabel}>Fuel</span>
                        </div>
                        <div className={styles.demoMarker} style={{ left: '55%', top: '25%', animationDelay: '450ms' }}>
                            <span className={styles.markerIcon}>🛏️</span>
                            <span className={styles.markerLabel}>Rest Stop</span>
                        </div>
                    </>
                )}
            </div>

            {/* Map Icon Center Decoration */}
            <div className={styles.mapCenterIcon}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                </svg>
            </div>

            {/* Demo Badge */}
            <div className={styles.demoBadge}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>Demo Map – Live Google Maps enabled in production</span>
            </div>
        </div>
    );
}
