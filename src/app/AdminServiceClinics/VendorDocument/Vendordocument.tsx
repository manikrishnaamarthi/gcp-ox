"use client"
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi"; // Import the FiUploadCloud icon
import { FaHome, FaCartPlus, FaChartArea, FaSignOutAlt } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import axios from "axios";
import "./Vendordocument.css";

const Vendordocument: React.FC = () => {
  const [selectedService, setSelectedService] = useState<'Oxivive Clinic' | 'Oxivive Wheel'>('Oxivive Clinic');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [documentImages, setDocumentImages] = useState<{ [key: string]: string | null }>({});

  const documents = {
    'Oxivive Clinic': [
      { title: 'Aadhar Card', type: ['Front', 'Back'] },
      { title: 'PAN Card', type: ['Front', 'Back'] },
      { title: 'Medical Licence', type: ['Front', 'Back'] },
      { title: 'Building Permit', type: ['Front'] },
    ],
    'Oxivive Wheel': [
      { title: 'Aadhar Card', type: ['Front', 'Back'] },
      { title: 'PAN Card', type: ['Front', 'Back'] },
      { title: 'Driving Licence', type: ['Front', 'Back'] },
      { title: 'Vehicle RC', type: ['Front', 'Back'] },
    ],
  };

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "documents_all");

      axios
        .post("https://api.cloudinary.com/v1_1/dpysjcjbf/image/upload", formData)
        .then((response) => {
          setProfileImage(response.data.secure_url);
        })
        .catch((error) => {
          console.error("Error uploading profile photo:", error);
        });
    }
  };

  const handleDocumentUpload = (title: string, side: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "documents_all");

      axios
        .post("https://api.cloudinary.com/v1_1/dpysjcjbf/image/upload", formData)
        .then((response) => {
          setDocumentImages((prevImages) => ({
            ...prevImages,
            [`${title}-${side}`]: response.data.secure_url,
          }));
        })
        .catch((error) => {
          console.error("Error uploading document:", error);
        });
    }
  };

  const handleSubmit = () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const profilePhoto = profileImage;
    const documentsUploaded = Object.values(documentImages).every(url => url !== null);
  
    // Validate required fields
    if (!name || !phone || !email || !profilePhoto || !documentsUploaded) {
      alert("Please fill in all fields and upload the required documents!");
      return;
    }
    const profilePhotoData = {
      profile_photo: profileImage,
    };

    const formattedDocuments = {
      aadhar_front_side: documentImages['Aadhar Card-Front'] || null,
      aadhar_back_side: documentImages['Aadhar Card-Back'] || null,
      pan_front_side: documentImages['PAN Card-Front'] || null,
      pan_back_side: documentImages['PAN Card-Back'] || null,
      medical_front_side: documentImages['Medical Licence-Front'] || null,
      medical_back_side: documentImages['Medical Licence-Back'] || null,
      building_front_side: documentImages['Building Permit-Front'] || null,
      driving_front_side: documentImages['Driving Licence-Front'] || null,
      driving_back_side: documentImages['Driving Licence-Back'] || null,
      vehicle_rc_front_side: documentImages['Vehicle RC-Front'] || null,
      vehicle_rc_back_side: documentImages['Vehicle RC-Back'] || null,
    };

    const formData = {
      selected_service: selectedService,
      name: (document.getElementById("name") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      state: (document.getElementById("state") as HTMLInputElement).value,
      district: (document.getElementById("district") as HTMLInputElement).value,
      pincode: parseInt((document.getElementById("pincode") as HTMLInputElement).value || '0'),
      address: (document.getElementById("address") as HTMLInputElement).value,
      wheel_name: selectedService === 'Oxivive Wheel' ? (document.getElementById("wheelName") as HTMLInputElement).value : "",
      clinic_name: selectedService === 'Oxivive Clinic' ? (document.getElementById("clinicName") as HTMLInputElement).value : "",
      ...profilePhotoData,
      ...formattedDocuments,
    };

    axios
      .post("http://localhost:8000/api/vendor-details/", formData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        alert("Documents uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("An error occurred while uploading documents.");
      });
  };

  return (
    <div className="manage-service">
      {/* Sidebar */}
      <aside className="manage-sidebar">
        <div className="logo-container">
          <img src="/images/shot.png" alt="Logo" className="logo-img" />
          <p className="logo-text">Admin</p>
        </div>
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Admin">
            <FaHome />
          </div>
          <div className="sidebar-icon" data-name="Invoice">
            <FaCartPlus />
          </div>
          <div className="sidebar-icon" data-name="Booking">
            <BiSolidBookAdd />
          </div>
          <div className="sidebar-icon" data-name="Vendor Approval">
            <FaPeopleGroup />
          </div>
          <div className="sidebar-icon" data-name="Revenue">
            <FaChartArea />
          </div>
          <div className="sidebar-icon" data-name="Manage Service">
            <MdManageAccounts />
          </div>
          <div className="sidebar-icon" data-name="Inventory">
            <MdOutlineInventory />
          </div>
          <div className="sidebar-icon" data-name="Vendor">
            <MdOutlinePeopleAlt />
          </div>
          <div className="sidebar-icon logout-icon" data-name="Logout">
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="header">
          <div className="header-wrapper">
            <h1 className="heading">Vendor Documents</h1>
            <div className="tabs-buttons">
              <button
                className={`service-toggle ${selectedService === 'Oxivive Clinic' ? 'active' : ''}`}
                onClick={() => setSelectedService('Oxivive Clinic')}
              >
                Oxivive Clinic
              </button>
              <button
                className={`service-toggle ${selectedService === 'Oxivive Wheel' ? 'active' : ''}`}
                onClick={() => setSelectedService('Oxivive Wheel')}
              >
                Oxivive Wheel
              </button>
              <button className="upload-main-btn" onClick={handleSubmit}>
                Upload
              </button>
            </div>
          </div>
          <p className="sub-heading">Fill the following details to add person</p>
        </header>
        <section className="form-section">
          <form className="vendor-form">
            <div className="profile-section">
              <div className="profile-photo">
                {/* Display the profile image if available */}
                <div
                  className="profile-icon"
                  style={{
                    backgroundImage: profileImage ? `url(${profileImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!profileImage && <BsPersonCircle size={100} className="profile-icon" />}
                </div>
                <p className="profile-text">Profile Photo</p>
                <label htmlFor="profile-photo-upload" className="upload-btn">
                   Upload Photo
                </label>
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePhotoUpload}
                />
              </div>
              <div className="profile-details">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Name" />
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="text" placeholder="Phone Number" />
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Email" />
                <label htmlFor="state">State</label>
                <input id="state" type="text" placeholder="State" />
                <label htmlFor="district">District</label>
                <input id="district" type="text" placeholder="District" />
                <label htmlFor="pincode">Pincode</label>
                <input id="pincode" type="text" placeholder="Pincode" />
                <label htmlFor="address">Address</label>
                <input id="address" type="text" placeholder="Address" />
                {selectedService === 'Oxivive Wheel' && (
                  <>
                    <label htmlFor="wheelName">Wheel Name</label>
                    <input id="wheelName" type="text" placeholder="Wheel Name" />
                  </>
                )}
                {selectedService === 'Oxivive Clinic' && (
                  <>
                    <label htmlFor="clinicName">Clinic Name</label>
                    <input id="clinicName" type="text" placeholder="Clinic Name" />
                  </>
                )}
              </div>
            </div>

            {/* Document Upload */}
            <h2 className="head5">Upload The Documents</h2>

            <div className="grid-container">
              {documents[selectedService].map(({ title, type }) => (
                <div key={title} className="document-card">
                  <p className="document-title">{title}</p>
                  <div className="document-card-group">
                    {type.map((side) => (
                      <div key={`${title}-${side}`} className="document-card-item">
                        <div
                          className="upload-area"
                          onClick={() => document.getElementById(`${title}-${side}-upload`)?.click()}
                        >
                          {!documentImages[`${title}-${side}`] && (
                            <>
                              <div className="upload-icon-container">
                                <FiUploadCloud size={30} />
                              </div>
                              <p className="para">Drop your file here, or browse</p>
                              <p className="para1">Files must be less than 2MB</p>
                              <p className="para1">Only one file can be uploaded</p>
                            </>
                          )}
                          {documentImages[`${title}-${side}`] && (
                            <img
                              src={documentImages[`${title}-${side}`] as string}
                              alt={`${title} ${side}`}
                              className="preview-image"
                            />
                          )}
                        </div>

                        <input
                          id={`${title}-${side}-upload`}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleDocumentUpload(title, side, e)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Vendordocument;
