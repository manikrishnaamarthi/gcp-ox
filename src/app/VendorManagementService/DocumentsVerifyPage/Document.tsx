import React from 'react';
import './Document.css'; // Assuming you are using external CSS for styling
import { FaIdBadge, FaBuilding, FaIdCard, FaUser } from 'react-icons/fa';
import { IoIosArrowForward, IoMdArrowBack } from 'react-icons/io'; // Importing new icons

const Document: React.FC = () => {
    return (
        <div className="document-container">
            <header className="header">
                <IoMdArrowBack className="back-icon" />
                <h1>Upload documents</h1>
                <p>Quick & Simple Process</p>
            </header>

            <div className="content-container">
                <div className="document-cards">
                    <div className="document-card">
                        <FaIdBadge className="document-icon" />
                        <div className="document-info">
                            <h2>Medical Practitioner License</h2>
                            <p>Upload Medical Practitioner License</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card">
                        <FaBuilding className="document-icon" />
                        <div className="document-info">
                            <h2>Building Permit & Licence</h2>
                            <p>Upload Building Permit & Licence</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card">
                        <FaIdCard className="document-icon" />
                        <div className="document-info">
                            <h2>Aadhar Card</h2>
                            <p>Upload Aadhar Card</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card">
                        <FaIdCard className="document-icon" />
                        <div className="document-info">
                            <h2>Pan Card</h2>
                            <p>Upload Pan Card</p>
                        </div>
                        <IoIosArrowForward className="arrow-icon" />
                    </div>

                    <div className="document-card">
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
