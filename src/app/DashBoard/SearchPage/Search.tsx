"use client"; // Ensure this component runs on the client side
// Search.tsx

import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoHome } from 'react-icons/go';
import { RxCalendar } from 'react-icons/rx';
import { BsPerson } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import './Search.css';

const Search: React.FC = () => {
  const router = useRouter();

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
    color: icon === 'search' ? 'red' : 'black', // Change search icon color to red
  });

  return (
    <div className="home-container">
    <div className="search-container">
      <div className="search-bar">
        <CiSearch size={24} />
        <input type="text" placeholder="Search for a location" />
      </div>

      <div className="footer-section">
        {['home', 'search', 'booking', 'profile'].map((icon) => (
          <div
            key={icon}
            className="footer-icon"
            style={footerIconStyle(icon)}
            onClick={() => handleFooterIconClick(icon)}
          >
            {icon === 'home' && <GoHome size={24} />}
            {icon === 'search' && <CiSearch size={24} />}
            {icon === 'booking' && <RxCalendar size={24} />}
            {icon === 'profile' && <BsPerson size={28} />}
            <span className="footer-header">{icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Search;
