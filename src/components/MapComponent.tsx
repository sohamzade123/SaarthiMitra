'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './MapComponent.module.css';

// Mock Google Maps API key - In production, use environment variable
const GOOGLE_MAPS_API_KEY = 'AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik';

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

declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
    }
}

export default function MapComponent({
    center = { lat: 28.6139, lng: 77.2090 }, // Default: Delhi
    zoom = 13,
    markers = [],
    showRoute = false,
    origin,
    destination,
    onMarkerClick,
    className = '',
    height = '400px'
}: MapComponentProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
    const { theme } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);

    // Dark mode map styles
    const darkMapStyles: google.maps.MapTypeStyle[] = [
        { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1e293b' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
        { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#334155' }] },
        { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#1e3a2f' }] },
    ];

    // Load Google Maps script
    useEffect(() => {
        if (window.google && window.google.maps) {
            setIsLoaded(true);
            return;
        }

        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) {
            existingScript.addEventListener('load', () => setIsLoaded(true));
            existingScript.addEventListener('error', () => setLoadError(true));
            return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);
        script.onerror = () => setLoadError(true);
        document.head.appendChild(script);
    }, []);

    // Initialize map
    useEffect(() => {
        if (!isLoaded || !mapRef.current || loadError) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            styles: theme === 'dark' ? darkMapStyles : [],
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
        });

        mapInstanceRef.current = map;
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
            map,
            suppressMarkers: false,
            polylineOptions: {
                strokeColor: '#0ea5e9',
                strokeWeight: 5,
                strokeOpacity: 0.8
            }
        });
    }, [isLoaded, loadError]);

    // Update map theme
    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setOptions({
                styles: theme === 'dark' ? darkMapStyles : []
            });
        }
    }, [theme]);

    // Update markers
    useEffect(() => {
        if (!mapInstanceRef.current || !isLoaded) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add new markers
        markers.forEach(markerData => {
            const markerIcon = getMarkerIcon(markerData.type);

            const marker = new window.google.maps.Marker({
                position: markerData.position,
                map: mapInstanceRef.current,
                title: markerData.title,
                icon: markerIcon,
                animation: window.google.maps.Animation.DROP
            });

            if (markerData.info) {
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `<div style="color:#0f172a;padding:8px"><strong>${markerData.title}</strong><p style="margin:4px 0 0">${markerData.info}</p></div>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(mapInstanceRef.current, marker);
                    onMarkerClick?.(markerData);
                });
            }

            markersRef.current.push(marker);
        });
    }, [markers, isLoaded, onMarkerClick]);

    // Draw route
    useEffect(() => {
        if (!showRoute || !origin || !destination || !directionsRendererRef.current || !isLoaded) return;

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === 'OK' && result) {
                    directionsRendererRef.current?.setDirections(result);
                }
            }
        );
    }, [showRoute, origin, destination, isLoaded]);

    if (loadError) {
        return (
            <div className={`${styles.mapPlaceholder} ${className}`} style={{ height }}>
                <div className={styles.placeholderContent}>
                    <div className={styles.mapIcon}>
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <p className={styles.placeholderText}>Map loading...</p>
                    <p className={styles.placeholderSubtext}>Interactive map will appear here</p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className={`${styles.mapContainer} ${className}`} style={{ height }}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading map...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={mapRef}
            className={`${styles.mapContainer} ${className}`}
            style={{ height }}
        />
    );
}

function getMarkerIcon(type: Marker['type']): google.maps.Icon {
    const colors: Record<Marker['type'], string> = {
        mechanic: '#f59e0b',
        fuel: '#10b981',
        rest: '#8b5cf6',
        driver: '#0ea5e9',
        user: '#ef4444'
    };

    return {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: colors[type],
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 1.8,
        anchor: new window.google.maps.Point(12, 24)
    };
}
