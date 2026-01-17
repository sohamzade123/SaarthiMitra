export interface Mechanic {
    id: string;
    name: string;
    shopName: string;
    rating: number;
    reviews: number;
    specialties: string[];
    location: {
        lat: number;
        lng: number;
    };
    address: string;
    phone: string;
    isOpen: boolean;
    distance: string;
    eta: string;
}

export const mockMechanics: Mechanic[] = [
    {
        id: '1',
        name: 'Ramesh Gupta',
        shopName: 'Gupta Auto Works',
        rating: 4.8,
        reviews: 342,
        specialties: ['Tyre Repair', 'Engine Work', 'AC Service'],
        location: { lat: 28.6180, lng: 77.2150 },
        address: 'Shop 12, Nehru Place, New Delhi',
        phone: '+91 98765 43210',
        isOpen: true,
        distance: '1.2 km',
        eta: '8 mins'
    },
    {
        id: '2',
        name: 'Sanjay Mehta',
        shopName: 'Quick Fix Garage',
        rating: 4.6,
        reviews: 189,
        specialties: ['Tyre Repair', 'Battery', 'Oil Change'],
        location: { lat: 28.6100, lng: 77.2200 },
        address: '45 Lajpat Nagar, New Delhi',
        phone: '+91 98765 43211',
        isOpen: true,
        distance: '0.8 km',
        eta: '5 mins'
    },
    {
        id: '3',
        name: 'Kamal Singh',
        shopName: 'Singh Motors',
        rating: 4.9,
        reviews: 567,
        specialties: ['Full Service', 'Denting', 'Painting'],
        location: { lat: 28.6220, lng: 77.2050 },
        address: '78 Sarojini Nagar, New Delhi',
        phone: '+91 98765 43212',
        isOpen: true,
        distance: '2.1 km',
        eta: '12 mins'
    },
    {
        id: '4',
        name: 'Prakash Kumar',
        shopName: '24x7 Tyre Service',
        rating: 4.7,
        reviews: 234,
        specialties: ['Tyre Repair', 'Tyre Replacement', 'Wheel Alignment'],
        location: { lat: 28.6050, lng: 77.2300 },
        address: '23 Defence Colony, New Delhi',
        phone: '+91 98765 43213',
        isOpen: true,
        distance: '1.5 km',
        eta: '10 mins'
    }
];
