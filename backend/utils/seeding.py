"""
Database Seeding Utility

This module checks if the MongoDB reviews collection is empty on startup.
If the collection is empty, it populates it with the list of sample reviews
defined in the data package.
"""

from data import SAMPLE_REVIEWS
from utils.database import review_collection

def seed_database():
    """
    Checks if the reviews collection is empty.
    If it is empty, inserts all mock reviews from SAMPLE_REVIEWS.
    Otherwise, skips seeding to prevent duplicating data.
    """
    try:
        # Check if the database collection is initialized successfully
        if review_collection is None:
            print("⚠️ Database collection is not initialized. Skipping seed.")
            return

        # Count the number of documents in the collection
        existing_count = review_collection.count_documents({})
        
        if existing_count == 0:
            # Collection is empty; insert the sample reviews
            # Since PyMongo modifies dictionaries in-place by adding an '_id' field,
            # we make copies of the review dicts to preserve SAMPLE_REVIEWS list in memory.
            reviews_to_insert = [dict(review) for review in SAMPLE_REVIEWS]
            review_collection.insert_many(reviews_to_insert)
            print(f"✅ Seeded {len(reviews_to_insert)} reviews into MongoDB.")
        else:
            # Data already exists; do not insert duplicates
            print("ℹ️ MongoDB already contains review data. Skipping seed.")
            
    except Exception as err:
        print(f"❌ Error during database seeding: {err}")
