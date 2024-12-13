"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter , useSearchParams} from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();

  function loadGoogleMapsScript() {
    if (window.google) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => console.log("Google Maps script loaded");
    document.head.appendChild(script);
  }

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

  useEffect(() => {
    // Retrieve `oxi_id` from query parameters
    const oxiId = searchParams?.get("oxi_id");
    if (oxiId) {
      localStorage.setItem("oxi_id", oxiId); // Store `oxi_id` in localStorage
    }
  }, [searchParams]);

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.description); // Update the search bar
    setSuggestions([]); // Clear suggestions after selection

    // Redirect to /DashBoard/ClinicSearch with the selected location and oxi_id
    const oxiId = localStorage.getItem("oxi_id") || "Unknown";
    router.push(`/DashBoard/ClinicSearch?location=${encodeURIComponent(suggestion.description)}&oxi_id=${oxiId}`);
  };
  


  return (
    <div className="home-container2">
      <div className="search-container2">
        {/* Back Button */}
    <button className="back-button" onClick={() => router.back()}>
      <IoChevronBackSharp size={20} />
    </button>
     
        <div >
        
          <CiSearch size={24} className="search-icon2"/>
          <input
            type="text"
            placeholder="Search for a location"
            value={query}
            onChange={handleInputChange}
            className="search-bar2"
          />
        </div>
        

        {/* Suggestions */}
        <div className="suggestions-list">
          {suggestions.map((suggestion: any) => (
           <div
           key={suggestion.place_id}
           className="suggestion-item"
           onClick={() => handleSuggestionClick(suggestion)}
         >
              <FaMapMarkerAlt size={16} color="red" />
              <span className="suggestion-text">{suggestion.description}</span>
            </div>
          ))}
        </div>
             

        
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Search;
