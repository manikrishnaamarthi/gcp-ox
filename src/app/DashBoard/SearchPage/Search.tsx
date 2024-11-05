"use client"; // Ensure this component runs on the client side
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { VscChevronLeft } from "react-icons/vsc";
import { FiNavigation } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { CiSearch as CiSearchIcon } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import './Search.css';

const Search = () => {
  const router = useRouter();
  const [popularLocations, setPopularLocations] = useState<string[]>([]);

  useEffect(() => {
    fetchPopularLocations();
  }, []);

  const fetchPopularLocations = async () => {
    // Replace with your actual API call
    const response = await fetch(`AIzaSyDZTMwnvXJiNqYJHD8JCvpr12-6H-VPfEU`);
    const data = await response.json();
    setPopularLocations(data.locations); // Adjust based on your API response structure
  };

  const handleFooterIconClick = (icon: string) => {
    const paths = {
      home: '/DashBoard/HomePage',
      search: '/DashBoard/SearchPage',
      booking: '/Booking',
      profile: '/UserProfile',
    };
    router.push(paths[icon]);
  };

  const footerIconStyle = (icon: string) => ({
    color: icon === "search" ? "red" : "black", // Change search icon color to red
  });

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <VscChevronLeft className="back-icon" onClick={() => router.back()} />
        <div className="search-bar">
          <input type="text" placeholder="Search for a location" />
          <CiSearch className="search-icon" />
        </div>
      </div>


      <div className="popular-locations">
        {popularLocations.map((location, index) => (
          <div key={index} className="location-item">
            <span>{location}</span>
            <FiNavigation className="navigation-icon" />
          </div>
        ))}
      </div>
      <div className="footer-section">
        {['home', 'search', 'booking', 'profile'].map(icon => (
          <div key={icon} className="footer-icon" style={footerIconStyle(icon)} onClick={() => handleFooterIconClick(icon)}>
            {icon === 'home' && <GoHome size={24} />}
            {icon === 'search' && <CiSearchIcon size={24} />} {/* Footer search icon */}
            {icon === 'booking' && <RxCalendar size={24} />}
            {icon === 'profile' && <BsPerson size={28} />}
            <span className="footer-header" style={{ color: footerIconStyle(icon).color }}>{icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
