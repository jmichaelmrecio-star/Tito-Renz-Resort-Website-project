// Service data configuration - mirrors frontend resortServices
// This ensures backend price validation matches frontend displays

module.exports = [
    // === VILLA ROOMS ===
    {
        id: 'villa_room_1',
        name: 'Villa #1',
        type: 'villa',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable villa room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Villa_room.jpg',
        gallery: ['images/Villa_room.jpg', 'images/Villa_room_bathroom.jpg', 'images/Villa_room_sala.jpg', 'images/Villa_room_sala_pic_2.jpg', 'images/Villa_room_other_angle.jpg', 'images/Villas.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 3000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Living area with Sofa bed',
            'Mini Refrigerator', 'Flat screen television', 'Instagrammable view',
            'Griller', 'Free use of parking space', 'Kiddie Pool', 'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'villa_room_2',
        name: 'Villa #2',
        type: 'villa',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable villa room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Villa_room.jpg',
        gallery: ['images/Villa_room.jpg', 'images/Villa_room_bathroom.jpg', 'images/Villa_room_sala.jpg', 'images/Villa_room_sala_pic_2.jpg', 'images/Villa_room_other_angle.jpg', 'images/Villas.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 3000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Living area with Sofa bed',
            'Mini Refrigerator', 'Flat screen television', 'Instagrammable view',
            'Griller', 'Free use of parking space', 'Kiddie Pool', 'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'villa_room_3',
        name: 'Villa #3',
        type: 'villa',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable villa room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Villa_room.jpg',
        gallery: ['images/Villa_room.jpg', 'images/Villa_room_bathroom.jpg', 'images/Villa_room_sala.jpg', 'images/Villa_room_sala_pic_2.jpg', 'images/Villa_room_other_angle.jpg', 'images/Villas.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 3000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Living area with Sofa bed',
            'Mini Refrigerator', 'Flat screen television', 'Instagrammable view',
            'Griller', 'Free use of parking space', 'Kiddie Pool', 'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'villa_room_4',
        name: 'Villa #4',
        type: 'villa',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable villa room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Villa_room.jpg',
        gallery: ['images/Villa_room.jpg', 'images/Villa_room_bathroom.jpg', 'images/Villa_room_sala.jpg', 'images/Villa_room_sala_pic_2.jpg', 'images/Villa_room_other_angle.jpg', 'images/Villas.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 4000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 6000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Living area with Sofa bed',
            'Mini Refrigerator', 'Flat screen television', 'Instagrammable view',
            'Griller', 'Free use of parking space', 'Kiddie Pool', 'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Villa guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    
    // === CHARM ROOMS ===
    {
        id: 'charm_room_1',
        name: 'Charm #1',
        type: 'charm',
        category: 'accommodation',
        max_guests: 8,
        description: 'Spacious and charming room perfect for larger groups or families. Good for 8 pax.',
        image: 'images/Charm_room_1.jpg',
        gallery: ['images/Charm_room_1.jpg', 'images/Charm_room_bathroom.jpg', 'images/Charm_room_newroom.jpg', 'images/Charm_room_newroom_other_angle.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 3000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 6000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Free access to swimming pool (if available)',
            'Instagrammable view', 'Griller', 'Free use of parking space', 'Kiddie Pool',
            'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'charm_room_2',
        name: 'Charm #2',
        type: 'charm',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable charm room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Charm_room_2.jpg',
        gallery: ['images/Charm_room_2.jpg', 'images/Charm_room_bathroom.jpg', 'images/Charm_room_newroom.jpg', 'images/Charm_room_newroom_other_angle.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 2000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Free access to swimming pool (if available)',
            'Instagrammable view', 'Griller', 'Free use of parking space', 'Kiddie Pool',
            'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'charm_room_3',
        name: 'Charm #3',
        type: 'charm',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable charm room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Charm_room_3.jpg',
        gallery: ['images/Charm_room_3.jpg', 'images/Charm_room_bathroom.jpg', 'images/Charm_room_newroom.jpg', 'images/Charm_room_newroom_other_angle.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 2000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Free access to swimming pool (if available)',
            'Instagrammable view', 'Griller', 'Free use of parking space', 'Kiddie Pool',
            'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'charm_room_4',
        name: 'Charm #4',
        type: 'charm',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable charm room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Charm_room_4.jpg',
        gallery: ['images/Charm_room_4.jpg', 'images/Charm_room_bathroom.jpg', 'images/Charm_room_newroom.jpg', 'images/Charm_room_newroom_other_angle.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 2000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Free access to swimming pool (if available)',
            'Instagrammable view', 'Griller', 'Free use of parking space', 'Kiddie Pool',
            'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    {
        id: 'charm_room_5',
        name: 'Charm #5',
        type: 'charm',
        category: 'accommodation',
        max_guests: 4,
        description: 'Comfortable charm room perfect for small families or groups. Good for 4 pax.',
        image: 'images/Charm_room_5.jpg',
        gallery: ['images/Charm_room_5.jpg', 'images/Charm_room_bathroom.jpg', 'images/Charm_room_newroom.jpg', 'images/Charm_room_newroom_other_angle.jpg'],
        durations: [
            { id: 'duration_12h', label: '12 Hours', hours: 12, price: 2000.00 },
            { id: 'duration_22h', label: '22 Hours', hours: 22, price: 4000.00 }
        ],
        defaultDuration: 'duration_12h',
        inclusions: [
            'Hot and cold shower', 'Fully air-conditioned', 'Free access to swimming pool (if available)',
            'Instagrammable view', 'Griller', 'Free use of parking space', 'Kiddie Pool',
            'CCTV Cameras', 'No corkage fee'
        ],
        notes: 'Charm guests are NOT allowed to use the private pool if it is reserved or exclusive to the other customer.',
        extensionRate: { day: 200, night: 250 }
    },
    
    // === VENUES ===
    {
        id: '2nd_floor_resto_hall',
        name: '2nd Floor Resto Hall',
        type: 'venue',
        category: 'event_space',
        max_guests: 80,
        description: 'Fully air-conditioned event hall perfect for celebrations, meetings, and gatherings. Maximum capacity 80 pax.',
        image: 'images/2nd_Floor_Resto_Hall.jpg',
        gallery: ['images/2nd_Floor_Resto_Hall.jpg', 'images/2nd_Floor_Resto_Hall_below_it.jpg', 'images/2nd_Floor_Resto_Hall_below_it_2.jpg'],
        durations: [
            { id: 'duration_3h', label: '3 Hours', hours: 3, price: 10000.00 },
            { id: 'duration_5h', label: '5 Hours', hours: 5, price: 12000.00 }
        ],
        defaultDuration: 'duration_3h',
        inclusions: [
            'Fully air-conditioned venue', 'Tables and chairs', 'Sound system', 'Free use of parking space'
        ],
        extensionRate: null
    },
    {
        id: 'cloverleaf_hall',
        name: 'Cloverleaf Hall',
        type: 'venue',
        category: 'event_space',
        max_guests: 150,
        description: 'Spacious air-conditioned hall ideal for large events, weddings, and corporate functions. Maximum capacity 150 pax (depending on event setup).',
        image: 'images/Cloverleaf_Hall.jpg',
        gallery: ['images/Cloverleaf_Hall.jpg', 'images/Cloverleaf_Hall_ceiling.jpg', 'images/Cloverleaf_Hall_ceiling_2.jpg'],
        durations: [
            { id: 'duration_3h', label: '3 Hours', hours: 3, price: 12000.00 },
            { id: 'duration_5h', label: '5 Hours', hours: 5, price: 18000.00 }
        ],
        defaultDuration: 'duration_3h',
        inclusions: [
            'Fully air-conditioned venue', 'Tables and chairs', 'Sound system', 'Free use of parking space'
        ],
        extensionRate: null
    },
    {
        id: 'private_pool_area',
        name: 'Private Pool Area',
        type: 'venue',
        category: 'water_facility',
        max_guests: 70,
        description: 'Exclusive pool area rental perfect for private parties, team building, and celebrations.',
        image: 'images/Pool_Area.jpg',
        gallery: ['images/Pool_Area.jpg', 'images/Pool_Area_other_View.jpg', 'images/Pool_Area_other_View_2.jpg', 'images/Pool_Area_other_View_3.jpg'],
        timeSlots: [
            {
                id: 'slot_day_30_40',
                label: 'Day (7am - 5pm) - 30 to 40 pax',
                timeRange: 'day',
                guestRange: { min: 30, max: 40 },
                price: 12000.00
            },
            {
                id: 'slot_day_50_70',
                label: 'Day (7am - 5pm) - 50 to 70 pax',
                timeRange: 'day',
                guestRange: { min: 50, max: 70 },
                price: 15000.00
            },
            {
                id: 'slot_night_30_40',
                label: 'Night (7pm - 5am) - 30 to 40 pax',
                timeRange: 'night',
                guestRange: { min: 30, max: 40 },
                price: 15000.00
            },
            {
                id: 'slot_night_50_70',
                label: 'Night (7pm - 5am) - 50 to 70 pax',
                timeRange: 'night',
                guestRange: { min: 50, max: 70 },
                price: 18000.00
            }
        ],
        defaultDuration: null,
        inclusions: [
            'Exclusive pool access', 'Pool pavilion', 'Tables and chairs', 'Free use of parking space'
        ],
        extensionRate: null
    }
];
