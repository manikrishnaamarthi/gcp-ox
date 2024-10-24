"use client"

import React, { useEffect, useRef } from "react";
import { SlHome } from "react-icons/sl";
import { LuBookPlus } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import "./DriverMap.css";

// Helper function to load the Google Maps script dynamically
const loadGoogleMapsScript = (callback: () => void) => {
  const existingScript = document.getElementById("googleMaps");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw`;
    script.id = "googleMaps";
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback(); // Script already loaded, just initialize
  }
};

const DriverMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (mapRef.current && window.google && window.google.maps) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    });
  }, []);

  return (
    <div className="driver-map-container">
      <div className="map" ref={mapRef}></div>

      <footer className="footer">
        <div className="footerItem">
          <SlHome className="footerIcon" />
          <p>Home</p>
        </div>
        <div className="footerItem">
          < LuBookPlus className="footerIcon" />
          <p>Booking</p>
        </div>
        <div className="footerItem">
          <IoNotificationsOutline className="footerIcon" />
          <p>Notification</p>
        </div>
        <div className="footerItem">
          <BsPerson className="footerIcon" />
          <p>Profile</p>
        </div>
      </footer>


    </div>
  );
};

export default DriverMap;
