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
                    handleReview();
                };

                return <span style={{ cursor: 'pointer' }} onClick={handleNameClick}>{params.value}</span>;
            }
        },
        { headerName: "Tyypi", field: "type.name", sortable: true, width: 300 },
        { headerName: "Naapurusto", valueGetter: "data.location.neighborhood", sortable: true },
        { headerName: "Osoite", valueGetter: "data.location.address", sortable: true },
        { headerName: "Sähköposti", field: "email", sortable: true },
        { headerName: "Nettisivu", field: "www", sortable: true },
        { headerName: "Puhelinnumero", field: "phoneNumber", sortable: true }
    ];

    //Hakee datan ja vie sen proxyn läpi ja parsaa sen
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
        console.log("Saving assessment:", reviewData);
    };

    const handleReview = () => {
        setIsReviewOpen(true);
    };

    const handleCloseReview = () => {
        setIsReviewOpen(false);
    };

    return (
        <>
            <div className="ag-theme-material" style={{ height: "900px", width: "1200px"}}>
    <AgGridReact
        rowData={sports}
        columnDefs={columnDefs}
        pagination={true} // Poistetaan sivutus käytöstä

    />

                <Dialog open={isReviewOpen} onClose={handleCloseReview}>
                    <DialogContent>
                        <AddReview onAddReview={addReview} onClose={handleCloseReview} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default ListAll;
