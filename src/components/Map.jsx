import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


export default function Map() {
  const mapRef = useRef(null);

  const [url, setUrl] = useState(`http://lipas.cc.jyu.fi/api/sports-places?fields=schoolUse&fields=email&fields=type.name&fields=location.coordinates.tm35fin&fields=www&fields=location.geometries&fields=name&fields=type.typeCode&fields=location.locationId&fields=freeUse&fields=location.city.name&fields=location.city.cityCode&fields=phoneNumber&fields=location.neighborhood&fields=owner&fields=location.coordinates.wgs84&fields=location.address&pageSize=100&cityCodes=91`);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([60.1695, 24.9354], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching sports: " + response.statusText);
        }
      })
      .then((data) => {
        data.forEach(location => {
          const { lon, lat } = location.location.coordinates.wgs84;
          const marker = L.marker([lat, lon])
            .addTo(mapRef.current)
            .bindPopup(`<div style="text-align: center;">
              <b>${location.name}</b><br>${location.location.address}<br>
      </div>`
            )
            .bindTooltip(location.name);
        });
      })
      .catch((err) => console.error(err));
  }, [url]);


  return (
    <div id="map" style={{ width: '50%', height: '100vh', float: 'right' }}></div>

  )
};
