import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useEffect } from "react";
import Rating from '@mui/material/Rating';

export default function AddReview({ onAddReview, onClose, sportsPlaceId }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [sportsPlaceName, setSportsPlaceName] = useState('');

    useEffect(() => {
        // Fetch the name of the sports place based on the sportsPlaceId
        fetch(`http://your-api-url/sportsplaces/${sportsPlaceId}`)
            .then(response => response.json())
            .then(data => {
                setSportsPlaceName(data.name);
            })
            .catch(error => {
                console.error('Error fetching sports place name:', error);
            });
    }, [sportsPlaceId]);

    AddReview.propTypes = {
        onReview: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        onAddReview: PropTypes.func.isRequired
    };

    const handleSave = () => {
        const reviewData = {
            reviewText: reviewText,
            rating: rating,
            sportsPlaceId: sportsPlaceId,
            sportsPlaceName: sportsPlaceName
        };
        onAddReview(reviewData);
        setReviewText('');
        setRating(0);
        onClose();
        console.log("HANDLE SAVE:", reviewData);
    };

    return (
        <div>
            <TextField
                margin="dense"
                label="Kirjoita arviointi"
                fullWidth
                variant="standard"
                value={reviewText}
                onChange={event => setReviewText(event.target.value)}
            />
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <div style={{ marginTop: '10px' }}>
                <Button onClick={handleSave}>Tallenna</Button> 
            </div>
        </div>
    );
}
