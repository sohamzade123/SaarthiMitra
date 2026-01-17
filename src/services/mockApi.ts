import { mockDrivers, Driver } from '@/data/mockDrivers';
import { mockMechanics, Mechanic } from '@/data/mockMechanics';
import { mockAmenities, Amenity } from '@/data/mockAmenities';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication
export async function mockLogin(userData: {
    fullName: string;
    email: string;
    phone: string;
    altPhone: string;
}): Promise<{ success: boolean; token: string }> {
    await delay(1500);
    return {
        success: true,
        token: 'mock-jwt-token-' + Date.now()
    };
}

// Drivers
export async function fetchDrivers(filters?: {
    verified?: boolean;
    nonAlcoholTested?: boolean;
    authorized?: boolean;
}): Promise<Driver[]> {
    await delay(800);

    let drivers = [...mockDrivers];

    if (filters) {
        if (filters.verified) {
            drivers = drivers.filter(d => d.verified);
        }
        if (filters.nonAlcoholTested) {
            drivers = drivers.filter(d => d.nonAlcoholTested);
        }
        if (filters.authorized) {
            drivers = drivers.filter(d => d.authorized);
        }
    }

    return drivers;
}

export async function bookDriver(driverId: string): Promise<{
    success: boolean;
    bookingId: string;
    driver: Driver | undefined;
}> {
    await delay(1200);
    const driver = mockDrivers.find(d => d.id === driverId);
    return {
        success: true,
        bookingId: 'BOOK-' + Date.now(),
        driver
    };
}

// Mechanics
export async function fetchNearbyMechanics(location: { lat: number; lng: number }): Promise<Mechanic[]> {
    await delay(600);
    return mockMechanics;
}

export async function requestMechanicHelp(data: {
    mechanicId: string;
    issue: string;
    imageUrl?: string;
    voiceMessageUrl?: string;
}): Promise<{ success: boolean; requestId: string; eta: string }> {
    await delay(1500);
    const mechanic = mockMechanics.find(m => m.id === data.mechanicId);
    return {
        success: true,
        requestId: 'REQ-' + Date.now(),
        eta: mechanic?.eta || '15 mins'
    };
}

// Tyre Emergency
export async function requestTyreEmergency(location: { lat: number; lng: number }): Promise<{
    success: boolean;
    requestId: string;
    mechanicName: string;
    eta: string;
}> {
    await delay(2000);
    return {
        success: true,
        requestId: 'TYRE-' + Date.now(),
        mechanicName: '24x7 Tyre Service',
        eta: '12 mins'
    };
}

// Amenities
export async function fetchRouteAmenities(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
): Promise<Amenity[]> {
    await delay(1000);
    return mockAmenities;
}

// Emergency SOS
export async function sendEmergencySOS(data: {
    location: { lat: number; lng: number };
    userId: string;
    type: 'driver' | 'passenger';
}): Promise<{ success: boolean; alertId: string }> {
    await delay(1000);
    return {
        success: true,
        alertId: 'SOS-' + Date.now()
    };
}

// Geo-fencing
export async function checkRouteDeviation(
    currentLocation: { lat: number; lng: number },
    safeRoute: { lat: number; lng: number }[]
): Promise<{ isDeviated: boolean; deviationDistance: number }> {
    await delay(300);
    // Simplified check - in reality would use proper geo calculations
    const isDeviated = Math.random() > 0.8; // 20% chance of deviation for demo
    return {
        isDeviated,
        deviationDistance: isDeviated ? Math.floor(Math.random() * 500) + 100 : 0
    };
}
