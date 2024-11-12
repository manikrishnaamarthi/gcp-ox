"use client"
import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import './TickPage.css';
import { useRouter } from 'next/navigation';


const TickPage: React.FC = () => {
    const router = useRouter();
    const handleHomeClick = () => {
        // Navigate to the /DashBoard/HomePage route
        router.push('/DashBoard/HomePage');
    };

    return (
        <div className="tick-container">
                <button className="back-button" onClick={() => router.back()}>
                    <IoChevronBackSharp size={20} />
                </button>
            <div className="tick-content">
                
                <div className="tick-icon">
                    <img src="/images/Right.png" alt="Success" />
                </div>
                <h2>Your Services has been booked</h2>
                <p>Oxivive team will call you for booking confirmation</p>
                <button className="home-button" onClick={handleHomeClick}>Back to Home</button>
            </div>
        </div>
    );
};

export default TickPage;
