import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import data from './typecode.json'

const PlaceSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [places, setPlaces] = useState([]);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        setPlaces(data);
        setOptions(Object.values(data));
    }, []);

    const handlePlaceChange = (event, value) => {
        setSearchTerm(value);
    };

    return (
        <Autocomplete
            value={searchTerm}
            options={options}
            onChange={handlePlaceChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Paikka"
                    variant="outlined"
                />
            )}
        />
    );
};

export default PlaceSearch;
