import React, { useEffect, useState  } from 'react';
import './Home.css';
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { PiAmbulanceLight } from "react-icons/pi";
import { BiClinic } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdSportsGymnastics } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

const Home: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<string>('Fetching location...');
  const [showGymIcon, setShowGymIcon] = useState<boolean>(false);
  const [showClinicEducate, setShowClinicEducate] = useState<boolean>(false);
  const [showWheelEducate, setShowWheelEducate] = useState<boolean>(false);
  const [activeFooterIcon, setActiveFooterIcon] = useState<string>('home'); // Track the active footer icon

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
    const apiKey = 'AIzaSyDZTMwnvXJiNqYJHD8JCvpr12-6H-VPfEU'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("response", data);
  
      if (data.status === 'OK') {
        const addressComponents = data.results[0]?.address_components;
        if (addressComponents) {
          const city = addressComponents.find((comp: any) =>
            comp.types.includes("locality")
          )?.long_name || '';
          const state = addressComponents.find((comp: any) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name || '';
          const country = "India";
          const postalCode = addressComponents.find((comp: any) =>
            comp.types.includes("postal_code")
          )?.long_name || '';
  
          // Construct the location string with only city, state, country, and postal code
          const formattedLocation = `${city}, ${state}, ${country} - ${postalCode}`;
          setLocation(formattedLocation);
        } else {
          setLocation('Address not found');
        }
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
        console.log("Latitude:", latitude, "Longitude:", longitude);
        fetchAddress(latitude, longitude); // Call the Geocoding API
      },
      (error) => {
        console.error('Location error:', error); // Log the exact error
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
      }
    );
  }, []);
  
  const handleFooterIconClick = (icon: string) => {
    setActiveFooterIcon(icon); // Set active icon based on click
    if (icon === 'home') {
      router.push('/');
    } else if (icon === 'search') {
      router.push('/DashBoard/SearchPage');
    } else if (icon === 'booking') {
      router.push('http://localhost:3000/Booking');
    } else if (icon === 'profile') {
      router.push('http://localhost:3000/UserProfile');
    }
  };

  // Adjusted footerIconStyle function
  const footerIconStyle = (icon: string) => ({
    color: activeFooterIcon === icon ? '#FC000E' : 'rgb(151, 147, 147)',
  });


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
            <span className="location-text">{location}</span>
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
      <div className="promotion-section">
        <Slider {...sliderSettings} className="promotion-slider">
          <img src="/images/oxi_clinic1.jpg" alt="Oxi Clinic" />
          <img src="/images/oxi_wheel.jpg" alt="Oxi Wheel" />
          <img src="/images/oxi_clinic.jpg" alt="Oxi Gym" />
        </Slider>
      </div>

      {/* Service Section */}
      <div className="service-section">
        <div className="section-header">
          <h1 className="service">Services</h1>
          <button className="view-all-button" onClick={() => setShowGymIcon(true)}>View all </button>
          <TfiAngleDoubleRight size={14} className="arrow-icon" onClick={() => setShowGymIcon(true)} />
        </div>
      </div>

      <div className="services-icon-section">
        <div className="icon-row">
          <div className="service-icon-container" onClick={() => router.push('/DashBoard/LocationPage')}>
            <BiClinic size={40} className="service-icon" />
            <span className="service-text-clinic">Oxi Clinic</span>
          </div>
          <div className="service-icon-container" onClick={() => router.push('/DashBoard/LocationPage')}>
            <PiAmbulanceLight size={40} className="service-icon" />
            <span className="service-text-wheel">Oxi Wheel</span>
          </div>
          {showGymIcon && (
            <div className="service-icon-container" onClick={() => router.push('/DashBoard/LocationPage')}>
              <MdSportsGymnastics size={40} className="service-icon" />
              <span className="service-text-gym">Oxi Gym</span>
            </div>
          )}
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
        <div className="footer-icon" style={footerIconStyle('home')} onClick={() => handleFooterIconClick('home')}>
          <GoHome size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('home').color }}>Home</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('search')} onClick={() => handleFooterIconClick('search')}>
          <CiSearch size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('search').color }}>Search</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('booking')} onClick={() => handleFooterIconClick('booking')}>
          <RxCalendar size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('booking').color }}>Booking</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('profile')} onClick={() => handleFooterIconClick('profile')}>
          <BsPerson size={28} />
          <span className="footer-header" style={{ color: footerIconStyle('profile').color }}>Profile</span>
        </div>
      </div>


    </div>
  );
};

export default Home;




