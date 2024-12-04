"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoChevronBackSharp } from 'react-icons/io5';
import Footer from './Footer';
import "./Search.css";

const API_KEY = "AIzaSyCMsV0WQ7v8ra-2e7qRXVnDr7j0vOoOcWM";

declare global {
  interface Window {
    google: any;
  }
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();

  const handleFooterIconClick = (icon: string) => {
    const paths: Record<string, string> = {
      home: "/DashBoard/HomePage",
      search: "/DashBoard/SearchPage",
      booking: "/Booking",
      profile: "/UserProfile",
    };
    router.push(paths[icon]);
  };

  const footerIconStyle = (icon: string) => ({
    color: icon === "search" ? "red" : "black",
  });

  const loadGoogleMapsScript = () => {
    if (window.google) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => console.log("Google Maps script loaded");
    document.head.appendChild(script);
  };

  const fetchSuggestions = (searchQuery: string) => {
    if (!window.google) {
      console.error("Google Maps library not loaded yet.");
      return;
    }

    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: searchQuery,
        location: new window.google.maps.LatLng(16.8, 81.5),
        radius: 30000,
        types: ["geocode"],
      },
      (predictions: any[], status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
        } else {
          console.error("Error fetching predictions:", status);
        }
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) fetchSuggestions(value);
    else setSuggestions([]);
  };

  React.useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const handleConfirmLocation = () => {
    if (query) {
      router.push(`/DashBoard/ClinicSearch?location=${encodeURIComponent(query)}`);
    } else {
      alert("Please select or enter a location!");
    }
  };
  


  return (
    <div className="home-container">
      <div className="search-container">
     
        <div className="search-bar">
        
          <CiSearch size={24} />
          <input
            type="text"
            placeholder="Search for a location"
            value={query}
            onChange={handleInputChange}
          />
        </div>
        

        {/* Suggestions */}
        <div className="suggestions-list">
          {suggestions.map((suggestion: any) => (
           <div
           key={suggestion.place_id}
           className="suggestion-item"
           onClick={() => {
             setQuery(suggestion.description); // Update the search bar
             setSuggestions([]); // Clear suggestions after selection
           }}
         >
              <FaMapMarkerAlt size={16} color="red" />
              <span className="suggestion-text">{suggestion.description}</span>
            </div>
          ))}
        </div>
             {/* Confirm Location Button */}
        <button
          className="confirm-location-btn"
          onClick={handleConfirmLocation}
        >
          Confirm Location
        </button>

        
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Search;
