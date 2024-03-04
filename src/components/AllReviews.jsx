import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditReview from  "./EditReview";
function AllReviews() {

    const [reviews, setReviews] = useState([]);

    const rest_url = 'http://127.0.0.1:5000/review'
    useEffect(() => { getReviews() }, [])

    const [columns] =  useState([
        { field: 'sportsPlaceId', headerName: 'Paikan ID' },
        { field: 'reviewId',headerName: 'Arvostelun ID' },
        { field: 'reviewText', headerName: 'Teksti' },
        { field: 'rating', headerName: 'Arvosana' },
        {
            cellRenderer: (params) => (
              <div style={{ display: "flex", gap: "8px" }}>
                <EditReview editReview={editReview} data={params.data} />
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

    const deleteReview = (id) => {
        console.log(id);
        const url = `http://127.0.0.1:5000/review/${id}`;
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

    const editReview = (review, link) => {
        fetch(link, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        })
          .then(() => getReviews())
          .catch((err) => console.error(err));
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