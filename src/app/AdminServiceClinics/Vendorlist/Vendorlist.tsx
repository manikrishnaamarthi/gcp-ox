"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/page";
import './Vendorlist.css';
import axios from 'axios';  // Import axios for API calls

const Vendorlist = () => {
  const [vendors, setVendors] = useState([]);  // State to hold all vendor data
  const [filteredVendors, setFilteredVendors] = useState([]);  // State for filtered vendors based on service
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling
  const [selectedService, setSelectedService] = useState('Oxi Clinic');  // State for selected service

  // Fetch vendor data from API when component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/adminservice-vendordetails/') // Replace with your backend endpoint
      .then(response => {
        const approvedVendors = response.data.filter(vendor => vendor.document_status === "approved"); // Filter approved vendors
        setVendors(approvedVendors);  // Set all approved vendors
        setFilteredVendors(approvedVendors.filter(vendor => vendor.selectedService === 'Oxi Clinic')); // Filter initial data for Oxi Clinic
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch(err => {
        setError(err.message);  // Handle any error
        setLoading(false);  // Set loading to false in case of error
      });
  }, []); // Empty array means this will run once when the component mounts

  const handleServiceChange = (service) => {
    setSelectedService(service);  // Update the selected service
    const filteredData = vendors.filter(vendor => vendor.selectedService === service);  // Filter vendors based on the selected service
    setFilteredVendors(filteredData);  // Set filtered vendors based on the selected service
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading text while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show error message if there's an issue
  }

  return (
    <div className="vendorlist-container">
      <Sidebar />

      {/* Main Content */}
      <div className="content">
        <div className="header">
          <button className="location-btn">
            <i className="icon location-icon"></i> Mumbai
          </button>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
        <h2 className="title">Vendors List</h2>
        <div className="tabs">
          <button 
            className={`tab ${selectedService === 'Oxi Clinic' ? 'active' : ''}`}
            onClick={() => handleServiceChange('Oxi Clinic')}
          >
            Oxi Clinic
          </button>
          <button 
            className={`tab ${selectedService === 'Oxi Wheel' ? 'active' : ''}`}
            onClick={() => handleServiceChange('Oxi Wheel')}
          >
            Oxi Wheel
          </button>
        </div>
        <div className="table-container">
          <table className="vendor-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Vendors Name</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Block Info</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? filteredVendors.map((vendor, index) => (
                <tr key={vendor.id}>
                  <td>{index + 1}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.phone}</td>
                  <td>{vendor.address}</td>
                  <td>
                    <button className="block-btn">
                      <i className="icon block-icon"></i> Block
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5">No approved vendors available for {selectedService}.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendorlist;
