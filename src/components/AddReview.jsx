import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function AddReview({ onAddReview, onClose }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    
    AddReview.propTypes = {
        onReview: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    };

    const handleSave = () => {
        const reviewData = {
            reviewText: reviewText,
            rating: rating
        };
        onAddReview(reviewData);
        setReviewText('');
        setRating(0);
        onClose();
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
            <TextField
                margin="dense"
                label="Tähdet"
                fullWidth
                variant="standard"
                type="number"
                value={rating}
                onChange={event => setRating(event.target.value)}
            />
            <Button onClick={handleSave}>Tallenna</Button>
        </div>
    );
}
