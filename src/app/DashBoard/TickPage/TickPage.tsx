"use client"
import React, { useEffect } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import './TickPage.css';
import { useRouter } from 'next/navigation';


const TickPage: React.FC = () => {
    const router = useRouter();


    useEffect(() => {
        // Force re-apply styles if necessary
        const backButton = document.querySelector('.back-button') as HTMLElement;
        if (backButton) {
            backButton.style.fontSize = '24px';
            backButton.style.padding = '10px';
        }
    }, []); // Empty dependency to run once on component mount
    const handleHomeClick = () => {
        // Navigate to the /DashBoard/HomePage route
        router.push('/DashBoard/HomePage');
    };

    return (
        <div className="tick-container">
                <button className="back-button"  key="back-button" onClick={() => router.back()}>
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
