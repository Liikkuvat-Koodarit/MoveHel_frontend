
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

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
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {reviews.map(review => (
                    
                   <li key={review.reviewId}>
                   <Box border={4} p={2} mb={2}>
                       <h2 style={{ fontFamily: 'Poppins'}}>{review.userName}</h2>
                       <p style={{ fontFamily: 'Arial, sans-serif' , padding: '1px 0' }}>{review.reviewText}</p> <br/>
                       <Rating value={review.rating} readOnly />
                   </Box>
               </li>
                ))}
            </ul>
        </div>
    );
}


