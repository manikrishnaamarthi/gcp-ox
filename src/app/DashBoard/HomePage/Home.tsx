import React, { useEffect, useState } from 'react';
import './Home.css';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { TfiAngleDoubleRight } from 'react-icons/tfi';
import { PiAmbulanceLight } from 'react-icons/pi';
import { BiClinic } from 'react-icons/bi';
import { MdSportsGymnastics } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import SliderComponent from './SliderComponent';
import Footer from './Footer';

const Home: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<string>('Fetching location...');
  const [oxiId, setOxiId] = useState<string>('Unknown');
  const [showClinicEducate, setShowClinicEducate] = useState<boolean>(false);
  const [showWheelEducate, setShowWheelEducate] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  
  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== 'undefined') {
      const storedOxiId = localStorage.getItem('oxi_id') || 'Unknown';
      setOxiId(storedOxiId);
    }
  }, []); 
  const handleServiceClick = (serviceType: string) => {
    router.push(`/DashBoard/LocationPage?serviceType=${serviceType}&oxi_id=${oxiId}`);
  };


  const handleClinicClick = () => {
    setShowClinicEducate(true);
    setShowWheelEducate(false);
  
    // Scroll to the clinic educate section
    document.getElementById("oxi-educate-clinic")?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  const handleWheelClick = () => {
    setShowWheelEducate(true);
    setShowClinicEducate(false);
  
    // Scroll to the wheel educate section
    document.getElementById("oxi-educate-wheel")?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);
          fetchAddress(location);
        },
        (error) => console.error('Error obtaining location:', error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    
  }, []);

  const fetchAddress = async (location: google.maps.LatLngLiteral) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyCMsV0WQ7v8ra-2e7qRXVnDr7j0vOoOcWM`);
    const data = await response.json();
    if (data.status === 'OK') {
      const address = data.results[0].formatted_address;
      setCurrentAddress(address);
    } else {
      console.error('Error fetching address:', data.status);
    }
  };


  return (
    <div className="home-container">
      <div className="location-container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaMapMarkerAlt size={24} className="location-icon" />
          <div className="location-text-wrapper">
            <span className="location-text">{currentAddress||'Fetching Location.....'}</span>
          </div>
        </div>
        <IoNotificationsOutline size={28} className="notification-icon" />
      </div>

      {/* Search Bar */}
      <div className="search-container" onClick={() => router.push('/DashBoard/SearchPage')}>
        <CiSearch size={24} className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
      </div>

      {/* Promotion Slider */}
      <SliderComponent />

      {/* Service Section */}
      <div className="service-section">
        <div className="section-header">
          <h1 className="service">Services</h1>
          <button className="view-all-button">View all</button>
          <TfiAngleDoubleRight size={14} className="arrow-icon" />
        </div>
      </div>

      <div className="services-icon-section">
        <div className="icon-row">
          <div className="service-icon-container" onClick={() => handleServiceClick('Oxi Clinic')}>
            <BiClinic size={40} className="service-icon" />
            <span className="service-text-clinic">Oxi Clinic</span>
          </div>
          
          <div className="service-icon-container" onClick={() => handleServiceClick('Oxi Clinic')}>
            <PiAmbulanceLight size={40} className="service-icon" />
            <span className="service-text-wheel">Oxi Wheel</span>
          </div>
        
          <div className="service-icon-container-gym" onClick={() => handleServiceClick('Oxi Wheel')}>
            <MdSportsGymnastics size={40} className="service-icon" />
            <span className="service-text-gym">Oxi Gym</span>
          </div>
        </div>
      </div>

      <div className='explore-container'>
        <p className='images-above-section'> Explore</p>
      </div>

      {/* Oxi images */}
      <div className="oxi-images-section">
        <img src="/images/oxiclinic.png" alt="Oxi Clinic" className="oxi-image"  onClick={handleClinicClick} />
        <img src="/images/oxiwheel.png" alt="Oxi Wheel" className="oxi-image"  onClick={handleWheelClick}  />
      </div>


    {showClinicEducate && (
        <div id="oxi-educate-clinic" className="oxi-educate-section">
          <p className='how-to-book'>How to book an Oxi Clinic Service</p>
          <ol className="educate-list">
            <li>Click on the Oxi Clinic image to start.</li>
            <li>Search for a location or confirm your current location.</li>
            <li>Select the clinic from the map based on your chosen location.</li>
            <li>Choose a convenient date and time for your appointment.</li>
            <li>Complete the payment to confirm your booking.</li>
            <li>View your booked service in the My Bookings section.</li>
          </ol>
        </div>
      )}

      {showWheelEducate && (
        <div id="oxi-educate-wheel" className="oxi-educate-section">
          <h2>How to book an Oxi Wheel Service</h2>
          <ol className="educate-list">
            <li>Click on the Oxi Wheel image to start.</li>
            <li>Search for a location or confirm your current location.</li>
            <li>Select the Oxi Wheel service from the map based on your chosen location.</li>
            <li>Choose a convenient date and time for your appointment.</li>
            <li>Complete the payment to confirm your booking.</li>
            <li>View your booked service in the My Bookings section.</li>
          </ol>
        </div>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;