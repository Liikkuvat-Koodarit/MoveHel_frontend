import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function ListAll() {
    //Luo tyhjän taulukon
    const [sports, setSports] = useState([]);
    //renderöi kerran
    useEffect(() => {
        fetchSports();
    }, []);

    //Kolumnit
    const columnDefs = [
        { headerName: "Nimi", field: "name", sortable: true, width: 300 },
        { headerName: "Tyypi", field: "type.name", sortable: true, width: 300 },
        { headerName: "Naapurusto", valueGetter: "data.location.neighborhood", sortable: true },
        { headerName: "Osoite", valueGetter: "data.location.address", sortable: true },
        { headerName: "Sähköposti", field: "email", sortable: true },
        { headerName: "Nettisivu", field: "www", sortable: true },
        { headerName: "Puhelinnumero", field: "phoneNumber", sortable: true }
    ];

    //Hakee datan ja vie sen proxyn läpi ja parsaa sen
    const fetchSports = () => {
        const url ='http://lipas.cc.jyu.fi/api/sports-places?fields=email&fields=type.name&fields=name&fields=freeUse&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.address&cityCodes=91';
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("Error fetching sports: " + response.statusText);
            })
            .then((data) => {
                console.log("Data from API:", data);
                const jsonData = JSON.parse(data.contents);
                setSports(jsonData);
            })
            .catch((err) => console.error(err));
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
            </div>
        </>
    );
}

export default ListAll;
