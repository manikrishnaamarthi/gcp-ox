// Search.tsx
"use client"
import React, { useState } from 'react';
import './Search.css';

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [locations, setLocations] = useState<string[]>([
    
  ]); // List of nearby locations

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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
        {locations.map((location, index) => (
          <div key={index} className="location-item">
            {location}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
