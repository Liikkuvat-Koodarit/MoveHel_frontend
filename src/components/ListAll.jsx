import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddReview from "./AddReview";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function ListAll() {
    //Luo tyhjän taulukon
    const [sports, setSports] = useState([]);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedSportsPlace, setSelectedSportsPlace] = useState(null);
    
    //renderöi kerran
    useEffect(() => {
        fetchSports();
    }, []);

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
        const url ='http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address';
        fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then((response) => {
            if (response.ok) return response.json();
            else throw new Error("Error fetching sports: " + response.statusText);
        })
        .then((data) => setSports(data))
        .catch((err) => console.error(err));
};

    const addReview = (reviewData) => {
        console.log("Saving review:", reviewData);
    };

    const handleReview = (sportsPlace) => {
        setSelectedSportsPlace(sportsPlace);
        setIsReviewOpen(true);
    };

    const handleCloseReview = () => {
        setIsReviewOpen(false);
    };

    function Info(data) {
        return (
            <div>
                <h2>{data.name}</h2>
                <p>Tyyppi: {data.type.name}</p>
                <p>Naapurusto: {data.location.neighborhood}</p>
                <p>Osoite: {data.location.address}</p>
                <p>Sähköposti: {data.email}</p>
                <p>Nettisivu: {data.www}</p>
                <p>Puhelinnumero: {data.phoneNumber}</p>
            </div>
        );
    }

    return (
        <>
            <div className="ag-theme-material" style= {{ width: '90%', height: 700, margin: 'auto'}}>
                <AgGridReact
                    rowData={sports}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Dialog open={isReviewOpen} onClose={handleCloseReview}>
                    <DialogContent>
                        {selectedSportsPlace && <Info {...selectedSportsPlace} />}
                        <AddReview onAddReview={addReview} onClose={handleCloseReview} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default ListAll;
