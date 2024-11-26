"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // For extracting query params
import "./DriverProfile.css";

const DriverProfile: React.FC = () => {
    const searchParams = useSearchParams();
    const driverId = searchParams.get("driver_id"); // Get driver_id from query params
    const [driverDetails, setDriverDetails] = useState({
        name: "",
        email: "",
        phone: "",
        profile_photo: "https://via.placeholder.com/150", // Default image
    });

    useEffect(() => {
        if (driverId) {
          console.log(`Fetching driver details for ID: ${driverId}`);  // Debugging line
            fetch(`http://127.0.0.1:8001/api/driver-details/?driver_id=${driverId}`) // Use the Django API endpoint
                .then((response) => {
                  console.log(`API Response: ${response.status}`);  // Debugging line
                    if (!response.ok) {
                        throw new Error("Failed to fetch driver details");
                    }
                    return response.json();
                })
                .then((data) => {
                    setDriverDetails({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        profile_photo: data.profile_photo || "https://via.placeholder.com/150",
                    });
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    }, [driverId]);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setDriverDetails((prevDetails) => ({
                ...prevDetails,
                profile_photo: imageUrl,
            }));
        }
    };

    return (
        <div className="driver-profile">
            <h1>Profile</h1>
            <div
                className="profile-photo"
                onClick={() => document.getElementById("photo-upload")?.click()}
            >
                <img
                    src={driverDetails.profile_photo}
                    alt="Profile"
                    className="profile-img"
                />
                <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                />
            </div>
            <div className="profile-details">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={driverDetails.name} readOnly />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={driverDetails.email} readOnly />

                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" value={driverDetails.phone} readOnly />
            </div>
        </div>
    );
};

export default DriverProfile;
