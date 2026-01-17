export interface Driver {
    id: string;
    name: string;
    photo: string;
    rating: number;
    trips: number;
    vehicle: {
        model: string;
        number: string;
        color: string;
    };
    verified: boolean;
    nonAlcoholTested: boolean;
    authorized: boolean;
    currentLocation: {
        lat: number;
        lng: number;
    };
    eta: string;
    fare: number;
}

export const mockDrivers: Driver[] = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        photo: '/drivers/driver1.jpg',
        rating: 4.9,
        trips: 2547,
        vehicle: {
            model: 'Maruti Suzuki Dzire',
            number: 'DL 01 AB 1234',
            color: 'White'
        },
        verified: true,
        nonAlcoholTested: true,
        authorized: true,
        currentLocation: { lat: 28.6129, lng: 77.2295 },
        eta: '3 mins',
        fare: 180
    },
    {
        id: '2',
        name: 'Amit Sharma',
        photo: '/drivers/driver2.jpg',
        rating: 4.7,
        trips: 1823,
        vehicle: {
            model: 'Hyundai Xcent',
            number: 'DL 02 CD 5678',
            color: 'Silver'
        },
        verified: true,
        nonAlcoholTested: true,
        authorized: true,
        currentLocation: { lat: 28.6200, lng: 77.2100 },
        eta: '5 mins',
        fare: 175
    },
    {
        id: '3',
        name: 'Suresh Yadav',
        photo: '/drivers/driver3.jpg',
        rating: 4.8,
        trips: 3102,
        vehicle: {
            model: 'Honda Amaze',
            number: 'DL 03 EF 9012',
            color: 'Black'
        },
        verified: true,
        nonAlcoholTested: true,
        authorized: true,
        currentLocation: { lat: 28.6050, lng: 77.2150 },
        eta: '4 mins',
        fare: 195
    },
    {
        id: '4',
        name: 'Vikram Singh',
        photo: '/drivers/driver4.jpg',
        rating: 4.6,
        trips: 987,
        vehicle: {
            model: 'Tata Tigor',
            number: 'DL 04 GH 3456',
            color: 'Blue'
        },
        verified: true,
        nonAlcoholTested: false,
        authorized: true,
        currentLocation: { lat: 28.6180, lng: 77.2250 },
        eta: '7 mins',
        fare: 165
    },
    {
        id: '5',
        name: 'Mohammed Ali',
        photo: '/drivers/driver5.jpg',
        rating: 4.9,
        trips: 4521,
        vehicle: {
            model: 'Maruti Suzuki Ertiga',
            number: 'DL 05 IJ 7890',
            color: 'Grey'
        },
        verified: true,
        nonAlcoholTested: true,
        authorized: true,
        currentLocation: { lat: 28.6100, lng: 77.2000 },
        eta: '6 mins',
        fare: 220
    }
];
