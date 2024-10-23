import React from 'react';
import './CancelPage.css';
import { IoIosArrowBack } from "react-icons/io";

const CancelPage: React.FC = () => {
  return (
    <div className="container">
      <button className="back-button"><IoIosArrowBack />
      </button>
      <div className="cancel-container">
        <div className="cancel-icon">
          <img
            src="/images/cross.png" // Update this path to the actual location of your icon
            alt="Cancel Icon"
          />
        </div>
        <h2>Oops! Something went terribly wrong.</h2>
        <p>Oxivive team call you for booking confirmation</p>
        <button className="retry-button">Retry!</button>
      </div>
    </div>
  );
};

export default CancelPage;
