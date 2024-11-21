'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VendorsList.css";
import { IoLocationSharp } from "react-icons/io5";
import Sidebar from '../Sidebar/page';

interface Vendor {
  name: string;
  selectedService: string;
  phone: number;
  address: string;
}

const VendorsList: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [selectedService, setSelectedService] = useState<string>("Oxi Clinic");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search input state

  const cities = [
    { name: "Bengaluru", image: "/images/bang.png" },
    { name: "Kochi", image: "/images/koch.jpg" },
    { name: "Chennai", image: "/images/chen.jpg" },
    { name: "Hyderabad", image: "/images/hyd.png" },
    { name: "Gurgaon", image: "/images/chd.jpg" },
    { name: "Pune", image: "/images/pune.png" },
    { name: "Delhi-NCR", image: "/images/ncr.jpg" },
    { name: "Kolkata", image: "/images/kolk.jpg" },
    { name: "Mumbai", image: "/images/mumbai.jpg" },
    { name: "Ahmedabad", image: "/images/ahd.jpg" },
    { name: "All Cities", image: "/images/all cities.jpg" },
  ];

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    fetchVendors(city, selectedService);
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    filterVendorsByService(service);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    filterVendorsByService(selectedService, vendors, event.target.value);
  };

  const fetchVendors = async (city: string, service: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get<Vendor[]>(`http://127.0.0.1:8000/api/vendorapp-vendordetails/?city=${city}`);
      setVendors(response.data);
      filterVendorsByService(service, response.data);
    } catch (err) {
      setError("Failed to fetch vendors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterVendorsByService = (service: string, vendorData: Vendor[] = vendors, query: string = searchQuery) => {
    const filteredByService = vendorData.filter(vendor => vendor.selectedService === service);

    // Further filter by search query (if any)
    const filtered = filteredByService.filter(vendor =>
      vendor.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredVendors(filtered);
  };

  useEffect(() => {
    // Reset state when city is not selected
    if (!selectedCity) {
      setFilteredVendors([]);
    }
  }, [selectedCity]);

  return (
    <div className="container">
      <Sidebar/>
      <main className="main">
        <header className="header">
          <h2 className="header-title">Vendors List</h2>
        </header>

        <section className="popular-cities">
          <div className="search-container">
            <h3 className="section-title">POPULAR CITIES</h3>
          </div>
          <div className="cities-grid">
            {cities.map((city, index) => (
              <div
                key={index}
                className="city"
                onClick={() => handleCityClick(city.name)}
              >
                <img src={city.image} alt={city.name} className="city-image" />
                <p>{city.name}</p>
              </div>
            ))}
          </div>
        </section>

        {!selectedCity ? (
          <p className="select-city-message">Select a City</p>
        ) : isLoading ? (
          <p className="select-city-message">Loading vendors...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="filters">
              <span className="filter"><IoLocationSharp />{selectedCity}</span>
              <div className="center-filters">
                <span
                  className={`filter ${selectedService === "Oxi Clinic" ? "active" : ""}`}
                  onClick={() => handleServiceClick("Oxi Clinic")}
                >
                  Oxi Clinic
                </span>
                <span
                  className={`filter ${selectedService === "Oxi Wheel" ? "active" : ""}`}
                  onClick={() => handleServiceClick("Oxi Wheel")}
                >
                  Oxi Wheel
                </span>
              </div>
              <input
                type="text"
                placeholder="Search Vendor"
                className="filter-search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <table className="vendors-table">
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Vendors Name</th>
                  <th>Service</th>
                  <th>Contact No</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{vendor.name}</td>
                    <td>{vendor.selectedService}</td>
                    <td>{vendor.phone}</td>
                    <td>{vendor.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default VendorsList;
