"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuBookPlus } from "react-icons/lu";
import { SlHome } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import './DriverMap.css';

const DriverMap: React.FC = () => {
  const router = useRouter();
  const [isReached, setIsReached] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const customerLocation = { lat: 16.816951274337345, lng: 81.53855014949437 }; // Example location, replace with dynamic data.

  // Initialize the map and track driver’s current position
  const initializeMap = (initialPosition: google.maps.LatLngLiteral) => {
    const mapOptions: google.maps.MapOptions = {
      center: initialPosition,
      zoom: 15,
      disableDefaultUI: true,
    };
    const mapInstance = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
    setMap(mapInstance);

    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer({ map: mapInstance, suppressMarkers: true });
    setDirectionsRenderer(renderer);

    updateRoute(directionsService, renderer, initialPosition, customerLocation);
  };

  // Function to update the route dynamically
  const updateRoute = (
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral
  ) => {
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          const route = result.routes[0].legs[0];
          setDistance(route.distance?.text || null);
          setDuration(route.duration?.text || null);
        } else {
          console.error("Error calculating route: ", status);
        }
      }
    );
  };

  // Load Google Maps script and set up tracking for driver's current position
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!document.querySelector("#googleMaps")) {
        const script = document.createElement("script");
        script.id = "googleMaps";
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZTMwnvXJiNqYJHD8JCvpr12-6H-VPfEU`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          navigator.geolocation.watchPosition(
            position => {
              const currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              initializeMap(currentLocation);
            },
            error => {
              alert("Error getting location. Ensure location access is enabled.");
              console.error("Geolocation error:", error);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        };
        document.head.appendChild(script);
      }
    };
    loadGoogleMapsScript();
  }, []);
  




  const handleReached = () => {
    setIsReached(true);
    const otp = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit OTP
    alert(`OTP sent to customer: ${otp}`);
    router.push("/VendorManagementService/VendorDriverBooking/MyBooking");
  };

  const handleStartRide = () => {
    router.push("/VendorManagementService/VendorDriverBooking/DriverOtp");
  };

  return (
    <div className="driverMapContainer">
      <div id="map" style={{ width: "100%", height: "80vh" }}></div>
      <div className="mapOverlay">
        <p>{distance ? `${distance} | ${duration}` : "Calculating route..."}</p>
      </div>
      {isReached ? (
        <button onClick={handleStartRide} className="startButton">
          Start
        </button>
      ) : (
        <button onClick={handleReached} className="reachedButton">
          Reached
        </button>
      )}


<footer className="footer">
        <div className="footerItem">
          <SlHome className="footerIcon" />
          <p>Home</p>
        </div>
        <div className="footerItem">
          <LuBookPlus className="footerIcon" />
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
