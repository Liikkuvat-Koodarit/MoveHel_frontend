import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditReview from "./EditReview";
import { Star } from '@mui/icons-material';


function AllReviews({loggedInUser}) {

  const [reviews, setReviews] = useState([]);

  const id = loggedInUser.userId;
  const admin = loggedInUser.is_admin;

  const rest_url = 'https://movehel-backend.onrender.com' + (admin ? '/reviews' : `/user/${id}/reviews`);
  
  useEffect(() => { getReviews() }, [])

  const [columns] = useState([
    { field: 'sportsPlaceName', headerName: 'Paikka' },
    { field: 'reviewText', headerName: 'Arvostelu' },
    {
      field: 'rating',
      headerName: 'Arvosana',
      cellRenderer: (params) => (
        <div>
          {[...Array(parseInt(params.value))].map((_, index) => (
            <Star key={index} style={{ color: 'gold', fontSize: 20 }} />
          ))}
        </div>
      ),
    },
    {
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <EditReview updateReview={updateReview} data={params.data} />
          <Button
            size="small"
            onClick={() => deleteReview(params.data.reviewId)}
          >
            Poista
          </Button>
        </div>
      ),
      width: 400,
    },
  ]);

  //hakee arvostelut
  const getReviews = () => {
    fetch(rest_url)
      .then(Response => Response.json())
      .then(responseData => {
        console.log(responseData.reviews);
        setReviews(responseData.reviews);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  };

  //Poistaa arvostelun
  const deleteReview = (id) => {
    console.log(id);
    const url = `https://movehel-backend.onrender.com/review/${id}`;
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            getReviews();
          } else {
            throw new Error("Error in DELETE: " + response.statusText);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const updateReview = (review, link) => {
    console.log(link);
    console.log(`https://movehel-backend.onrender.com/review/${link}`);
    fetch(`https://movehel-backend.onrender.com/review/${link}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then(() => getReviews())
      .catch((err) => console.error(err));
    console.log(`https://movehel-backend.onrender.com/review/${link}`);
  };

  return (
    <div className="ag-theme-material"
      style={{ height: "900px", width: "1200px" }}>
      <AgGridReact
        rowData={reviews}
        columnDefs={columns}
      >

      </AgGridReact>

    </div>
  );
}

export default AllReviews;