import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


export default function Map({ sports }) {
  const mapRef = useRef(null);

  useEffect(() => {


    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([60.1695, 24.9354], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });


    sports.forEach(location => {
      const { lon, lat } = location.location.coordinates.wgs84;
      const marker = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(`<div style="text-align: center;">
              <b>${location.name}</b><br>${location.location.address}<br>
      </div>`
        )
        .bindTooltip(location.name);
    });
  }, [sports]);


  return (
    <div id="map" style={{ width: '50%', height: '100vh', float: 'right' }}></div>

  )
};
