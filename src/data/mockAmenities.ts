export interface Amenity {
    id: string;
    name: string;
    type: 'fuel' | 'rest' | 'food' | 'hospital';
    brand?: string;
    location: {
        lat: number;
        lng: number;
    };
    address: string;
    rating: number;
    isOpen: boolean;
    distance: string;
    facilities?: string[];
}

export const mockAmenities: Amenity[] = [
    // Fuel Stations
    {
        id: 'fuel-1',
        name: 'Indian Oil Station',
        type: 'fuel',
        brand: 'Indian Oil',
        location: { lat: 28.6150, lng: 77.2180 },
        address: 'Ring Road, Nehru Place',
        rating: 4.5,
        isOpen: true,
        distance: '0.5 km',
        facilities: ['Air', 'Water', 'Restroom']
    },
    {
        id: 'fuel-2',
        name: 'HP Petrol Pump',
        type: 'fuel',
        brand: 'HP',
        location: { lat: 28.6280, lng: 77.2100 },
        address: 'Outer Ring Road, Saket',
        rating: 4.3,
        isOpen: true,
        distance: '2.3 km',
        facilities: ['Air', 'Water']
    },
    {
        id: 'fuel-3',
        name: 'Bharat Petroleum',
        type: 'fuel',
        brand: 'BPCL',
        location: { lat: 28.5950, lng: 77.2250 },
        address: 'NH48, Vasant Kunj',
        rating: 4.6,
        isOpen: true,
        distance: '4.1 km',
        facilities: ['Air', 'Water', 'Restroom', 'ATM']
    },

    // Rest Areas
    {
        id: 'rest-1',
        name: 'Highway Dhaba',
        type: 'rest',
        location: { lat: 28.6320, lng: 77.2350 },
        address: 'NH44, Near Faridabad',
        rating: 4.2,
        isOpen: true,
        distance: '5.5 km',
        facilities: ['Parking', 'Restroom', 'Food']
    },
    {
        id: 'rest-2',
        name: 'Truckers Stop',
        type: 'rest',
        location: { lat: 28.5800, lng: 77.2400 },
        address: 'Expressway, Sector 62',
        rating: 4.0,
        isOpen: true,
        distance: '8.2 km',
        facilities: ['Parking', 'Restroom', 'Food', 'Sleeping Area']
    },

    // Food
    {
        id: 'food-1',
        name: 'Highway Food Court',
        type: 'food',
        location: { lat: 28.6200, lng: 77.2280 },
        address: 'Ashram Chowk, New Delhi',
        rating: 4.4,
        isOpen: true,
        distance: '1.8 km',
        facilities: ['AC Dining', 'Restroom', 'WiFi']
    },

    // Hospital
    {
        id: 'hospital-1',
        name: 'AIIMS Hospital',
        type: 'hospital',
        location: { lat: 28.5672, lng: 77.2100 },
        address: 'Ansari Nagar, New Delhi',
        rating: 4.8,
        isOpen: true,
        distance: '6.5 km'
    }
];

// Sample route coordinates (Delhi to Agra simulation)
export const sampleRoutePoints = [
    { lat: 28.6139, lng: 77.2090 }, // Start: Delhi
    { lat: 28.5000, lng: 77.3500 },
    { lat: 28.2000, lng: 77.5000 },
    { lat: 27.8000, lng: 77.8000 },
    { lat: 27.1767, lng: 78.0081 }  // End: Agra
];
