"use client"
import React, { useEffect, useState } from 'react';
import './Document.css'; // External CSS for styling
import { FaIdBadge, FaBuilding, FaIdCard, FaUser } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';

const Document: React.FC = () => {
    const router = useRouter();
    const [isMedicalUploaded, setIsMedicalUploaded] = useState(false);
    const [isBuildingLicenceUploaded, setIsBuildingLicenceUploaded] = useState(false);
    const [isAadharUploaded, setIsAadharUploaded] = useState(false);
    const [isPancardUploaded, setIsPancardUploaded] = useState(false);
    const [isProfilePhotoUploaded, setIsProfilePhotoUploaded] = useState(false);
    const [isDrivingLicenceUploaded, setIsDrivingLicenceUploaded] = useState(false);
    const [isVehicleRCUploaded, setIsVehicleRCUploaded] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        state: '',
        district: '',
        pincode: '',
        address: '',
        wheelName: '',
        clinicName: ''
    });
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        const serviceName = localStorage.getItem('selectedService');
        if (serviceName) {
            setSelectedService(serviceName);
        }
    }, []);

    useEffect(() => {
        // Check document statuses on mount
        setIsMedicalUploaded(localStorage.getItem("isMedicalUploaded") === "true");
        setIsBuildingLicenceUploaded(localStorage.getItem("isBuildingLicenceUploaded") === "true");
        setIsAadharUploaded(localStorage.getItem("isAadharUploaded") === "true");
        setIsPancardUploaded(localStorage.getItem("isPancardUploaded") === "true");
        setIsProfilePhotoUploaded(localStorage.getItem("isProfilePhotoUploaded") === "true");
        setIsDrivingLicenceUploaded(localStorage.getItem("isDrivingLicenceUploaded") === "true");
        setIsVehicleRCUploaded(localStorage.getItem("isVehicleRCUploaded") === "true");
    
        // Cleanup function for localStorage on page unload
        const cleanup = () => {
            localStorage.clear();
        };

        window.addEventListener("beforeunload", cleanup);
        return () => {
            window.removeEventListener("beforeunload", cleanup);
        };
    }, []);

    console.log("IsMedicalUploaded",isMedicalUploaded)

    useEffect(() => {
        // Enable the submit button only if all documents are uploaded
        if (
            isAadharUploaded &&
            isPancardUploaded &&
            isProfilePhotoUploaded &&
            (
                (selectedService === 'Oxi Clinic' && isMedicalUploaded && isBuildingLicenceUploaded) || 
                (selectedService === 'Oxi Wheel' && isDrivingLicenceUploaded && isVehicleRCUploaded)
            )
        ) {
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    }, [isMedicalUploaded, isBuildingLicenceUploaded, isAadharUploaded, isPancardUploaded, isProfilePhotoUploaded, isDrivingLicenceUploaded, isVehicleRCUploaded, selectedService]);

    const handleMedicalClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/MedicalLicence');
    const handleBuildingClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/BuildingLicence');
    const handleAadharClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/AadharPage');
    const handlePancardClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/PancardPage');
    const handleProfileClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/ProfilePhotoPage');
    const handleDrivingLicenceClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/DrivingLicence');
    const handleVehicleRCClick = () => router.push('/VendorManagementService/DocumentsVerifyPage/VehicleRC');

    // Handle submit to backend
    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        
        // Add basic fields to FormData
        formDataToSend.append("name", formData.name);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("state", formData.state);
        formDataToSend.append("district", formData.district);
        formDataToSend.append("pincode", formData.pincode);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("wheelName", formData.wheelName ? formData.wheelName : "");
formDataToSend.append("clinicName", formData.clinicName ? formData.clinicName : "");

        // Helper function to add a file to FormData if it exists
        const addFileToFormData = (key: string, fileString: string | null) => {
            if (fileString) {
                const byteString = atob(fileString.split(",")[1]);
                const arrayBuffer = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    arrayBuffer[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
                formDataToSend.append(key, blob, `${key}.jpg`);
            } else {
                console.warn(`No file found for ${key}`);
            }
        };

        // Add images to FormData
        addFileToFormData("medical_front_side", localStorage.getItem("medicalFrontFile"));
        addFileToFormData("medical_back_side", localStorage.getItem("medicalBackFile"));
        addFileToFormData("building_front_side", localStorage.getItem("buildingFrontFile"));
        addFileToFormData("driving_front_side", localStorage.getItem("drivingFrontFile"));
        addFileToFormData("driving_back_side", localStorage.getItem("drivingBackFile"));
        addFileToFormData("vehicle_rc_front_side", localStorage.getItem("vehicleFrontFile"));
        addFileToFormData("vehicle_rc_back_side", localStorage.getItem("vehicleBackFile"));
        addFileToFormData("aadhar_front_side", localStorage.getItem("aadharFrontFile"));
        addFileToFormData("aadhar_back_side", localStorage.getItem("aadharBackFile"));
        addFileToFormData("pan_front_side", localStorage.getItem("panFrontFile"));
        addFileToFormData("pan_back_side", localStorage.getItem("panBackFile"));
        addFileToFormData("profile_photo", localStorage.getItem("profilePhotoFile"));
    

        // Add licence number and end date if available
        formDataToSend.append("medical_licence_number", localStorage.getItem("licenceNumber") || "");
        
        const licenceEndDate = localStorage.getItem("licenceEndDate");
        if (licenceEndDate) {
            const date = new Date(licenceEndDate);
            const formattedDate = date.toISOString().split("T")[0];
            formDataToSend.append("licence_end_date", formattedDate);
        }

        // Document.tsx

// Add driving license number and DOB
formDataToSend.append("driving_licence_number", localStorage.getItem("drivingLicenceNumber") || "");

const dateOfBirth = localStorage.getItem("dateOfBirth");
if (dateOfBirth) {
    const formattedDob = new Date(dateOfBirth).toISOString().split("T")[0];
    formDataToSend.append("date_of_birth", formattedDob);
}


        // Ensure selectedService is sent to the backend
        if (selectedService) {
            formDataToSend.append("selectedService", selectedService);
        } else {
            console.error("Selected service is missing");
            return;  // Early exit if selectedService is missing
        }

        try {
            const response = await axios.post("http://localhost:8000/api/vendor-details/", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                alert("Documents uploaded successfully!");
                localStorage.clear(); // Clear localStorage after successful upload
                router.push('/VendorManagementService/paymentPage/paymentSuccess'); // Redirect to success page after upload
            }
        } catch (error) {
            console.error("Error uploading documents:", error);
            alert("please uploading all documents.");
        }
    };

    return (
        <div className="document-container">
            <header className="header">
                <BiArrowBack className="back-icon1" onClick={() => router.back()} />
                <h1>Upload documents</h1>
                <p>Quick & Simple Process</p>
            </header>

            <div className="content-container">
                <div className="document-cards">
                    {/* Medical Practitioner License */}
                    {selectedService === 'Oxi Clinic' && (
                        <div
                            className={`document-card ${isMedicalUploaded ? 'uploaded' : ''}`}
                            onClick={handleMedicalClick}
                        >
                            <FaIdBadge className="document-icon" />
                            <div className="document-info">
                                <h2 className="document-title">Medical Practitioner License</h2>
                                <p>Upload Medical Practitioner License</p>
                            </div>
                            {isMedicalUploaded && <TiTick className="tick-icon" />}
                            <IoIosArrowForward className="arrow-icon" />
                        </div>
                    )}

                    {/* Building Permit & Licence */}
                    {selectedService === 'Oxi Clinic' && (
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
                    )}

                    {/* Aadhar Card */}
                    {selectedService && (
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
                    )}

                    {/* Pancard */}
                    {selectedService && (
                        <div
                            className={`document-card ${isPancardUploaded ? 'uploaded' : ''}`}
                            onClick={handlePancardClick}
                        >
                            <FaIdCard className="document-icon" />
                            <div className="document-info">
                                <h2 className="document-title">Pancard</h2>
                                <p>Upload Pancard</p>
                            </div>
                            {isPancardUploaded && <TiTick className="tick-icon" />}
                            <IoIosArrowForward className="arrow-icon" />
                        </div>
                    )}

                    {/* Profile Photo */}
                    {selectedService && (
                        <div
                            className={`document-card ${isProfilePhotoUploaded ? 'uploaded' : ''}`}
                            onClick={handleProfileClick}
                        >
                            <FaUser className="document-icon" />
                            <div className="document-info">
                                <h2 className="document-title">Profile Photo</h2>
                                <p>Upload Profile Photo</p>
                            </div>
                            {isProfilePhotoUploaded && <TiTick className="tick-icon" />}
                            <IoIosArrowForward className="arrow-icon" />
                        </div>
                    )}

                    {/* Driving Licence */}
                    {selectedService === 'Oxi Wheel' && (
                        <div
                            className={`document-card ${isDrivingLicenceUploaded ? 'uploaded' : ''}`}
                            onClick={handleDrivingLicenceClick}
                        >
                            <FaIdCard className="document-icon" />
                            <div className="document-info">
                                <h2 className="document-title">Driving Licence</h2>
                                <p>Upload Driving Licence</p>
                            </div>
                            {isDrivingLicenceUploaded && <TiTick className="tick-icon" />}
                            <IoIosArrowForward className="arrow-icon" />
                        </div>
                    )}

                    {/* Vehicle Registration Certificate */}
                    {selectedService === 'Oxi Wheel' && (
                        <div
                            className={`document-card ${isVehicleRCUploaded ? 'uploaded' : ''}`}
                            onClick={handleVehicleRCClick}
                        >
                            <FaIdCard className="document-icon" />
                            <div className="document-info">
                                <h2 className="document-title">Vehicle RC</h2>
                                <p>Upload Vehicle RC</p>
                            </div>
                            {isVehicleRCUploaded && <TiTick className="tick-icon" />}
                            <IoIosArrowForward className="arrow-icon" />
                        </div>
                    )}
                </div>
                

                <button
                        onClick={handleSubmit}
                        disabled={!isSubmitEnabled}
                        className={`submit-btn ${isSubmitEnabled ? 'enabled' : 'disabled'}`}
                    >
                        Submit
                    </button>
            </div>
        </div>
    );
};

export default Document;
