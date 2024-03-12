import { Button } from "@mui/material";

function NewPage(params) {
    //siirtyy seuraavan sataan liikuntapaikkaan
    const nextUrl = () => {
        const newPage = (params.page + 1);
        params.setPage(newPage)
        const changeUrl = (`http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCode=91&page=${newPage}`)
        params.setUrl(changeUrl)
        const gridApi = params.gridApiRef.current;
        if (gridApi) {
            //asettaa gridin ensimmäiselle sivulle
            gridApi.paginationGoToFirstPage();
        }
    }
    //siirtyy edelliseen sataan liikuntapaikkaan
    const previousUrl = () => {
        const newPage = (params.page - 1);
        params.setPage(newPage)
        const changeUrl = (`http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCode=91&page=${newPage}`)
        params.setUrl(changeUrl)
        const gridApi = params.gridApiRef.current;
        if (gridApi) {
            //asettaa grdin viimeiselle sivulle
            gridApi.paginationGoToLastPage();
        }
    }
    //Rakenne missä on nappulat ja ohjeistus niiden käyttöön
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <h3>Kun olet viimeisellä sivulla paina 'Seuraava' nähdäksesi lisää paikkoja tai paina 'Edellinen' jos haluat mennä takaisin edellisiin</h3>
            <Button
                onClick={previousUrl}>
                Edellinen</Button>
            <Button
                onClick={nextUrl}>
                Seuraava
            </Button>
        </div>
    )
}
export default NewPage
