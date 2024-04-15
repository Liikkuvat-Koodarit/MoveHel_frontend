import { Button } from "@mui/material";

function NewPage(props) {
    //siirtyy seuraavan sataan liikuntapaikkaan
    const nextUrl = () => {
        const newPage = (props.page + 1);
        props.setPage(newPage)
        const changeUrl = (`http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCodes=91&page=${newPage}`)
        props.setUrl(changeUrl)
        const gridApi = props.gridApiRef.current;
        if (gridApi) {
            //asettaa gridin ensimmäiselle sivulle
            gridApi.paginationGoToFirstPage();
        }
    }
    //siirtyy edelliseen sataan liikuntapaikkaan
    const previousUrl = () => {
        if (props.page > 1) {
            const newPage = (props.page - 1);
            props.setPage(newPage)
            const changeUrl = (`http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCodes=91&page=${newPage}`)
            props.setUrl(changeUrl)
            const gridApi = props.gridApiRef.current;
            if (gridApi) {
                //asettaa grdin viimeiselle sivulle
                gridApi.paginationGoToLastPage();
            }
        }
        else {
            alert('Olet ensimmäisellä sivulla')
        }
    }
    //Rakenne missä on nappulat ja ohjeistus niiden käyttöön
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px' }}>
            <Button
                onClick={previousUrl}>
                Edellinen</Button>
            <p>Sivu {props.page}</p>
            <Button
                onClick={nextUrl}>
                Seuraava
            </Button>
        </div>
    )
}
export default NewPage
