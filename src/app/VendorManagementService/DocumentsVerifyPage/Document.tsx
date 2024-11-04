"use client";
import React, { useEffect, useState } from 'react';
import './Document.css'; // Assuming you are using external CSS for styling
import { FaIdBadge, FaBuilding, FaIdCard, FaUser } from 'react-icons/fa';
import { IoIosArrowForward, IoMdArrowBack } from 'react-icons/io'; 
import { useRouter } from 'next/navigation';
import { TiTick } from 'react-icons/ti';

const Document: React.FC = () => {
    const router = useRouter();
    const [isMedicalUploaded, setIsMedicalUploaded] = useState(false);
    const [isBuildingLicenceUploaded, setIsBuildingLicenceUploaded] = useState(false);
    const [isAadharUploaded, setIsAadharUploaded] = useState(false);
    const [isPancardUploaded, setIsPancardUploaded] = useState(false);
    const [isProfilePhotoUploaded, setIsProfilePhotoUploaded] = useState(false);

    // Check if documents are uploaded successfully on mount
    useEffect(() => {
        const medicalUploadStatus = localStorage.getItem("isMedicalUploaded") === "true";
        const buildingLicenceStatus = localStorage.getItem("isBuildingLicenceUploaded") === "true";
        const aadharUploadStatus = localStorage.getItem("isAadharUploaded") === "true";
        const pancardUploadStatus = localStorage.getItem("isPancardUploaded") === "true";
        const profilePhotoStatus = localStorage.getItem("isProfilePhotoUploaded") === "true";

        setIsMedicalUploaded(medicalUploadStatus);
        setIsBuildingLicenceUploaded(buildingLicenceStatus);
        setIsAadharUploaded(aadharUploadStatus);
        setIsPancardUploaded(pancardUploadStatus);
        setIsProfilePhotoUploaded(profilePhotoStatus);

        const cleanup = () => {
            localStorage.removeItem("isMedicalUploaded");
            localStorage.removeItem("isBuildingLicenceUploaded");
            localStorage.removeItem("isAadharUploaded");
            localStorage.removeItem("isPancardUploaded");
            localStorage.removeItem("isProfilePhotoUploaded");
            localStorage.removeItem("frontSidePreview");
            localStorage.removeItem("backSidePreview");
            localStorage.removeItem("licenceNumber");
            localStorage.removeItem("licenceEndDate");
            localStorage.removeItem("buildingLicenceFront");
            localStorage.removeItem("aadharFrontPreview");
            localStorage.removeItem("aadharBackPreview");
            localStorage.removeItem("pancardFrontSidePreview");
            localStorage.removeItem("pancardBackSidePreview");
            localStorage.removeItem("profilePhotoPreview");
        };

        window.addEventListener("beforeunload", cleanup);
        return () => {
            window.removeEventListener("beforeunload", cleanup);
        };
    }, []);

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
                <IoMdArrowBack className="back-icon" onClick={() => router.back()} />
                <h1>Upload documents</h1>
                <p>Quick & Simple Process</p>
            </header>

            <div className="content-container">
                <div className="document-cards">
                    {/* Medical Practitioner License */}
                    <div 
                        className={`document-card ${isMedicalUploaded ? 'uploaded' : ''}`}
                        onClick={handleMedicalClick }
                    >
                        <FaIdBadge className="document-icon" />
                        <div className="document-info">
                            <h2 className="document-title">Medical Practitioner License</h2>
                            <p>Upload Medical Practitioner License</p>
                        </div>
                        {isMedicalUploaded && <TiTick className="tick-icon" />}
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    {/* Building Permit & Licence */}
                    <div 
                        className={`document-card ${isBuildingLicenceUploaded ? 'uploaded' : ''}`} 
                        onClick={handleBuildingClick}
                    >
                        <FaBuilding className="document-icon" />
                        <div className="document-info">
                            <h2 className="document-title">Building Permit & Licence</h2>
                            <p>Upload Building Permit & Licence</p>
                        </div>
                        {isBuildingLicenceUploaded && <TiTick className="tick-icon" />}
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    {/* Aadhar Card */}
                    <div 
                        className={`document-card ${isAadharUploaded ? 'uploaded' : ''}`} 
                        onClick={handleAadharClick}
                    >
                        <FaIdCard className="document-icon" />
                        <div className="document-info">
                            <h2 className="document-title">Aadhar Card</h2>
                            <p>Upload Aadhar Card</p>
                        </div>
                        {isAadharUploaded && <TiTick className="tick-icon" />}
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    {/* Pan Card */}
                    <div 
                        className={`document-card ${isPancardUploaded ? 'uploaded' : ''}`}
                        onClick={handlePancardClick}
                    >
                        <FaIdCard className="document-icon" />
                        <div className="document-info">
                            <h2 className="document-title">Pan Card</h2>
                            <p>Upload Pan Card</p>
                        </div>
                        {isPancardUploaded && <TiTick className="tick-icon" />}
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    {/* Profile Photo */}
                    <div className={`document-card ${isProfilePhotoUploaded ? 'uploaded' : ''}`} onClick={handleProfileClick}>
                        <FaUser className="document-icon" />
                        <div className="document-info">
                            <h2 className="document-title">Profile Photo</h2>
                            <p>Upload Profile Photo</p>
                        </div>
                        {isProfilePhotoUploaded && <TiTick className="tick-icon" />}
                        <IoIosArrowForward className="arrow-icon" />
                    </div>
                </div>

                <button className="submit-btn">Submit</button>
            </div>
        </div>
    );
};

export default Document;
