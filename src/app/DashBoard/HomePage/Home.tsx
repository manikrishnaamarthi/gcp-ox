import React, { useEffect, useState } from 'react';
import './Home.css';
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { PiAmbulanceLight } from "react-icons/pi";
import { BiClinic } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdSportsGymnastics } from "react-icons/md";

const Home: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<string>('Fetching location...');
  const [showGymIcon, setShowGymIcon] = useState<boolean>(false);
  const [showClinicEducate, setShowClinicEducate] = useState<boolean>(false);
  const [showWheelEducate, setShowWheelEducate] = useState<boolean>(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const fetchAddress = async (latitude: number, longitude: number) => {
    const apiKey = 'AIzaSyA8GzhJLPK0Hfryi5zHbg3RMDSMCukmQCw'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const address = data.results[0]?.formatted_address || 'Address not found';
        setLocation(address);
      } else {
        console.error('Geocoding API error:', data);
        setLocation('Unable to fetch address');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setLocation('Unable to fetch address');
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchAddress(latitude, longitude); // Fetch address based on lat/lon
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocation('Location permission denied.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocation('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocation('Location request timed out.');
            break;
          default:
            setLocation('Unable to fetch location.');
            break;
        }
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const handleViewAllClick = () => {
    setShowGymIcon(true); // Show the new icon
  };

  const handleAccountIconClick = () => {
    router.push('http://localhost:3000/UserProfile');
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
  

  return (
    <div className="home-container">
      <div className="location-container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaMapMarkerAlt size={24} className="location-icon" />
          <div className="location-text-wrapper">
            <p className="current-location">Current Location</p>
            <span className="location-text">{location}</span>
          </div>
        </div>
        <IoIosNotificationsOutline size={24} className="notification-icon" />
      </div>

      {/* Search Bar */}
      <div className="search-container" onClick={() => router.push('/DashBoard/SearchPage')}>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
        <CiSearch size={24} className="search-icon" />
      </div>

      {/* Promotion Slider */}
      <div className="promotion-section">
        <Slider {...sliderSettings} className="promotion-slider">
          <img src="/images/oxi_clinic1.jpg" alt="Oxi Clinic" />
          <img src="/images/oxi_wheel.jpg" alt="Oxi Wheel" />
          <img src="/images/oxi_clinic.jpg" alt="Oxi Gym" />
        </Slider>
      </div>

      {/* Explore Section */}
      <div className="explore-section">
        <div className="section-header">
          <h1 className="explore">Services</h1>
          <button className="view-all-button" onClick={handleViewAllClick}>View all </button>
          <TfiAngleDoubleRight className="arrow-icon" onClick={handleViewAllClick} />
        </div>
      </div>

      <div className="services-icon-section">
        <div className="icon-row">
          <div className="service-icon-clinic">
            <BiClinic size={40} className="service-icon" onClick={handleClinicClick} />
            <span className="service-icon-label">Oxi Clinic</span>
          </div>
          <div className="service-icon-ambulance">
            <PiAmbulanceLight size={40} className="service-icon" onClick={handleWheelClick} />
            <span className="service-icon-label">Oxi Wheel</span>
          </div>
        </div>

        {showGymIcon && (
          <div className="icon-row">
            <div className="service-icon-gym">
              <MdSportsGymnastics size={40} className="service-icon gym-icon" onClick={() => router.push('/DashBoard/SearchPage')} />
              <span className="service-icon-label">Oxi Gym</span>
            </div>
          </div>
        )}
      </div>

      
      <div>
        <p className='images-above-section'> Explore</p>
      </div>

      {/* Oxi images */}
      <div className="oxi-images-section">
        
        <img src="/images/oxiclinic.png" alt="Oxi Clinic" className="oxi-image" onClick={handleClinicClick} />
        <img src="/images/oxiwheel.png" alt="Oxi Wheel" className="oxi-image" onClick={handleWheelClick} />
      </div>

      {/* Oxi Educate Sections */}
      {/* Oxi Educate Sections */}
{showClinicEducate && (
  <div id="oxi-educate-clinic" className="oxi-educate-section">
    <h2>How to book an Oxi Clinic Service</h2>
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
      <div className="footer-section">
        <div className="footer-icon">
          <GoHome size={24} />
          <span className="footer-header">Home</span>
        </div>
        <div className="footer-icon" onClick={() => router.push('/DashBoard/SearchPage')}>
          <CiSearch size={24} />
          <span className="footer-header">Search</span>
        </div>
        <div className="footer-icon" onClick={() => router.push('http://localhost:3000/Booking')}>
          <RxCalendar size={24} />
          <span className="footer-header">Booking</span>
        </div>
        <div className="footer-icon" onClick={() => router.push('http://localhost:3000/UserProfile')}>
          <FaUser size={24} />
          <span className="footer-header">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
