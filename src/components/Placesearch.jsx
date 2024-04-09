import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import data from './typecode.json'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const PlaceSearch = ({ setUrl }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [places, setPlaces] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState('');



    useEffect(() => {
        setPlaces(data);
        setOptions(Object.values(data));
    }, []);

    const handlePlaceChange = (event, value) => {
        const placeNumber = Object.keys(data).find(key => data[key] === value);
        setSearchTerm(value);
        setSelectedPlace(placeNumber);
    };
    // vaihtaa url osoitteen sellaiseksi, että se hakee vain valitun lajion paikkoja
    const changeUrl = () => {
        if (selectedPlace!=null && selectedPlace !== '') {
        const newUrl = `http://lipas.cc.jyu.fi/api/sports-places?typeCodes=${selectedPlace}&fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCode=91`;
        console.log(newUrl);
        setUrl(newUrl);
        } else {
            console.log("No sport selected")
        }
    }
    //haku rakenne
    return (
        <div style={{ display: 'left' }}>
            <Autocomplete
                value={searchTerm}
                options={options}
                onChange={handlePlaceChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Laji"
                        variant="outlined"
                        style={{ width: '600px' }}
                    />


                )} />
            <Button
                variant="contained"
                color="primary"
                onClick={changeUrl}
            >
                <SearchIcon />
            </Button>
        </div>
    );
};

export default PlaceSearch;
