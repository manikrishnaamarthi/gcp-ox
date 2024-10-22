import React from 'react';
import './TickPage.css';
import { IoIosArrowBack } from "react-icons/io";

const TickPage: React.FC = () => {
    return (
        <div className="tick-container">
            <div className="back-button"><IoIosArrowBack /></div>
            <div className="tick-content">
                
                <div className="tick-icon">
                    <img src="/images/Right.png" alt="Success" />
                </div>
                <h2>Your Services has been booked</h2>
                <p>Oxivive team will call you for booking confirmation</p>
                <button className="home-button">Back to Home</button>
            </div>
        </div>
    );
};

export default TickPage;
