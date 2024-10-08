import React, { useState } from 'react';
import './Vendors.css';  // Ensure the correct styling is imported

interface Vendor {
  name: string;
  location: string;
  logo: string;
  img: string;
}

interface VendorsData {
  [key: string]: Vendor[];
}

const vendorsData: VendorsData = {
  clinic: [
    { name: "Apollo clinic", location: "JP Nagar", logo: "/images/ambulance.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Sagar Apollo Clinic", location: "KS Layout", logo: "/images/home.png", img: "/images/istockphoto.jpg" },
    { name: "Gorilla Fitness", location: "HSR Layout", logo: "/images/weight.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Rock Fitness", location: "Yelahanka", logo: "/images/weight.png", img: "/images/istockphoto.jpg" },
    { name: "MedPlus", location: "Hebbal", logo: "/images/home.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
  ],
  oxiviveclinic: [
    { name: "Apollo clinic", location: "JP Nagar", logo: "/images/ambulance.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Sagar Apollo Clinic", location: "KS Layout", logo: "/images/home.png", img: "/images/istockphoto.jpg" },
    { name: "Gorilla Fitness", location: "HSR Layout", logo: "/images/weight.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Rock Fitness", location: "Yelahanka", logo: "/images/weight.png", img: "/images/istockphoto.jpg" },
    { name: "MedPlus", location: "Hebbal", logo: "/images/home.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
  ],
  wheel: [
    { name: "Apollo clinic", location: "JP Nagar", logo: "/images/ambulance.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Sagar Apollo Clinic", location: "KS Layout", logo: "/images/home.png", img: "/images/istockphoto.jpg" },
    { name: "Gorilla Fitness", location: "HSR Layout", logo: "/images/weight.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Rock Fitness", location: "Yelahanka", logo: "/images/weight.png", img: "/images/istockphoto.jpg" },
    { name: "MedPlus", location: "Hebbal", logo: "/images/home.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
  ],
  gym: [
    { name: "Sagar Apollo Clinic", location: "KS Layout", logo: "/images/home.png", img: "/images/istockphoto.jpg" },
    { name: "Gorilla Fitness", location: "HSR Layout", logo: "/images/weight.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
    { name: "Rock Fitness", location: "Yelahanka", logo: "/images/weight.png", img: "/images/istockphoto.jpg" },
    { name: "MedPlus", location: "Hebbal", logo: "/images/home.png", img: "/images/istockphoto-1312468241-612x612.jpg" },
  ]
};

const Vendors: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('clinic');

  return (
    <div className="vendors-container">
      <h2>Vendors List</h2>

      {/* Category Selector with underline for the active one */}
      <div className="category-selector">
        <div
          className={`category-item ${selectedCategory === 'clinic' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('clinic')}
        >
          Clinic
        </div>
        <div
          className={`category-item ${selectedCategory === 'oxiviveclinic' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('oxiviveclinic')}
        >
          OxiviveClinic
        </div>
        <div
          className={`category-item ${selectedCategory === 'wheel' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('wheel')}
        >
          Wheel
        </div>
        <div
          className={`category-item ${selectedCategory === 'gym' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('gym')}
        >
          Gym
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="vendors-list">
        {vendorsData[selectedCategory].map((vendor, index) => (
          <div className="vendor-card" key={index}>
            <img src={vendor.logo} alt="logo" className="vendor-logo" />
            <img src={vendor.img} alt={vendor.name} className="vendor-img" />
            <h3>{vendor.name}</h3>
            <p>{vendor.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vendors;
