"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getReviews } from "@/services/api";

export default function ReviewList() {
    const { token, loading: authLoading } = useAuth();
    // Stores the reviews fetched from the backend
    const [reviews, setReviews] = useState([]);

    // Used to display a loading message while data is being fetched
    const [loading, setLoading] = useState(true);

    // Fetch reviews once when the component is first loaded
    useEffect(() => {
        if (authLoading) return;

        // Stop loading gracefully if unauthenticated, preventing 401 calls
        if (!token) {
            setLoading(false);
            return;
        }

        async function fetchReviews() {
            try {
                const data = await getReviews(token);
                // Save the reviews into state
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                // Stop showing the loading message
                setLoading(false);
            }
        }

        fetchReviews();
    }, [authLoading, token]);

    // Display a loading message until the API call completes
    if (loading) {
        return (
            <p className="text-center text-gray-500">
                Loading reviews...
            </p>
        );
    }

    return (
        <div className="grid gap-6 mt-8">
            {/* Display only the first 5 reviews */}
            {reviews.slice(0, 5).map((review) => (
                <div
                    key={review.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm bg-white dark:bg-gray-800"
                >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {review.guest_name}
                    </h3>

                    <p className="text-yellow-500 mt-1">
                        Rating: {review.rating}/5
                    </p>

                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                        {review.review}
                    </p>

                    <div className="mt-4 flex gap-3 text-sm">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {review.category}
                        </span>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            {review.sentiment}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}