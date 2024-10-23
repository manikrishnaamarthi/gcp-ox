"use client";
import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './Location.css';
import { IoChevronBackSharp } from 'react-icons/io5'; // Updated import


const Location: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Oxivive Clinic');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw',
  });

  if (!isLoaded) return <div>Loading...</div>;

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

  return (
    <div className="appointment-container">
      <div className="back-icon-container">
        <IoChevronBackSharp
          className="back-icon"
          size={40} // Set the size of the icon
          onClick={() => {
            // Add functionality for back action (e.g., history.goBack() or routing to another page)
            console.log('Go back to the previous page');
          }}
        />
      </div>
      {/* Google Maps section */}
      <div className="map-section">
        <GoogleMap
          zoom={15}
          center={{ lat: 40.748817, lng: -73.985428 }} // Coordinates example
          mapContainerClassName="map-container"
        >
          <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
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
          <h3 className="value">{addressDetails[activeTab].address}</h3>
        </div>
        <div className="address-line">
          <p className="label">Street/Building/Flat</p>
          <h3 className="value">{addressDetails[activeTab].street}</h3>
        </div>
        <div className="address-line">
          <p className="label">Your Name</p>
          <h3 className="value">{addressDetails[activeTab].name}</h3>
        </div>
      </div>

      {/* Continue button */}
      <div className="button-container">
        <button className="continue-button">Continue</button>
      </div>
    </div>
  );
};

export default Location;
