import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Modal from "./components/Modal";
import CrimeForm from "./CrimeReportForm";

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
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker({ lat, lng });
    setCoords({ lat, lng });

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Address not found for the selected location");
      }

    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      setAddress("Error retrieving address");
    } finally {
      setShowModal(true);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={handleMapClick}
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CrimeForm
          address={address}
          latitude={coords.lat}
          longitude={coords.lng}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default MainScreen;
