"use client"
import React from 'react';
import './Document.css'; // Assuming you are using external CSS for styling
import { FaIdBadge, FaBuilding, FaIdCard, FaUser } from 'react-icons/fa';
import { IoIosArrowForward, IoMdArrowBack } from 'react-icons/io'; 
import { useRouter } from 'next/navigation';


const Document: React.FC = () => {
    const router = useRouter();

    const handleMedicalClick = () => {
        router.push('/VendorManagementService/DocumentsVerifyPage/MedicalLicence');
    };
    const handleBuildingClick = () => {
        router.push('/VendorManagementService/DocumentsVerifyPage/BuildingLicence');
    };
    const handleAadharClick = () => {
        router.push('/VendorManagementService/DocumentsVerifyPage/AadharPage');
    };
    const handlePancardClick = () => {
        router.push('/VendorManagementService/DocumentsVerifyPage/PancardPage');
    };
    const handleProfileClick = () => {
        router.push('/VendorManagementService/DocumentsVerifyPage/ProfilePhotoPage');
    };
    return (
        <div className="document-container">
            <header className="header">
                <IoMdArrowBack className="back-icon" />
                <h1>Upload documents</h1>
                <p>Quick & Simple Process</p>
            </header>

            <div className="content-container">
                <div className="document-cards">
                    <div className="document-card" onClick={handleMedicalClick }>
                        <FaIdBadge className="document-icon" />
                        <div className="document-info">
                            <h2>Medical Practitioner License</h2>
                            <p>Upload Medical Practitioner License</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card" onClick={handleBuildingClick}>
                        <FaBuilding className="document-icon" />
                        <div className="document-info">
                            <h2>Building Permit & Licence</h2>
                            <p>Upload Building Permit & Licence</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card" onClick={handleAadharClick}>
                        <FaIdCard className="document-icon" />
                        <div className="document-info">
                            <h2>Aadhar Card</h2>
                            <p>Upload Aadhar Card</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card" onClick={handlePancardClick}>
                        <FaIdCard className="document-icon" />
                        <div className="document-info">
                            <h2>Pan Card</h2>
                            <p>Upload Pan Card</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card" onClick={handleProfileClick}>
                        <FaUser className="document-icon" />
                        <div className="document-info">
                            <h2>Profile Photo</h2>
                            <p>Upload Profile Photo</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>
                </div>

                <button className="submit-btn">Submit</button>
            </div>
        </div>
    );
};

export default Document;
