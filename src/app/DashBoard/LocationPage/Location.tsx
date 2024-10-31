"use client";
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './Location.css';
import { IoChevronBackSharp } from 'react-icons/io5';

const Location: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Oxivive Clinic');
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null); // State for current address
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDZTMwnvXJiNqYJHD8JCvpr12-6H-VPfEU',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);
          fetchAddress(location); // Fetch the address after getting current location
        },
        (error) => {
          console.error('Error obtaining location:', error);
          // Handle location error (e.g., show default location)
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle case when geolocation is not supported
    }
  }, []);

  // Function to fetch the address using Geocoding API
  const fetchAddress = async (location: google.maps.LatLngLiteral) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyDZTMwnvXJiNqYJHD8JCvpr12-6H-VPfEU`);
    const data = await response.json();
    if (data.status === 'OK') {
      const address = data.results[0].formatted_address; // Get the formatted address
      setCurrentAddress(address); // Set the address to state
    } else {
      console.error('Error fetching address:', data.status);
    }
  };

  if (!isLoaded || !currentLocation) return <div>Loading...</div>;

  // Address details for the two tabs
  const addressDetails = {
    'Oxivive Clinic': {
      address: 'HSR Layout Pvt. Ltd.',
      street: '3243 Daba Street, Beng',
      name: 'Naveen Kumar',
    },
    'Oxivive Wheel': {
      address: 'Right Joy Pvt. Ltd.',
      street: '1534 Single Street, USA',
      name: 'Kumar Sai',
    },
  };


  const handleContinue = () => {
    const selectedData = {
      serviceType: activeTab,
      address: currentAddress,
      name: addressDetails[activeTab].name,
    };
  
    localStorage.setItem('selectedData', JSON.stringify(selectedData));
    // Redirect to Appointment page
    window.location.href = '/DashBoard/AppointmentPage'; // Adjust path as needed
  };
  
  return (
    <div className="appointment-container">
      <div className="back-icon-container">
        <IoChevronBackSharp
          className="back-icon"
          size={40}
          onClick={() => {
            // Add functionality for back action
            console.log('Go back to the previous page');
          }}
        />
      </div>
      {/* Google Maps section */}
      <div className="map-section">
        <GoogleMap
          zoom={15}
          center={currentLocation} // Set the map center to current location
          mapContainerClassName="map-container"
        >
          <Marker position={currentLocation} /> {/* Marker for current location */}
        </GoogleMap>
      </div>

      {/* Toggle between Oxivive Clinic/Oxivive Wheel */}
      <div className="tab-toggle">
        <button
          className={activeTab === 'Oxivive Clinic' ? 'active' : ''}
          onClick={() => setActiveTab('Oxivive Clinic')}
        >
          Oxivive Clinic
        </button>
        <button
          className={activeTab === 'Oxivive Wheel' ? 'active' : ''}
          onClick={() => setActiveTab('Oxivive Wheel')}
        >
          Oxivive Wheel
        </button>
      </div>

      {/* Address details */}
      <div className="address-section">
        <div className="address-line">
          <p className="label">Your Pick Address</p>
          <h3 className="value">{currentAddress ? currentAddress : 'Fetching address...'}</h3> {/* Show current address */}
        </div>
        <div className="address-line">
          <p className="label">Street/Building/Flat</p>
          <h3 className="value">{addressDetails[activeTab].street}</h3>
        </div>
        <div className="address-line">
          <p className="label">Your Name</p>
          <h3 className="value">{addressDetails[activeTab].name}</h3>
        </div>
        {/* Display the current location coordinates */}
        
      </div>

      {/* Continue button */}
      <div className="button-container">
      <button className="continue-button" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default Location;
