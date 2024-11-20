'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './AdminDashboard.css';
import { FaHome, FaSignOutAlt, FaCartPlus, FaChartArea } from 'react-icons/fa';
import { BiSolidBookAdd } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from 'react-icons/fa6';

interface Vendor {
  id: number;
  name: string;
  selectedService: string;
  address: string;
  profile_photo: string;
  document_status: string;
  state: string;
  district: string;
  pincode: number;
  email: string;
  phone: number;
  pan_front_side: string;
  gstNumber: string;
  aadhar_front_side: string;
  aadhar_back_side: string;
  pan_back_side: string;
  medical_front_side: string;
  medical_back_side: string;
  medical_licence_number: number;
  licence_end_date: string;
  driving_front_side: string;
  driving_back_side: string;
  driving_licence_number: number;
  vehicle_rc_front_side: string;
  vehicle_rc_back_side: string;
}

const categories = ["OxiviveClinic", "OxiviveWheel"];

const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("OxiviveClinic");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/vendorapp-vendordetails/');
        const data: Vendor[] = await response.json();
        console.log("API Response:", data);
        setVendors(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    if (!isLoading && vendors.length > 0) {
      const filtered = vendors.filter(vendor => {
        const matchesCategory = activeCategory === "OxiviveClinic" 
          ? vendor.selectedService.trim() === "Oxi Clinic" 
          : vendor.selectedService.trim() === "Oxi Wheel";
        const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
        const underProcessStatus = vendor.document_status.trim() === "UnderProcess";
        return matchesCategory && matchesSearch && underProcessStatus;
      });

      setFilteredVendors(filtered);
    } else {
      setFilteredVendors([]);
    }
  }, [vendors, activeCategory, searchQuery, isLoading]);

  const handleCardClick = (vendor: Vendor) => {
    router.push(`/AdminService/AdminDashboard/AdminDetails?id=${vendor.id}&name=${vendor.name}&state=${vendor.state}&district=${vendor.district}&pincode=${vendor.pincode}&profile_photo=${vendor.profile_photo}&selectedService=${vendor.selectedService}&address=${vendor.address}&email=${vendor.email}&phone=${vendor.phone}&pan_front_side=${vendor.pan_front_side}&gstNumber=${vendor.gstNumber}&aadhar_front_side=${vendor.aadhar_front_side}&aadhar_back_side=${vendor.aadhar_back_side}&pan_back_side=${vendor.pan_back_side}&medical_front_side=${vendor.medical_front_side}&medical_back_side=${vendor.medical_back_side}&medical_licence_number=${vendor.medical_licence_number}&licence_end_date=${vendor.licence_end_date}&driving_front_side=${vendor.driving_front_side}&driving_back_side=${vendor.driving_back_side}&driving_licence_number=${vendor.driving_licence_number}&vehicle_rc_front_side=${vendor.vehicle_rc_front_side}&vehicle_rc_back_side=${vendor.vehicle_rc_back_side}`);
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
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
          <div className="sidebar-icon" data-name="Vendor" onClick={() => router.push('http://localhost:3000/AdminService/VendorsList/')}>
            <MdOutlinePeopleAlt />
          </div>
          <div className="sidebar-icon logout-icon" data-name="Logout"><FaSignOutAlt /></div>
        </nav>
      </aside>
      
      <main className="admin-content">
        <div className="admin-header">
          <h2 className="admin-title">Vendors Applications</h2>
        </div>

        <div className="admin-categories">
          <div className="categories-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by vendor name..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="cards-container">
          {isLoading ? (
            <p>Loading vendors...</p>
          ) : filteredVendors.length > 0 ? (
            filteredVendors.map((vendor, index) => (
              <div key={index} className="card" onClick={() => handleCardClick(vendor)}>
                <img src={`${vendor.profile_photo}`} alt={vendor.name} className="vendor-image" />
                <p className="vendor-name">Name: {vendor.name}</p>
                <p className="vendor-info">Applied: {vendor.selectedService}</p>
                <p className="vendor-info">Location: {vendor.address}</p>
              </div>
            ))
          ) : (
            <p className="no-vendors-message">No vendors available for {activeCategory}.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
