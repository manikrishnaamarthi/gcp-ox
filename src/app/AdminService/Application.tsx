"use client";

import React, { useState } from 'react';
import './Application.css';

interface Vendor {
  name: string;
  location: string;
  image: string;
  email: string;
  phone: string;
  pan: string;
  gst: string;
  documents: string[];
}

const Applications: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null); // State to track selected vendor  
    // Sample data for vendors (You can replace it with dynamic data)
    const vendors = [
      {
        name: 'Angela Lee',
        location: 'HSR Layout',
        image: '/images/istockphoto-1312468241-612x612.jpg',
        email: 'angela@gmail.com',
        phone: '8567305608',
        pan: '45CTY896B',
        gst: '09FT786HUE',
        documents: ['/images/rc.png', '/images/License.jpg'], // Sample document images
      },
      {
        name: 'Oxivive Clinic',
        location: 'Koramangala',
        image: '/images/istockphoto.jpg',
        email: 'clinic@oxivive.com',
        phone: '9865432108',
        pan: '34ERT567X',
        gst: '12DRT890JK',
        documents: ['/images/rc.png', '/images/License.jpg'],
      },
  
      {
        name: 'Oxivive Gym',
        location: 'HSR Layout',
        image: '/images/istockphoto-1312468241-612x612.jpg',
        email: 'angela@oxiviveclinic.com',
        phone: '9865432108',
        pan: '34ERT567X',
        gst: '12DRT890JK',
        documents: ['/images/rc.png', '/images/License.jpg'],
      },
  
      {
        name: 'Oxivive Clinic',
        location: 'Koramangala',
        image: '/images/istockphoto.jpg',
        email: 'angela@oxiviveclinic.com',
        phone: '9865432108',
        pan: '34ERT567X',
        gst: '12DRT890JK',
        documents: ['/images/rc.png', '/images/License.jpg'],
      },
  
      {
        name: 'Oxivive Wheel',
        location: 'HSR Layout',
        image: '/images/istockphoto-1312468241-612x612.jpg',
        email: 'angela@gmail.com',
        phone: '8567305608',
        pan: '45CTY896B',
        gst: '09FT786HUE',
        documents: ['/images/rc.png', '/images/License.jpg'], // Sample document images
      },
      
      {
        name: 'Oxivive Gym',
        location: 'Koramangala',
        image: '/images/istockphoto.jpg',
        email: 'angela@oxiviveclinic.com',
        phone: '9865432108',
        pan: '34ERT567X',
        gst: '12DRT890JK',
        documents: ['/images/rc.png', '/images/License.jpg'],
      },
      // Add more vendors here
    ];
  
    // Function to handle clicking on a card
    const handleCardClick = (vendor: Vendor) => {
      setSelectedVendor(vendor); // Set the clicked vendor as selected
    };
  
    // Function to go back to the card view
    const handleBackClick = () => {
      setSelectedVendor(null); // Reset to show the card list
    };
  
    return (
      <div className="main-content">
        {selectedVendor ? (
          <div className="vendor-details">
            {/* Map Image */}
            <div className="map-header">
              <img src="/images/map.png" alt="Map" className="map-image" />
              <img src={selectedVendor.image} alt={selectedVendor.name} className="user-detail-image" />
            </div>
  
            {/* User Info and Vendor Contact Details */}
            <div className="info-container">
              <div className="user-info">
                <h3>{selectedVendor.name}</h3>
                <p>{selectedVendor.location}</p>
              </div>
  
              <div className="vendor-details-info">
                <p><strong>Email:</strong> <span className="label">{selectedVendor.email}</span></p>
                <p><strong>Phone:</strong> <span className="label">{selectedVendor.phone}</span></p>
                <p><strong>PAN Number:</strong> <span className="label">{selectedVendor.pan}</span></p>
                <p><strong>GST Number:</strong> <span className="label">{selectedVendor.gst}</span></p>
              </div>
            </div>
  
            {/* Documents Section */}
            <h2 className= "h4">Documents</h2>
            <div className="document-list">
              {selectedVendor.documents.map((doc, index) => (
                <img key={index} src={doc} alt="Document" className="vendor-document" />
              ))}
            </div>
  
            {/* Approve and Reject Buttons */}
            <div className="action-buttons">
              <button className="approve-button">Approve</button>
              <button className="reject-button">Reject</button>
            </div>
  
            {/* Back Button */}
            <button onClick={handleBackClick} className="back-button">Back to Applications</button>
          </div>
        ) : (
          <div className="card-container">
            {vendors.map((vendor, index) => (
              <div key={index} className="vendor-card" onClick={() => handleCardClick(vendor)}>
                <img src={vendor.image} alt={vendor.name} className="vendor-image" />
                <h3>{vendor.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default Applications;
