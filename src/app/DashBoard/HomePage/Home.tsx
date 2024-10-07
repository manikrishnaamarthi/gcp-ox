import React, { useState } from 'react';
import './Home.css';
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHome, FaUser, FaSearch } from 'react-icons/fa';
import { BiSolidGrid, BiListUl } from 'react-icons/bi';

const Home: React.FC = () => {
  const router = useRouter();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleSearchClick = () => {
    router.push('/DashBoard/HomePage/AppointmentPage');
  };

  const handleViewAllServices = () => {
    router.push('/DashBoard/ServicesPage');
  };

  const handleServiceIconClick = () => {
    router.push('/DashBoard/ServicesPage');
  };

  const handleActivityIconClick = () => {
    router.push('./ActivityPage');
  };

  const handleAccountIconClick = () => {
    router.push('./AccountPage');
  };

  return (
    <div className="home-container">
      <h1 className='header'>Oxivive</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Where to go"
          className='search-input'
          onClick={handleSearchClick}
        />
        <FaSearch className="search-icon"  onClick={handleSearchClick}/>
      </div>
    
      <div className="explore-section">
        <div className="section-header">
          <h1 className='explore'>Explore</h1>
          <button onClick={handleViewAllServices} className="view-all-button">View All</button>
        </div>
        <div className="explore-images">
          <div className="image-container" onClick={handleSearchClick}>
            <img
              src="/images/oxi_clinic.jpg"
              alt="Oxi Clinic"
            />
            <p className="image-label">Oxi Clinic</p>
          </div>
          <div className="image-container" onClick={handleSearchClick}>
            <img
              src="/images/oxi_wheel.jpg"
              alt="Oxi Wheel"
            />
            <p className="image-label">Oxi Wheel</p>
          </div>
        </div>
      </div>

      <div className="promotion-section">
        <h1 className='promotion-header'>Promotion</h1>
        <Slider {...sliderSettings} className="promotion-slider">
          <img src="/images/oxi_clinic1.jpg" alt="Oxi Clinic" />
          <img src="/images/oxi_wheel.jpg" alt="Oxi Wheel" />
          <img src="/images/oxi_clinic.jpg" alt="Oxi Gym" />
        </Slider>
      </div>

      <div className="footer-section">
        <div className="footer-icon" onClick={handleServiceIconClick}>
          <FaHome size={32} />
        </div>
        <div className="footer-icon" onClick={handleServiceIconClick}>
          <BiSolidGrid size={32} />
        </div>
        <div className="footer-icon" onClick={handleActivityIconClick}>
          <BiListUl size={32} />
        </div>
        <div className="footer-icon" onClick={handleAccountIconClick}>
          <FaUser size={32} />
        </div>
      </div>
      
    </div>
  );
};

export default Home;
