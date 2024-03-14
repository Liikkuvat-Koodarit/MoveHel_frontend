
import { useState, useEffect } from 'react';

export default function PlaceReviews(sportsPlaceId) {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = sportsPlaceId.sportsPlaceId;
    console.log(id)

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/location/review?sportsPlaceId=${id}`);
                console.log(`http://127.0.0.1:5000/location/review?sportsPlaceId=${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data.reviews);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Arvostelut</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <h2>Arvostelijan nimi tähän</h2>
                        {review.reviewText} <br/>
                        <b>Arvosana: {review.rating}</b>
                    </li>
                ))}
            </ul>
        </div>
    );
}


