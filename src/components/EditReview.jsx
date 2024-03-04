import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditReview({ onEditReview, onClose, data }) {
    const [reviewText, setReviewText] = useState(data.reviewText);
    const [rating, setRating] = useState(data.rating);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const updatedReview = {
            ...data,
            reviewText: reviewText,
            rating: rating
        };
        onEditReview(updatedReview);
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Muokkaa
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Muokkaa arvostelua</DialogTitle>
                <div>
                    <TextField
                        margin="dense"
                        label="Review Text"
                        fullWidth
                        variant="standard"
                        value={reviewText}
                        onChange={event => setReviewText(event.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Rating"
                        fullWidth
                        variant="standard"
                        type="number"
                        value={rating}
                        onChange={event => setRating(event.target.value)}
                    />
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </Dialog>
        </div>
    );
}

EditReview.propTypes = {
    onEditReview: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
