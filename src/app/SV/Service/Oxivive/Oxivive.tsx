'use client';
import React, { useState, useEffect } from 'react';
import './Oxivive.css';
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from 'next/navigation';

const Oxivive: React.FC = () => {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isProceedEnabled, setIsProceedEnabled] = useState<boolean>(false);
    const [isServiceClicked, setIsServiceClicked] = useState<boolean>(false); // Track if service button is clicked
    const router = useRouter();

    useEffect(() => {
        const serviceName = localStorage.getItem('selectedService');
        setSelectedService(serviceName);
    }, []);

    const handleBackClick = () => {
        router.back();
    };

    const handleServiceClick = () => {
        setIsServiceClicked(prevState => !prevState); // Toggle the clicked state
        setIsProceedEnabled(prevState => !prevState); // Toggle the proceed button enable/disable state
    };

    const handleSubmitClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/vendorapp/save-service/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedService }),
            });
    
            if (response.ok) {
                // Navigate to the next page on success
                router.push('/SV/Service/Oxivive/Details');
            } else {
                console.error('Failed to save service');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="oxivive-container">
            <div className="oxivive-back">
                <button className="back-icon" onClick={handleBackClick}>
                    <MdKeyboardBackspace />
                </button>
            </div>
            <div className="oxivive-content">
                <img src="/images/check.png" alt="OxiWheel" className="oxivive-image" />
                <h2 className="oxivive-title">
                    To continue OxiWheel Vendor with OXIVIVE, please select an option
                </h2>
                <p className="oxivive-subtitle">
                    If you have multiple vehicles, proceed as oxiWheel.
                </p>
                <p className="oxivive-question">
                    What would you like to register as?
                </p>
                {/* Conditionally apply the class for red color if clicked */}
                <button
                    className={`oxivive-option ${isServiceClicked ? 'service-clicked' : ''}`}
                    onClick={handleServiceClick}
                >
                    {selectedService}
                </button>
            </div>
            <button className="oxivive-proceed" disabled={!isProceedEnabled} onClick={handleSubmitClick}>
                Save and Proceed
            </button>
        </div>
    );
};

export default Oxivive;
