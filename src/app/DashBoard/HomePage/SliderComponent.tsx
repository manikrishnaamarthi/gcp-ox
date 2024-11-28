import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="promotion-section">
      <Slider {...sliderSettings} className="promotion-slider">
        <img src="/images/oxi_clinic1.jpg" alt="Oxi Clinic" loading="lazy" />
        <img src="/images/oxi_wheel.jpg" alt="Oxi Wheel" loading="lazy"/>
        <img src="/images/oxi_clinic.jpg" alt="Oxi Gym"loading="lazy" />
      </Slider>
    </div>
  );
};

export default SliderComponent;