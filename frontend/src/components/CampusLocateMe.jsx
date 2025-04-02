
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import PageContainer from "../components/PageContainer";

const CampusLocator = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null); // Store the user's location

  const handleLocateMe = () => {
    setLoading(true);

    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]); // Update the location state

          try {
            // Send the location to the backend
            const response = await axios.post('http://localhost:5000/location', {
              latitude,
              longitude,
            });

            if (response.status === 200) {
              setMessage('Your location has been sent. Your safety is our priority. We will be there shortly. Do not panic.');
            } else {
              setMessage('Failed to send location. Please try again.');
            }
          } catch (error) {
            setMessage('An error occurred. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setMessage('Unable to retrieve your location. Please enable GPS and try again.');
          setLoading(false);
        }
      );
    } else {
      setMessage('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setMessage('');
    setLocation(null); // Reset the location state
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {message ? (
        <div>
          <h2>{message}</h2>
          {location && (
            
            <MapContainer
              center={location}
              zoom={15}
              style={{ height: '400px', width: '80%', margin: '20px auto' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={location}>
                <Popup>Your location</Popup>
              </Marker>
            </MapContainer>
          )}
          <button onClick={handleGoBack} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Go Back
          </button>
        </div>
      ) : (
        <div>
          <h1>Campus Locate Me</h1>
          <button onClick={handleLocateMe} disabled={loading} style={{ padding: '10px 20px' }}>
            {loading ? 'Sending Location...' : 'Locate Me'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CampusLocator;