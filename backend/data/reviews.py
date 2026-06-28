"""
Sample Reviews Data

This module contains a set of realistic guest reviews for a homestay/hospitality business.
It includes positive, negative, and neutral reviews covering various categories:
- Cleanliness
- Food
- Staff
- Check-in
- Room
- Location
- Amenities
- Value for Money
- Wi-Fi
- Parking

This mock data is kept in-memory to simulate a database query for future API endpoints.
"""

from typing import List, Dict, Any

# In-memory list of sample reviews
# Future routes can import this list directly
SAMPLE_REVIEWS: List[Dict[str, Any]] = [
    # --- Original 9 reviews (preserved exactly) ---
    {
        "id": 1,
        "guest_name": "Alice Johnson",
        "rating": 5,
        "review": "The homestay was absolutely spotless! The bathrooms and bed sheets were incredibly clean and fresh. Highly recommended!",
        "sentiment": "Positive",
        "category": "Cleanliness",
        "created_at": "2026-06-20T10:00:00Z"
    },
    {
        "id": 2,
        "guest_name": "Mark Davis",
        "rating": 2,
        "review": "The breakfast provided was cold and quite disappointing. There were limited options and we ended up eating out.",
        "sentiment": "Negative",
        "category": "Food",
        "created_at": "2026-06-21T08:30:00Z"
    },
    {
        "id": 3,
        "guest_name": "Sophia Martinez",
        "rating": 5,
        "review": "The host and staff were incredibly welcoming and helpful. They went above and beyond to suggest local sightseeing spots.",
        "sentiment": "Positive",
        "category": "Staff",
        "created_at": "2026-06-22T14:15:00Z"
    },
    {
        "id": 4,
        "guest_name": "David Wilson",
        "rating": 3,
        "review": "The check-in process was a bit slow as the host was occupied, but once we got in, everything went smoothly.",
        "sentiment": "Neutral",
        "category": "Check-in",
        "created_at": "2026-06-23T11:45:00Z"
    },
    {
        "id": 5,
        "guest_name": "Emily Taylor",
        "rating": 4,
        "review": "Our room was spacious with a beautiful view of the hills. The bed was comfortable, though the air conditioning was a bit noisy.",
        "sentiment": "Positive",
        "category": "Room",
        "created_at": "2026-06-24T16:20:00Z"
    },
    {
        "id": 6,
        "guest_name": "Robert Brown",
        "rating": 3,
        "review": "The location is okay—nice and quiet, but a bit far from the main city center and public transit options.",
        "sentiment": "Neutral",
        "category": "Location",
        "created_at": "2026-06-25T09:10:00Z"
    },
    {
        "id": 7,
        "guest_name": "Jessica Thomas",
        "rating": 1,
        "review": "The Wi-Fi was completely broken during our stay, and the hot water shower stopped working on our second day.",
        "sentiment": "Negative",
        "category": "Amenities",
        "created_at": "2026-06-26T19:40:00Z"
    },
    {
        "id": 8,
        "guest_name": "James Smith",
        "rating": 2,
        "review": "There was dust on the shelves and we found some hairs on the bathroom floor. Could definitely be cleaner.",
        "sentiment": "Negative",
        "category": "Cleanliness",
        "created_at": "2026-06-26T21:10:00Z"
    },
    {
        "id": 9,
        "guest_name": "Sarah Miller",
        "rating": 5,
        "review": "Such friendly service! They even prepared a complimentary local dessert for us in the evening.",
        "sentiment": "Positive",
        "category": "Staff",
        "created_at": "2026-06-27T11:00:00Z"
    },

    # --- New reviews (IDs 10–40) ---
    {
        "id": 10,
        "guest_name": "Liam Anderson",
        "rating": 4,
        "review": "Great value for money. The facilities are basic but more than sufficient for a comfortable short stay.",
        "sentiment": "Positive",
        "category": "Value for Money",
        "created_at": "2026-06-27T13:00:00Z"
    },
    {
        "id": 11,
        "guest_name": "Priya Patel",
        "rating": 5,
        "review": "The homemade breakfast was absolutely delicious. Fresh fruit, warm parathas, and a lovely cup of masala chai every morning.",
        "sentiment": "Positive",
        "category": "Food",
        "created_at": "2026-06-27T15:30:00Z"
    },
    {
        "id": 12,
        "guest_name": "Carlos Gomez",
        "rating": 1,
        "review": "Parking was a nightmare. There was no designated space and we had to park two streets away every single night.",
        "sentiment": "Negative",
        "category": "Parking",
        "created_at": "2026-06-27T18:45:00Z"
    },
    {
        "id": 13,
        "guest_name": "Natalie Hughes",
        "rating": 4,
        "review": "The Wi-Fi speed was solid throughout our three-night stay. Video calls and streaming worked without any drops.",
        "sentiment": "Positive",
        "category": "Wi-Fi",
        "created_at": "2026-06-27T20:00:00Z"
    },
    {
        "id": 14,
        "guest_name": "Oliver Nguyen",
        "rating": 3,
        "review": "The room was reasonably clean but felt a bit dated. The mattress could use replacing—we woke up with mild back aches.",
        "sentiment": "Neutral",
        "category": "Room",
        "created_at": "2026-06-28T08:00:00Z"
    },
    {
        "id": 15,
        "guest_name": "Fatima Al-Hassan",
        "rating": 5,
        "review": "The location was perfect—walking distance to the old market and great local restaurants. We explored everywhere on foot.",
        "sentiment": "Positive",
        "category": "Location",
        "created_at": "2026-06-28T09:15:00Z"
    },
    {
        "id": 16,
        "guest_name": "Tom Erikson",
        "rating": 2,
        "review": "Check-in was confusing. We received conflicting messages about the key pickup location and waited over an hour in the heat.",
        "sentiment": "Negative",
        "category": "Check-in",
        "created_at": "2026-06-28T10:30:00Z"
    },
    {
        "id": 17,
        "guest_name": "Mia Chen",
        "rating": 5,
        "review": "Every corner of the property was immaculate. The towels smelled freshly laundered and the floors were spotless.",
        "sentiment": "Positive",
        "category": "Cleanliness",
        "created_at": "2026-06-28T11:00:00Z"
    },
    {
        "id": 18,
        "guest_name": "Ethan Walker",
        "rating": 4,
        "review": "The host was very responsive on WhatsApp and answered all our questions promptly. Made the whole experience much smoother.",
        "sentiment": "Positive",
        "category": "Staff",
        "created_at": "2026-06-28T12:20:00Z"
    },
    {
        "id": 19,
        "guest_name": "Aarav Shah",
        "rating": 3,
        "review": "The amenities listed online included a washing machine, but it turned out to be broken. Not the end of the world but inconvenient.",
        "sentiment": "Neutral",
        "category": "Amenities",
        "created_at": "2026-06-28T13:45:00Z"
    },
    {
        "id": 20,
        "guest_name": "Clara Dubois",
        "rating": 5,
        "review": "Exceptional price for what you get. A cozy private room, great breakfast, and a beautiful garden—all at a budget-friendly rate.",
        "sentiment": "Positive",
        "category": "Value for Money",
        "created_at": "2026-06-28T14:30:00Z"
    },
    {
        "id": 21,
        "guest_name": "Kevin O'Brien",
        "rating": 2,
        "review": "The food options were repetitive throughout the week. Same eggs and toast every morning. A bit more variety would go a long way.",
        "sentiment": "Negative",
        "category": "Food",
        "created_at": "2026-06-28T15:00:00Z"
    },
    {
        "id": 22,
        "guest_name": "Yuki Tanaka",
        "rating": 4,
        "review": "The parking spot was conveniently reserved and well-lit. No issues parking our SUV for four nights.",
        "sentiment": "Positive",
        "category": "Parking",
        "created_at": "2026-06-28T15:45:00Z"
    },
    {
        "id": 23,
        "guest_name": "Amara Diallo",
        "rating": 1,
        "review": "The Wi-Fi password given to us was incorrect. It took two days for the host to fix it. Completely unusable for work.",
        "sentiment": "Negative",
        "category": "Wi-Fi",
        "created_at": "2026-06-28T16:30:00Z"
    },
    {
        "id": 24,
        "guest_name": "Hannah Schmidt",
        "rating": 5,
        "review": "Loved the room decor—very tastefully done with local artwork. The bed was extremely comfortable and the pillow selection was great.",
        "sentiment": "Positive",
        "category": "Room",
        "created_at": "2026-06-28T17:00:00Z"
    },
    {
        "id": 25,
        "guest_name": "Ben Foster",
        "rating": 3,
        "review": "The property is situated in a peaceful neighbourhood. However, there are no convenience stores nearby, which was mildly inconvenient.",
        "sentiment": "Neutral",
        "category": "Location",
        "created_at": "2026-06-28T17:30:00Z"
    },
    {
        "id": 26,
        "guest_name": "Layla Khan",
        "rating": 4,
        "review": "Check-in was smooth and quick. The host met us at the door with a warm welcome and walked us through the property.",
        "sentiment": "Positive",
        "category": "Check-in",
        "created_at": "2026-06-28T18:00:00Z"
    },
    {
        "id": 27,
        "guest_name": "Samuel Okonkwo",
        "rating": 2,
        "review": "The kitchen was not as clean as expected. Grease marks on the stovetop and a sticky countertop made it unpleasant to use.",
        "sentiment": "Negative",
        "category": "Cleanliness",
        "created_at": "2026-06-28T18:30:00Z"
    },
    {
        "id": 28,
        "guest_name": "Isabelle Laurent",
        "rating": 5,
        "review": "The staff went out of their way to arrange a surprise birthday setup for my partner. It was such a thoughtful and memorable gesture.",
        "sentiment": "Positive",
        "category": "Staff",
        "created_at": "2026-06-28T19:00:00Z"
    },
    {
        "id": 29,
        "guest_name": "Rajan Kapoor",
        "rating": 3,
        "review": "The pool and common area were decent. A bit of maintenance is needed—one of the lounge chairs was broken and the towels were thin.",
        "sentiment": "Neutral",
        "category": "Amenities",
        "created_at": "2026-06-28T19:30:00Z"
    },
    {
        "id": 30,
        "guest_name": "Grace Kim",
        "rating": 4,
        "review": "Reasonable pricing for a central location. Got a lot more than we expected for the nightly rate. Would definitely book again.",
        "sentiment": "Positive",
        "category": "Value for Money",
        "created_at": "2026-06-28T20:00:00Z"
    },
    {
        "id": 31,
        "guest_name": "Daniel Ferreira",
        "rating": 5,
        "review": "The dinner prepared by the host was outstanding—freshly cooked local cuisine served with love. Felt like a home-cooked meal.",
        "sentiment": "Positive",
        "category": "Food",
        "created_at": "2026-06-28T20:30:00Z"
    },
    {
        "id": 32,
        "guest_name": "Nora Lindqvist",
        "rating": 3,
        "review": "Parking is available but quite cramped. We managed, though pulling in was a tight maneuver especially with a larger vehicle.",
        "sentiment": "Neutral",
        "category": "Parking",
        "created_at": "2026-06-28T21:00:00Z"
    },
    {
        "id": 33,
        "guest_name": "Marcus Reid",
        "rating": 4,
        "review": "The Wi-Fi was reliable and fast enough for remote work. Had a few minor drops in signal in the back bedroom but nothing major.",
        "sentiment": "Positive",
        "category": "Wi-Fi",
        "created_at": "2026-06-28T21:30:00Z"
    },
    {
        "id": 34,
        "guest_name": "Aisha Musa",
        "rating": 1,
        "review": "The room had a musty smell that never went away despite requesting fresh linen. Not acceptable for the price paid.",
        "sentiment": "Negative",
        "category": "Room",
        "created_at": "2026-06-28T22:00:00Z"
    },
    {
        "id": 35,
        "guest_name": "Julian Becker",
        "rating": 5,
        "review": "Perfectly situated near hiking trails and a beautiful lake. We didn't need a car at all during our four-day stay.",
        "sentiment": "Positive",
        "category": "Location",
        "created_at": "2026-06-28T22:30:00Z"
    },
    {
        "id": 36,
        "guest_name": "Mei Lin",
        "rating": 2,
        "review": "Self check-in instructions were unclear. The lockbox code didn't work initially and we had to wait an hour for the host to respond.",
        "sentiment": "Negative",
        "category": "Check-in",
        "created_at": "2026-06-28T23:00:00Z"
    },
    {
        "id": 37,
        "guest_name": "Victor Mensah",
        "rating": 4,
        "review": "Very clean throughout our stay. Housekeeping refreshed the rooms daily, which is something we really appreciated.",
        "sentiment": "Positive",
        "category": "Cleanliness",
        "created_at": "2026-06-28T23:30:00Z"
    },
    {
        "id": 38,
        "guest_name": "Chloe Moreau",
        "rating": 3,
        "review": "The staff were polite but not particularly proactive. Had to ask multiple times for basic things like extra towels and hangers.",
        "sentiment": "Neutral",
        "category": "Staff",
        "created_at": "2026-06-29T08:00:00Z"
    },
    {
        "id": 39,
        "guest_name": "Ivan Petrov",
        "rating": 5,
        "review": "The gym and rooftop terrace were fantastic additions. Well-maintained, fully equipped, and never overcrowded during our stay.",
        "sentiment": "Positive",
        "category": "Amenities",
        "created_at": "2026-06-29T09:00:00Z"
    },
    {
        "id": 40,
        "guest_name": "Nina Okafor",
        "rating": 3,
        "review": "Fair price for the area. Nothing remarkable, but we got what we paid for. A few small improvements would make it worth more.",
        "sentiment": "Neutral",
        "category": "Value for Money",
        "created_at": "2026-06-29T10:00:00Z"
    }
]
