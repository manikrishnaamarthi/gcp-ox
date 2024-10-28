'use client';
import React, { useState, useEffect } from 'react';
import './Oxivive.css';
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from 'next/navigation';

const Oxivive: React.FC = () => {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isProceedEnabled, setIsProceedEnabled] = useState<boolean>(false);
    const [isServiceClicked, setIsServiceClicked] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const serviceName = localStorage.getItem('selectedService');
        setSelectedService(serviceName);
    }, []);

    const handleBackClick = () => {
        router.back();
    };

    const handleServiceClick = () => {
        setIsServiceClicked(prevState => !prevState);
        setIsProceedEnabled(prevState => !prevState);
    };

    const handleProceedClick = () => {
        if (selectedService) {
            localStorage.setItem('serviceData', selectedService); // Store selected service locally
            router.push('/VendorManagementService/SV/Service/Oxivive/Details'); // Navigate to the next page
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
                    To continue {selectedService} Vendor with OXIVIVE, please select an option
                </h2>
                <p className="oxivive-subtitle">
                    If you have multiple vehicles, proceed as {selectedService}.
                </p>
                <p className="oxivive-question">
                    What would you like to register as?
                </p>
                <button
                    className={`oxivive-option ${isServiceClicked ? 'service-clicked' : ''}`}
                    onClick={handleServiceClick}
                >
                    {selectedService}
                </button>
            </div>
            <button className="oxivive-proceed" disabled={!isProceedEnabled} onClick={handleProceedClick}>
                Save and Proceed
            </button>
        </div>
    );
};

export default Oxivive;
