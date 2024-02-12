import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function AddAssessment({ onAddAssessment, onClose }) {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    
    AddAssessment.propTypes = {
        onAddAssessment: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
      };

    const handleSave = () => {
        const assessmentData = {
            description: description,
            rating: rating
        };
        onAddAssessment(assessmentData);
        setDescription('');
        setRating(0);
        onClose();
    };

    return (
        <div>
            <TextField
                margin="dense"
                label="Description"
                fullWidth
                variant="standard"
                value={description}
                onChange={event => setDescription(event.target.value)}
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
            <Button onClick={handleSave}>Save Assessment</Button>
        </div>
    );
}
