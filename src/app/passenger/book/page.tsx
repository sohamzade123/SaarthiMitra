'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { mockDrivers, Driver } from '@/data/mockDrivers';
import { fetchDrivers, bookDriver } from '@/services/mockApi';
import styles from './page.module.css';

export default function BookCabPage() {
    const router = useRouter();
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDrivers, setShowDrivers] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        verified: true,
        nonAlcoholTested: true,
        authorized: true
    });

    const handleSearch = async () => {
        if (!pickupLocation || !destination) return;

        setIsLoading(true);
        try {
            const results = await fetchDrivers(filters);
            setDrivers(results);
            setShowDrivers(true);
        } catch {
            console.error('Failed to fetch drivers');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookDriver = async (driver: Driver) => {
        setSelectedDriver(driver);
        setIsBooking(true);

        try {
            await bookDriver(driver.id);
            setBookingConfirmed(true);

            setTimeout(() => {
                router.push('/passenger/trip');
            }, 2000);
        } catch {
            console.error('Failed to book driver');
            setIsBooking(false);
        }
    };

    const filteredDrivers = drivers.filter(driver => {
        if (filters.verified && !driver.verified) return false;
        if (filters.nonAlcoholTested && !driver.nonAlcoholTested) return false;
        if (filters.authorized && !driver.authorized) return false;
        return true;
    });

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
                <h1>Book a Cab</h1>
            </header>

            <main className={styles.main}>
                {/* Booking Confirmed Overlay */}
                {bookingConfirmed && (
                    <div className={styles.bookingOverlay}>
                        <div className={styles.bookingConfirmed}>
                            <div className={styles.confirmedIcon}>
                                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2>Booking Confirmed!</h2>
                            <p>{selectedDriver?.name} is on the way</p>
                            <div className={styles.etaBadge}>
                                <span>ETA: {selectedDriver?.eta}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Section */}
                <Card variant="glass" className={styles.searchCard}>
                    <div className={styles.searchForm}>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputIcon}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter pickup location"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                            />
                        </div>

                        <div className={styles.routeLine}>
                            <div className={styles.routeDots}></div>
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
                                placeholder="Enter destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>

                        <button
                            className={styles.searchBtn}
                            onClick={handleSearch}
                            disabled={isLoading || !pickupLocation || !destination}
                        >
                            {isLoading ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Finding Drivers...
                                </>
                            ) : (
                                'Find Drivers'
                            )}
                        </button>
                    </div>
                </Card>

                {/* Filters */}
                {showDrivers && (
                    <section className={styles.filtersSection}>
                        <h3 className={styles.filterTitle}>Safety Filters</h3>
                        <div className={styles.filtersList}>
                            <label className={`${styles.filterItem} ${filters.verified ? styles.active : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={filters.verified}
                                    onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                                />
                                <span className={styles.checkbox}>
                                    {filters.verified && (
                                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                <span>✔ Verified</span>
                            </label>

                            <label className={`${styles.filterItem} ${filters.nonAlcoholTested ? styles.active : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={filters.nonAlcoholTested}
                                    onChange={(e) => setFilters({ ...filters, nonAlcoholTested: e.target.checked })}
                                />
                                <span className={styles.checkbox}>
                                    {filters.nonAlcoholTested && (
                                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                <span>✔ Non-alcohol tested</span>
                            </label>

                            <label className={`${styles.filterItem} ${filters.authorized ? styles.active : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={filters.authorized}
                                    onChange={(e) => setFilters({ ...filters, authorized: e.target.checked })}
                                />
                                <span className={styles.checkbox}>
                                    {filters.authorized && (
                                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                <span>✔ Authorized</span>
                            </label>
                        </div>
                    </section>
                )}

                {/* Drivers List */}
                {showDrivers && (
                    <section className={styles.driversSection}>
                        <h3 className={styles.sectionTitle}>
                            Available Drivers
                            <span className={styles.driverCount}>{filteredDrivers.length} found</span>
                        </h3>

                        <div className={styles.driversList}>
                            {filteredDrivers.map((driver, index) => (
                                <Card
                                    key={driver.id}
                                    className={styles.driverCard}
                                    hoverable
                                    padding="medium"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={styles.driverHeader}>
                                        <div className={styles.driverAvatar}>
                                            <span>{driver.name.charAt(0)}</span>
                                        </div>
                                        <div className={styles.driverInfo}>
                                            <h4>{driver.name}</h4>
                                            <div className={styles.driverMeta}>
                                                <span>⭐ {driver.rating}</span>
                                                <span>•</span>
                                                <span>{driver.trips} trips</span>
                                            </div>
                                        </div>
                                        <div className={styles.driverEta}>
                                            <span className={styles.eta}>{driver.eta}</span>
                                            <span className={styles.fare}>₹{driver.fare}</span>
                                        </div>
                                    </div>

                                    <div className={styles.vehicleInfo}>
                                        <span>{driver.vehicle.model}</span>
                                        <span className={styles.vehicleNumber}>{driver.vehicle.number}</span>
                                    </div>

                                    <div className={styles.badges}>
                                        {driver.verified && (
                                            <span className={`${styles.badge} ${styles.verified}`}>
                                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Verified
                                            </span>
                                        )}
                                        {driver.nonAlcoholTested && (
                                            <span className={`${styles.badge} ${styles.tested}`}>
                                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Tested
                                            </span>
                                        )}
                                        {driver.authorized && (
                                            <span className={`${styles.badge} ${styles.authorized}`}>
                                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Authorized
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        className={styles.bookBtn}
                                        onClick={() => handleBookDriver(driver)}
                                        disabled={isBooking}
                                    >
                                        {isBooking && selectedDriver?.id === driver.id ? (
                                            <>
                                                <div className={styles.spinner}></div>
                                                Booking...
                                            </>
                                        ) : (
                                            'Book Now'
                                        )}
                                    </button>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
