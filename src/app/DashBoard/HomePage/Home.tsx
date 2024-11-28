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
  }, []); // Dependency array ensures this runs once after the component mounts

  const handleServiceClick = (serviceType: string) => {
    router.push(`/DashBoard/LocationPage?serviceType=${serviceType}&oxi_id=${oxiId}`);
  };

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
    const apiKey = 'AIzaSyCMsV0WQ7v8ra-2e7qRXVnDr7j0vOoOcWM'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
  
        // Extracting various address components
        const streetNumber = addressComponents.find((comp: any) => comp.types.includes("street_number"))?.long_name || '';
        const streetName = addressComponents.find((comp: any) => comp.types.includes("route"))?.long_name || '';
        const neighborhood = addressComponents.find((comp: any) => comp.types.includes("neighborhood"))?.long_name || '';
        const locality = addressComponents.find((comp: any) => comp.types.includes("locality"))?.long_name || '';
        const sublocality = addressComponents.find((comp: any) => comp.types.includes("sublocality_level_1"))?.long_name || '';
        const city = addressComponents.find((comp: any) => comp.types.includes("locality"))?.long_name || '';
        const state = addressComponents.find((comp: any) => comp.types.includes("administrative_area_level_1"))?.long_name || '';
        const country = addressComponents.find((comp: any) => comp.types.includes("country"))?.long_name || '';
        const postalCode = addressComponents.find((comp: any) => comp.types.includes("postal_code"))?.long_name || '';
  
        // Constructing the full address
        let fullAddress = '';
  
        // Include street information if available
        if (streetNumber && streetName) {
          fullAddress += `${streetNumber} ${streetName}, `;
        } else if (streetName) {
          fullAddress += `${streetName}, `;
        }
  
        if (neighborhood) {
          fullAddress += `${neighborhood}, `;
        }
  
        if (sublocality) {
          fullAddress += `${sublocality}, `;
        }
  
        if (city) {
          fullAddress += `${city}, `;
        }
  
        if (state) {
          fullAddress += `${state}, `;
        }
  
        if (country) {
          fullAddress += `${country} - `;
        }
  
        if (postalCode) {
          fullAddress += `${postalCode}`;
        }
  
        // Set the location state with the full address
        setLocation(fullAddress || 'Unable to fetch address');
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
      router.push('http://localhost:3000/Booking?oxi_id=${oxiId}');
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