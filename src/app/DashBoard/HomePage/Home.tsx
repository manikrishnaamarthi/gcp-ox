import React, { useEffect, useState } from 'react';
import './Home.css';
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser,  FaMapMarkerAlt } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { PiAmbulanceLight } from "react-icons/pi";
import { BiClinic } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";

const Home: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<string>('Fetching location...');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Function to fetch the address from Google Geocoding API
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
    // Get the user's location
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
  

  
 

  const handleAccountIconClick = () => {
    router.push('http://localhost:3000/UserProfile');
  };

  return (
    <div className="home-container">
      {/* Current Location Section */}
      <div className="location-container">
        <FaMapMarkerAlt className="location-icon" />
        <p className='current-location'> Current Location</p>
        <span className="location-text">{location}</span>
        <IoIosNotificationsOutline size={28} className="notification-icon" />
      </div>

      {/* Search Bar */}
      <div className="search-container"  onClick={() => router.push('/DashBoard/SearchPage')}>
        <input
          type="text"
          placeholder="Search"
          className='search-input'
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
          <h1 className='explore'>Services</h1>
          <button  className="view-all-button">View all </button>
          <TfiAngleDoubleRight className='arrow-icon' />
        </div>
      </div>

      {/* Clinic and Ambulance Section */}
      <div className="services-icon-section">
        <div className="service-icon-clinic">
          <BiClinic size={40} className="service-icon" />
          <span className="service-icon-label">Clinic</span>
        </div>
        <div className="service-icon-ambulance">
          <PiAmbulanceLight size={40} className="service-icon" />
          <span className="service-icon-label">Ambulance</span>
        </div>
      </div>

      {/* Oxi images */}
      <div className="oxi-images-section">
        <img src="/images/oxiclinic.png" alt="Oxi Clinic" className="oxi-image" />
        <img src="/images/oxiwheel.png" alt="Oxi Wheel" className="oxi-image" />
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="footer-icon">
          <GoHome size={28} />
          <span className="footer-header">Home</span>
        </div>
        <div className="footer-icon"  onClick={() => router.push('/DashBoard/SearchPage')}>
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
