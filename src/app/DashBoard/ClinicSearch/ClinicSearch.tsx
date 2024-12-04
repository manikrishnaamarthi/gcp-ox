"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For extracting query parameters
import { IoIosSearch } from "react-icons/io";
import "./ClinicSearch.css";
import { IoChevronBackSharp } from 'react-icons/io5';
import Footer from './Footer';

const ClinicSearch: React.FC = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams?.get("location");
  console.log(location , 'location')


  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8003/api/vendor-details/?location=${encodeURIComponent(location || "")}`);
        // const response = await fetch(`http://127.0.0.1:8003/api/vendor-details/?location=Tadepalligudem%2C%20Andhra%20Pradesh%2C%20India`);
        if (!response.ok) throw new Error("Failed to fetch clinic data");
        
        const data = await response.json();
        setClinics(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (location) fetchClinics();
  }, [location]);

 
  if (error) return <p>Error: {error}</p>;


  const handleCardClick = (vendorId: string) => {
    // Navigate to the Dashboard/BookAppointment page with the vendor_id in the query string
    router.push(`/DashBoard/BookAppointment?vendor_id=${vendorId}`);
  };
  
  return (
    <div className="clinic-search-container">
      {/* Header */}
      
      <div className="search-bar">
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for a location"
          className="search-input"
          value={location || ""}
          readOnly
        />
        
      </div>
      <div className="clinic-cards-container">
      {/* Display Clinics */}
      {clinics.length > 0 ? (
        clinics.map((clinic, index) => (
          <div className="clinic-card" key={index}>
            <img
              src={clinic.oxi_image1 || clinic.oxi_image2 || "https://via.placeholder.com/100"}
              alt={clinic.clinic_name}
              className="clinic-image"
              onClick={() => handleCardClick(clinic.vendor_id)}
            />
            <div className="clinic-info">
              <p className="clinic-name">{clinic.clinic_name}</p>
              <p className="clinic-address">{clinic.address}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No clinics found for the selected location.</p>
      )}

      {/* Footer Section */}
    <Footer />
    </div>
    
    </div>
  );
};

export default ClinicSearch;
