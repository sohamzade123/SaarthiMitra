'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Card from '@/components/Card';
import { mockAmenities, Amenity } from '@/data/mockAmenities';
import { fetchRouteAmenities } from '@/services/mockApi';
import styles from './page.module.css';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

export default function RouteAmenitiesPage() {
    const router = useRouter();
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'fuel' | 'rest' | 'food' | 'hospital'>('all');

    const handleSearch = async () => {
        if (!startLocation || !destination) return;

        setIsSearching(true);
        try {
            const results = await fetchRouteAmenities(
                { lat: 28.6139, lng: 77.2090 },
                { lat: 27.1767, lng: 78.0081 }
            );
            setAmenities(results);
            setShowResults(true);
        } catch {
            console.error('Failed to fetch amenities');
        } finally {
            setIsSearching(false);
        }
    };

    const filteredAmenities = activeFilter === 'all'
        ? amenities
        : amenities.filter(a => a.type === activeFilter);

    const mapMarkers = filteredAmenities.map(a => ({
        id: a.id,
        position: a.location,
        title: a.name,
        type: a.type as 'fuel' | 'rest',
        info: `${a.distance} • ${a.rating}★`
    }));

    const getAmenityIcon = (type: string) => {
        switch (type) {
            case 'fuel':
                return '⛽';
            case 'rest':
                return '🛏️';
            case 'food':
                return '🍽️';
            case 'hospital':
                return '🏥';
            default:
                return '📍';
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
                <h1>Route Amenities</h1>
            </header>

            <main className={styles.main}>
                {/* Search Section */}
                <Card variant="glass" className={styles.searchCard}>
                    <h2 className={styles.searchTitle}>Plan Your Route</h2>
                    <p className={styles.searchSubtitle}>
                        Find fuel stations, rest areas, and more along your journey
                    </p>

                    <div className={styles.searchForm}>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputIcon}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                                    <path strokeLinecap="round" strokeWidth={2} d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Start location (e.g., New Delhi)"
                                value={startLocation}
                                onChange={(e) => setStartLocation(e.target.value)}
                            />
                        </div>

                        <div className={styles.routeLine}>
                            <div className={styles.routeDot}></div>
                            <div className={styles.routeDash}></div>
                            <div className={styles.routeDot}></div>
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.inputIcon}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Destination (e.g., Agra)"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>

                        <button
                            className={styles.searchButton}
                            onClick={handleSearch}
                            disabled={isSearching || !startLocation || !destination}
                        >
                            {isSearching ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span>Find Amenities</span>
                                </>
                            )}
                        </button>
                    </div>
                </Card>

                {/* Results Section */}
                {showResults && (
                    <div className={styles.resultsSection}>
                        {/* Map */}
                        <section className={styles.mapSection}>
                            <MapComponent
                                markers={mapMarkers}
                                showRoute
                                origin={{ lat: 28.6139, lng: 77.2090 }}
                                destination={{ lat: 27.1767, lng: 78.0081 }}
                                zoom={9}
                                height="400px"
                            />
                        </section>

                        {/* Filters */}
                        <div className={styles.filters}>
                            {(['all', 'fuel', 'rest', 'food', 'hospital'] as const).map(filter => (
                                <button
                                    key={filter}
                                    className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter === 'all' && '📍 All'}
                                    {filter === 'fuel' && '⛽ Fuel'}
                                    {filter === 'rest' && '🛏️ Rest'}
                                    {filter === 'food' && '🍽️ Food'}
                                    {filter === 'hospital' && '🏥 Hospital'}
                                </button>
                            ))}
                        </div>

                        {/* Amenities List */}
                        <section className={styles.amenitiesSection}>
                            <h3 className={styles.sectionTitle}>
                                Along Your Route
                                <span className={styles.count}>{filteredAmenities.length} places</span>
                            </h3>

                            <div className={styles.amenitiesList}>
                                {filteredAmenities.map((amenity, index) => (
                                    <Card
                                        key={amenity.id}
                                        className={styles.amenityCard}
                                        padding="medium"
                                        hoverable
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className={styles.amenityHeader}>
                                            <span className={styles.amenityIcon}>{getAmenityIcon(amenity.type)}</span>
                                            <div className={styles.amenityInfo}>
                                                <h4>{amenity.name}</h4>
                                                {amenity.brand && <span className={styles.brand}>{amenity.brand}</span>}
                                            </div>
                                            <div className={styles.amenityRating}>
                                                <span>⭐ {amenity.rating}</span>
                                            </div>
                                        </div>

                                        <p className={styles.amenityAddress}>{amenity.address}</p>

                                        <div className={styles.amenityMeta}>
                                            <span className={styles.distance}>{amenity.distance}</span>
                                            <span className={`${styles.status} ${amenity.isOpen ? styles.open : styles.closed}`}>
                                                {amenity.isOpen ? 'Open' : 'Closed'}
                                            </span>
                                        </div>

                                        {amenity.facilities && (
                                            <div className={styles.facilities}>
                                                {amenity.facilities.map(facility => (
                                                    <span key={facility} className={styles.facilityTag}>{facility}</span>
                                                ))}
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}
