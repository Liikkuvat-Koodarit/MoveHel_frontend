import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddReview from "./AddReview";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import PlaceSearch from "./Placesearch";
import NewPage from "./NewPage";
import PlaceReviews from "./PlaceReviews";

function ListAll() {
    //Luo tyhjän taulukon
    const [sports, setSports] = useState([]);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedSportsPlace, setSelectedSportsPlace] = useState(null);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(`http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCode=91&page=${page}`);
    const gridApiRef = useRef(null);

    //renderöi kerran
    useEffect(() => {
        fetchSports();
    }, [url]);

    //Kolumnit
    const columnDefs = [
        {
            headerName: "Nimi",
            field: "name",
            sortable: true,
            width: 300,
            cellRenderer: (params) => {
                const handleNameClick = () => {
                    handleReview(params.data);
                };

                return <span style={{ cursor: 'pointer' }} onClick={handleNameClick}>{params.value}</span>;
            }
        },
        { headerName: "Tyypi", field: "type.name", sortable: true, width: 300 },
        { headerName: "Osoite", valueGetter: "data.location.address", sortable: true },

    ];

    //Hakee datan ja vie sen proxyn läpi
    const fetchSports = () => {
        fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
            .then((response) => {
                if (response.ok) {
                    console.log(page)
                    return response.json();
                }
                else {
                    throw new Error("Error fetching sports: " + response.statusText);
                }
            })
            .then((data) => setSports(data))
            .catch((err) => console.error(err));
    };

    const handleReview = (sportsPlace) => {
        console.log("Reviewing:", sportsPlace);
        setSelectedSportsPlace(sportsPlace);
        setIsReviewOpen(true);
    };

    const addReview = (reviewData) => {
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...reviewData,
                sportsPlaceId: selectedSportsPlace.sportsPlaceId,
                sportsPlaceName: selectedSportsPlace.name
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));

        console.log("Saving review:", reviewData);
    };

    const handleCloseReview = () => {
        setIsReviewOpen(false);
    };

    function Info(data) {
        return (
            <div>
                <h2>{data.name}</h2>
                <p>Tyyppi: {data.type.name}</p>
                {data.location.neighborhood &&
                    <p>Naapurusto: {data.location.neighborhood}</p>}
                {data.location.address &&
                    <p>Osoite: {data.location.address}</p>}
                {data.email &&
                    <p>Sähköposti: {data.email}</p>}
                {data.www &&
                    <p>Nettisivu: {data.www}</p>}
                {data.phoneNumber &&
                    <p>Puhelinnumero: {data.phoneNumber}</p>}
            </div>
        );
    }

    return (
        <>
            <PlaceSearch setUrl={setUrl} />
            <div className="ag-theme-material" style={{ height: "900px", width: "1200px" }}>
                <AgGridReact
                    rowData={sports}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    onGridReady={(params) => {
                        gridApiRef.current = params.api;
                    }}
                />
                <NewPage setUrl={setUrl} setPage={setPage} gridApiRef={gridApiRef} page={page} />
                <Dialog open={isReviewOpen} onClose={handleCloseReview}>
                    <DialogContent>
                        {selectedSportsPlace && <Info {...selectedSportsPlace} />}
                        <AddReview onAddReview={addReview} onClose={handleCloseReview} sportsPlaceId={selectedSportsPlace ? selectedSportsPlace.sportsPlaceId : null} />
                        <PlaceReviews sportsPlaceId={selectedSportsPlace ? selectedSportsPlace.sportsPlaceId : null} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default ListAll;
