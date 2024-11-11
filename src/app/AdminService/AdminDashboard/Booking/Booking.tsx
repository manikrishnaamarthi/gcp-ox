// src/components/Bookings.tsx
"use client"
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { BiSolidBookAdd } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaChartArea } from "react-icons/fa";
import './Booking.css';

const Bookings = () => {
  const [selectedClinic, setSelectedClinic] = useState('OxiviveClinic');
  const [selectedStatus, setSelectedStatus] = useState('Booking');

  const bookings = [
    { date: 'Wed 16', time: '09:00 AM - 10:00 AM', location: 'Bandra, Mumbai', name: 'Shivakumar Shetty', doctor: 'Dr. Manoj Jonam', status: 'Booking', clinic: 'OxiviveClinic' },
    { date: 'Wed 16', time: '10:00 AM - 11:00 AM', location: 'Thane, Mumbai', name: 'Anthony', doctor: 'Dr. Raghu', status: 'Completed', clinic: 'OxiviveClinic' },
    { date: 'Wed 16', time: '01:00 PM - 02:30 PM', location: 'Juhu, Mumbai', name: 'Dilip Raja', doctor: 'Dr. Sneha', status: 'Cancelled', clinic: 'OxiviveClinic' },
    { date: 'Thu 17', time: '10:00 AM - 11:30 AM', location: 'Malad, Mumbai', name: 'Virendra Patil', doctor: 'Dr. Raghu', status: 'Booking', clinic: 'OxiWheel' },
    { date: 'Thu 17', time: '03:00 PM - 04:00 PM', location: 'Borivali, Mumbai', name: 'Rohit Kumar', doctor: 'Dr. Piyush Shah', status: 'Completed', clinic: 'OxiviveClinic' },
    { date: 'Fri 18', time: '09:30 AM - 10:30 AM', location: 'Powai, Mumbai', name: 'Kavita Sharma', doctor: 'Dr. Shalini Kapoor', status: 'Cancelled', clinic: 'OxiWheel' },
    { date: 'Fri 18', time: '11:00 AM - 12:30 PM', location: 'Colaba, Mumbai', name: 'Suresh Iyer', doctor: 'Dr. Rakesh Gupta', status: 'Booking', clinic: 'OxiWheel' },
    { date: 'Fri 18', time: '02:00 PM - 03:00 PM', location: 'Worli, Mumbai', name: 'Prakash Singh', doctor: 'Dr. Aditi Nair', status: 'Completed', clinic: 'OxiviveClinic' },
    { date: 'Sat 19', time: '10:00 AM - 11:00 AM', location: 'Kandivali, Mumbai', name: 'Neha Joshi', doctor: 'Dr. Manisha Agarwal', status: 'Booking', clinic: 'OxiviveClinic' },
    { date: 'Sat 19', time: '01:00 PM - 02:00 PM', location: 'Vile Parle, Mumbai', name: 'Sunil Desai', doctor: 'Dr. Ashok Bhatia', status: 'Completed', clinic: 'OxiWheel' },
    { date: 'Sat 19', time: '03:00 PM - 04:00 PM', location: 'Kurla, Mumbai', name: 'Ramesh Naidu', doctor: 'Dr. Mahesh Chawla', status: 'Cancelled', clinic: 'OxiWheel' },
    { date: 'Sun 20', time: '11:00 AM - 12:00 PM', location: 'Dadar, Mumbai', name: 'Pooja Rane', doctor: 'Dr. Kiran Mhatre', status: 'Booking', clinic: 'OxiWheel' },
    { date: 'Sun 20', time: '02:00 PM - 03:00 PM', location: 'Marine Lines, Mumbai', name: 'Ajay Varma', doctor: 'Dr. Anita Singh', status: 'Completed', clinic: 'OxiviveClinic' }
  ];

  const filteredBookings = bookings.filter(
    (booking) => booking.status === selectedStatus && booking.clinic === selectedClinic
  );

  return (
    <div className="app">
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
        </div>
        
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Admin"><FaHome /></div>
          <div className="sidebar-icon" data-name="Invoice"><FaCartPlus /></div>
          <div className="sidebar-icon" data-name="Booking"><BiSolidBookAdd /></div>
          <div className="sidebar-icon" data-name="Vendor Approval"><FaPeopleGroup /></div>
          <div className="sidebar-icon" data-name="Revenue"><FaChartArea /></div>
          <div className="sidebar-icon" data-name="Manage Service"><MdManageAccounts /></div>
          <div className="sidebar-icon" data-name="Inventory"><MdOutlineInventory /></div>
          <div className="sidebar-icon" data-name="Vendor"><MdOutlinePeopleAlt /></div>
        </nav>
      </aside>

      <main className="booking-list">
        <header>
          <h1>Booking List</h1>
          <p>See the scheduled events from the calendar</p>
        </header>

        {/* Clinic Toggle Buttons */}
        <div className="clinic-toggle-container">
          <div className="clinic-toggle">
            <button
              className={selectedClinic === 'OxiviveClinic' ? 'active' : ''}
              onClick={() => setSelectedClinic('OxiviveClinic')}
            >
              OxiviveClinic
            </button>
            <button
              className={selectedClinic === 'OxiWheel' ? 'active' : ''}
              onClick={() => setSelectedClinic('OxiWheel')}
            >
              OxiWheel
            </button>
          </div>
        </div>

        {/* Status Toggle Buttons */}
        <div className="status-toggle-container">
          <div className="status-toggle">
            <button
              className={selectedStatus === 'Booking' ? 'active' : ''}
              onClick={() => setSelectedStatus('Booking')}
            >
              Booking
            </button>
            <button
              className={selectedStatus === 'Completed' ? 'active' : ''}
              onClick={() => setSelectedStatus('Completed')}
            >
              Completed
            </button>
            <button
              className={selectedStatus === 'Cancelled' ? 'active' : ''}
              onClick={() => setSelectedStatus('Cancelled')}
            >
              Cancelled
            </button>
          </div>
        </div>

        <div className="booking-cards">
    {filteredBookings.map((booking, index) => (
        <div className="booking-card" key={index}>
            <p className="booking-date">{booking.date}</p>
            <div className="booking-info">
                <p className="booking-time">{booking.time}</p>
                <p className="booking-location">{booking.location}</p>
                <p className="booking-name">{booking.name}</p>
            </div>
            <p className="booking-doctor">{booking.doctor}</p>
        </div>
    ))}
</div>
      </main>
    </div>
  );
};

export default Bookings;
