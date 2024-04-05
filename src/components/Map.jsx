import { useEffect, useRef } from 'react';
import * as L from 'leaflet';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([60.1695, 24.9354], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      L.marker([60.1695, 24.9354]).addTo(mapRef.current)
        .bindPopup('Helsinki, Suomi')
        .openPopup();
    }
  }, []);

  return <div id="map" style={{ width: '50%', height: '100vh', float: 'right' }}></div>;
};

export default Map;
