'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VendorsList.css";
import { IoLocationSharp } from "react-icons/io5";
import Sidebar from '../Sidebar/page';

interface Vendor {
  name: string;
  selected_service: string;
  phone: number;
  address: string;
}

const VendorsList: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [selected_service, setSelectedService] = useState<string>("Oxi Clinic");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    setIsLoading(true); // Set loading to true when changing the city
    setError(""); // Reset error

    fetchVendors(city); // Fetch vendors for the selected city
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    filterVendorsByService(service); // Filter vendors by service when clicked
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    filterVendorsByService(selected_service, vendors, event.target.value);
  };

  const filterVendorsByService = (
    service: string,
    vendorData: Vendor[] = vendors,
    query: string = searchQuery
  ) => {
    // Filter vendors by city and service
    const filteredByServiceAndCity = vendorData.filter(
      (vendor) =>
        vendor.selected_service === service &&
        vendor.address.toLowerCase().includes(selectedCity.toLowerCase()) // Filter by city
    );

    // Further filter by the search query (vendor name)
    const filtered = filteredByServiceAndCity.filter((vendor) =>
      vendor.name.toLowerCase().startsWith(query.toLowerCase()) // Filter by search query
    );

    setFilteredVendors(filtered); // Update filtered vendors list
  };

  const fetchVendors = async (city: string) => {
    try {
      const response = await axios.get<Vendor[]>(
        `http://127.0.0.1:8000/api/vendorapp-vendordetails/?city=${city}`
      );
      const vendorsData = response.data;

      if (vendorsData.length === 0) {
        setError("No vendors found for the selected city.");
        setFilteredVendors([]); // Reset filtered vendors if no data
      } else {
        // Filter vendors based on the selected city
        const filteredByCity = vendorsData.filter((vendor) =>
          vendor.address.toLowerCase().includes(city.toLowerCase()) // Filter by city
        );

        setVendors(vendorsData); // Set the full vendors list
        setFilteredVendors(filteredByCity); // Set the filtered vendors list by city initially

        // Filter the vendors further by the selected service
        filterVendorsByService(selected_service, filteredByCity); // Apply the service filter
      }
    } catch (err) {
      setError("Failed to fetch vendors. Please try again later.");
      setFilteredVendors([]); // Ensure the filtered vendors are reset
    } finally {
      setIsLoading(false); // Stop loading after the fetch is complete
    }
  };

  useEffect(() => {
    if (selectedCity) {
      filterVendorsByService(selected_service); // Apply service filter when city changes
    }
  }, [selectedCity, selected_service]); // Apply the filters when city or service changes

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <header className="header2">
          <div className="header-content">
            <h2 className="header-title">Vendors List</h2>
            {selectedCity && (
              <input
                type="text"
                placeholder="Search Vendor"
                className="header-search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            )}
          </div>
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
                  className={`filter ${selected_service === "Oxi Clinic" ? "active" : ""}`}
                  onClick={() => handleServiceClick("Oxi Clinic")}
                >
                  Oxi Clinic
                </span>
                <span
                  className={`filter ${selected_service === "Oxi Wheel" ? "active" : ""}`}
                  onClick={() => handleServiceClick("Oxi Wheel")}
                >
                  Oxi Wheel
                </span>
              </div>
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
                    <td>{vendor.selected_service}</td>
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
