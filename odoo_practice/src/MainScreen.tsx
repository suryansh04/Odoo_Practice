import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 28.6139,
  lng: 77.209,
};

const MainScreen = () => {
  const [marker, setMarker] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    setMarker({ lat, lng });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={(e) => handleMapClick(e)}
      >
        {marker && (
          <Marker
            position={marker}
            icon={{
              url: "https://firebasestorage.googleapis.com/v0/b/fir-8f951.firebasestorage.app/o/Group%201%20(7).png?alt=media&token=cd3918ea-5e9b-49e7-b40b-9e54f89620df",
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MainScreen;
