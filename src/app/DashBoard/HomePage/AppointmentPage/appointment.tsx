// appointment.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCrosshairs, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import dayjs from 'dayjs';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import './appointment.css';

const Appointment: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [currentSection, setCurrentSection] = useState<'appointment' | 'map' | 'schedule'>('appointment');
  const [location, setLocation] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [displayedDate, setDisplayedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: -3.745, lng: -38.523 });
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'terrain'>('roadmap');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });

          // Reverse geocode to get the address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            setLocation(data.results[0].formatted_address);
          } else {
            console.error("No results found for geocoding.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setUserLocation({ lat, lng });
      setMapCenter({ lat, lng });
    }
  };

  const handleDone = () => {
    setCurrentSection('map');
  };



  const handleClearLocation = () => {
    setLocation('');
    autocompleteRef.current?.setBounds(null); // Reset Autocomplete suggestions
  };

  const handleProceedToSchedule = () => {
    setCurrentSection('schedule');
  };



  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    setDisplayedDate(days[index]); // Update the displayed date based on the selected day
  };



  const handleBookNow = () => {
    if (selectedDay !== null && selectedTime) {
      alert("Appointment Booked!");
    } else {
      alert("Please select both a day and time.");
    }
  };


  const handleLocateMe = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      mapRef.current?.panTo(userLocation);
    }
  };



  const days = Array.from({ length: 4 }, (_, i) => dayjs().add(i, 'day'));

  return (
    <>
      {currentSection === 'appointment' && (
      <div className="appointment-container">
        <div className="header-with-back">
          <FaArrowLeft size={24} onClick={() => router.back()} className="back-icon" />
          <h1 className='appointment-header'>Plan Your Appointment</h1>
        </div>
        <LoadScript googleMapsApiKey="AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw" libraries={['places']}>
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
              if (autocompleteRef.current) {
                const place = autocompleteRef.current.getPlace();
                if (place.geometry?.location) {
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setUserLocation({ lat, lng });
                  setMapCenter({ lat, lng });
                  setLocation(place.formatted_address || '');
                }
              }
            }}
          >
            <div className="location-input-container">
              <FaMapMarkerAlt className="map-icon" />
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='location-input'
              />
              {location && (
                <FaTimes className="cancel-icon" onClick={handleClearLocation} />
              )}
            </div>
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={{ height: '530px', width: '105%' }}
            center={mapCenter}
            zoom={12}
            onClick={handleMapClick}
            mapTypeId={mapType}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {userLocation && (
              <Marker position={userLocation} title="Selected Location" />
            )}
            <button className="gps-locator" onClick={handleLocateMe}>
              <FaCrosshairs />
            </button>
            <div className="map-type-buttons">
              <button onClick={() => setMapType('roadmap')} className={`map-type-button ${mapType === 'roadmap' ? 'active' : ''}`}>Roadmap</button>
              <button onClick={() => setMapType('satellite')} className={`map-type-button ${mapType === 'satellite' ? 'active' : ''}`}>Satellite</button>
              <button onClick={() => setMapType('terrain')} className={`map-type-button ${mapType === 'terrain' ? 'active' : ''}`}>Terrain</button>
            </div>
          </GoogleMap>



            <button onClick={handleDone} className="done-button">Done</button>
          </LoadScript>
        </div>


 )}




{currentSection === 'map' && (
  <div className="map-container">
    <LoadScript googleMapsApiKey="AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw" libraries={['places']}>
      <div className="map-header-with-back">
        <FaArrowLeft size={24} onClick={() => router.back()} className="back-icon" />
        <h1 className="map-header"></h1>
      </div>
      
      <div className="google-map-container">
      <GoogleMap
        mapContainerStyle={{ height: '47%', width: '100%' }}
        center={mapCenter}
        zoom={14}
        
      >
        {userLocation && (
          <Marker
            position={userLocation}
            title="Selected Location"
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
      </div>
    </LoadScript>
    <div className="service-selection">
      {['oxi_clinic', 'oxi_wheel', 'oxi_gym'].map((service, index) => (
        <div key={index} className="service-container">
          <div className="service-image-container">
            <img
              src={`/images/${service}.jpg`}
              alt={service.replace('_', ' ')}
              className="service-image"
            />
          </div>
          <div className="service-details-container">
            <h3 className="service-title">
              {service === 'oxi_clinic' && 'Oxivive Clinic'}
              {service === 'oxi_wheel' && 'Oxivive Wheel'}
              {service === 'oxi_gym' && 'Oxivive Gym'}
            </h3>
            <p className="service-location">Location: {location}</p>
            <button onClick={handleProceedToSchedule} className="select-button">Book</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}





{currentSection === 'schedule' && (
        <div className="schedule-container">
          <div className="header-with-back">
            <FaArrowLeft size={24} onClick={() => router.back()} className="back-icon" />
            <h1 className='schedule-header'>Schedule Appointment</h1>
          </div>
          <div className="date-display">
            <h2 className="current-day">{displayedDate.format('dddd')}</h2>
            <h3 className="current-date">{displayedDate.format('MMMM DD, YYYY')}</h3>
          </div>
          <div className="day-selection">
            {days.map((day, index) => (
              <div
                key={index}
                className={`day-option ${selectedDay === index ? 'selected' : ''}`}
                onClick={() => handleDaySelect(index)} // Use the new function
              >
                <span className="day-name">{day.format('ddd')}</span>
                <span className="day-number">{day.format('DD')}</span>
              </div>
            ))}
          </div>



          <div className="time-selection">
            <h2 className="available-slots-header">Available Slots</h2>
            <div className="time-slots-container">
              {['9am - 11am', '11am - 1pm', '1pm - 3pm', '3pm - 5pm', '5pm - 7pm', '7pm - 9pm'].map((time, index) => {
                const currentTime = dayjs();
                const slotStartTime = dayjs().hour(9 + index * 2).minute(0);

                const isPastSlot = selectedDay === 0 && currentTime.isAfter(slotStartTime);

                return (
                  <div
                    key={index}
                    className={`time-option ${selectedTime === time ? 'selected' : ''} ${isPastSlot ? 'disabled' : ''}`}
                    onClick={() => !isPastSlot && setSelectedTime(time)}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={handleBookNow} className='book-now-button'>Book Now</button>
        </div>
      )}
    </>
  );
};

export default Appointment;
