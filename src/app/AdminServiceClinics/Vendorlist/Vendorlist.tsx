"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/page";
import './Vendorlist.css';
import axios from 'axios';

const Vendorlist = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState('Oxi Clinic');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/adminservice-vendordetails/')
      .then(response => {
        const approvedVendors = response.data.filter(vendor => vendor.document_status === "approved");
        setVendors(approvedVendors);
        setFilteredVendors(approvedVendors.filter(vendor => vendor.selected_service === 'Oxi Clinic'));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter vendors based on selected service and search query
    const filteredData = vendors.filter(vendor =>
      vendor.selected_service === selectedService &&
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVendors(filteredData);
  }, [vendors, selectedService, searchQuery]); // Re-run filtering when these change

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="vendorlist-container">
      <Sidebar />
      <div className="content">
        <div className="header">
          <button className="location-btn">
            <i className="icon location-icon"></i> Mumbai
          </button>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery} // Bind input value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
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
