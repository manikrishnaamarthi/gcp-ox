"use client"
import React, { useState, useEffect } from 'react';
import './Search.css';
import { useRouter } from 'next/navigation';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { FiNavigation } from "react-icons/fi";
import { VscChevronLeft } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
const Search: React.FC = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [locations, setLocations] = useState<string[]>([]); // List of popular locations
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [activeFooterIcon, setActiveFooterIcon] = useState<string>('home'); // Track the active footer icon


  useEffect(() => {
    // Get user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude, 'Longitude:', longitude);  // Add this line
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



  const handleFooterIconClick = (icon: string) => {
    setActiveFooterIcon(icon); // Set active icon based on click
    if (icon === 'home') {
      router.push('/');
    } else if (icon === 'search') {
      router.push('/DashBoard/SearchPage');
    } else if (icon === 'booking') {
      router.push('http://localhost:3000/Booking');
    } else if (icon === 'profile') {
      router.push('http://localhost:3000/UserProfile');
    }
  };

  // Adjusted footerIconStyle function
  const footerIconStyle = (icon: string) => ({
    color: activeFooterIcon === icon ? '#FC000E' : 'rgb(151, 147, 147)',
  });

  // Function to fetch popular locations based on user's coordinates
  
  const fetchPopularLocations = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=tourist_attraction&key=AlzaSyVoPneZC4BKelFtS87pf7OMlJ6ZV4LzOMt`
      );
  
      if (!response.ok) {
        console.error('Error fetching popular locations: ', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.results) {
        const locationNames = data.results.map((result: any) => result.name);
        setLocations(locationNames);
      } else {
        console.error("No results found:", data);
      }
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
    <div className='home-container'>


<div className="search-bar-container">
        <div className="icon-container">
          <VscChevronLeft size={24} onClick={() => router.back()}/>
        </div>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search for a location"
        className="search-bar"
      />
      
    </div>


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

      {/* Footer Section */}
      <div className="footer-section">
        <div className="footer-icon" style={footerIconStyle('home')} onClick={() => handleFooterIconClick('home')}>
          <GoHome size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('home').color }}>Home</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('search')} onClick={() => handleFooterIconClick('search')}>
          <CiSearch size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('search').color }}>Search</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('booking')} onClick={() => handleFooterIconClick('booking')}>
          <RxCalendar size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('booking').color }}>Booking</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('profile')} onClick={() => handleFooterIconClick('profile')}>
          <BsPerson size={28} />
          <span className="footer-header" style={{ color: footerIconStyle('profile').color }}>Profile</span>
        </div>
      </div>


      




    </div>
  );
};

export default Search;
