'use client'
import React from 'react';
import './Oxivive.css';
import { useEffect, useState } from 'react';
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from 'next/navigation';

const Oxivive: React.FC = () => {

    const [selectedService, setSelectedService] = useState<string | null>(null);
    const router = useRouter(); // Initialize the router

    useEffect(() => {
      // Retrieve the service name from localStorage when the component mounts
      const serviceName = localStorage.getItem('selectedService');
      setSelectedService(serviceName);
    }, []);

    const handleBackClick = () => {
        router.back(); // Navigate to the previous page
    }

    return (
        <div className="oxivive-container">
            <div className="oxivive-back">
            <button className="back-icon" onClick={handleBackClick}><MdKeyboardBackspace /></button>
            </div>
            <div className="oxivive-content">
                <img src="/images/check.png" alt="OxiWheel" className="oxivive-image" />
                <h2 className="oxivive-title">
                    To continue OxiWheel Vendor with OXIVIVE, please select an option
                </h2>
                <p className="oxivive-subtitle">
                    if you have multiple vehicles, proceed as oxiWheel.
                </p>
                <p className="oxivive-question">
                    What would you like to register as?
                </p>
                <button className="oxivive-option">{selectedService || 'No service selected'}</button>
            </div>
            <button className="oxivive-proceed">Save and Proceed</button>
        </div>
    );
}

export default Oxivive;
