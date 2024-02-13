import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddAssessment from "./AddAssessment";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function ListAll() {
    //Luo tyhjän taulukon
    const [sports, setSports] = useState([]);
    const [isAddAssessmentOpen, setIsAddAssessmentOpen] = useState(false);
    
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
                    handleAddAssessment();
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

    const addAssessment = (assessmentData) => {
        console.log("Saving assessment:", assessmentData);
    };

    const handleAddAssessment = () => {
        setIsAddAssessmentOpen(true);
    };

    const handleCloseAssessment = () => {
        setIsAddAssessmentOpen(false);
    };

    return (
        <>
            <div className="ag-theme-material" style= {{ width: '90%', height: 700, margin: 'auto'}}>
                <AgGridReact
                    rowData={sports}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Dialog open={isAddAssessmentOpen} onClose={handleCloseAssessment}>
                    <DialogContent>
                        <AddAssessment onAddAssessment={addAssessment} onClose={handleCloseAssessment} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default ListAll;
