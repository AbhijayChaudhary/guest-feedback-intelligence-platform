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

This mock data is kept in-memory to simulate a database query for future API endpoints.
"""

from typing import List, Dict, Any

# In-memory list of sample reviews
# Future routes can import this list directly
SAMPLE_REVIEWS: List[Dict[str, Any]] = [
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
    }
]
