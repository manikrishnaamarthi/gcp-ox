"use client"
import React, { useState, useEffect } from 'react';
import './Search.css';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { FiNavigation } from "react-icons/fi";

const Search: React.FC = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [locations, setLocations] = useState<string[]>([]); // List of popular locations
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Get user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          // Fetch popular locations from API
          fetchPopularLocations(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Function to fetch popular locations based on user's coordinates
  const fetchPopularLocations = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=tourist_attraction&key=AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw`
      );
      
      const data = await response.json();
  
      // Extract the names of popular locations from the results
      const locationNames = data.results.map((result: any) => result.name);
  
      // Set the locations state to the extracted names
      setLocations(locationNames);
    } catch (error) {
      console.error("Error fetching popular locations:", error);
    }
  };
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleServiceIconClick = () => {
    router.push('/DashBoard/ServicesPage');
  };

  const handleActivityIconClick = () => {
    router.push('./ActivityPage');
  };

  const handleAccountIconClick = () => {
    router.push('./AccountPage');
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search for a location"
        className="search-bar"
      />
      <div className="locations-list">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <div key={index} className="location-item">
              <FiNavigation size={16} style={{ marginRight: '8px' }} />
              {location}
            </div>
          ))
        ) : (
          <p>No popular locations found.</p>
        )}
      </div>

      <div className="footer-section">
        <div className="footer-icon" onClick={handleServiceIconClick}>
          <GoHome size={28} />
          <span className="footer-header">Home</span>
        </div>
        <div className="footer-icon" onClick={() => router.push('/DashBoard/HomePage/SearchPage')}>
          <CiSearch size={24} />
          <span className="footer-header">Search</span>
        </div>
        <div className="footer-icon" onClick={handleActivityIconClick}>
          <RxCalendar size={24} />
          <span className="footer-header">Booking</span>
        </div>
        <div className="footer-icon" onClick={handleAccountIconClick}>
          <FaUser size={24} />
          <span className="footer-header">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
