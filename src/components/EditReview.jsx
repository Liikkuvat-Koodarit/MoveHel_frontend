import React from "react";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditReview(data) {
    const [review, setReview] = React.useState({
        reviewText: '', 
        rating: '',

    });
    const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    console.log(data.data.reviewText);
    console.log(data.data.sportsPlaceId);
    console.log("testi");

    setReview({
            reviewText: data.data.reviewText,
            rating: data.data.rating,

    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleInputChange = (e) => {
    setReview({...review,[e.target.name]: e.target.value})
  }

  const updateReview = () => {
    const updatedReview = {
        reviewText: review.reviewText,
        rating: review.rating
    };

    // PUT-requesti
    fetch(`http://127.0.0.1:5000/review/${data.data.reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedReview)
    })
    .then(response => {
        if (response.ok) {

            handleClose();
        } else {
            // virhe
            throw new Error('Review update failed');
        }
    })
    .catch(error => {
        console.error('Error updating review:', error);
    });
};


    return(
        <div>
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Muokkaa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokkaa arvostelua</DialogTitle>
        <DialogContent>
          <TextField
            
            margin="dense"
            name="reviewText"
            value={review.reviewText}
            onChange={e => handleInputChange(e)}
            label="Arvostelun teksti"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="rating"
            value={review.rating}
            onChange={e => handleInputChange(e)}
            label="Arvosana"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateReview}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
    );
}