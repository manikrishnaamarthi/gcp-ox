"use client";
import React, { useEffect, useState } from "react";
import Sidebar from '../Sidebar/page';
import "./Doctorlist.css";

interface Doctor {
  id: number;
  name: string;
  phone: string;
  email: string;
  clinic: string; // Clinic name is fetched from the backend
}

const Doctorlist: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/doctors/");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phone.includes(searchQuery) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase()) // Search by clinic
  );

  return (
    <div className="doctorlist-container">
      <Sidebar />
      <main className="doctorlist-content">
        <h1>Doctors List</h1>
        <p>The following table consists of doctors' details</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Clinic Name</th> {/* Display clinic name */}
              <th>Doctor's Name</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Block this Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.clinic}</td>
                <td>{doctor.name}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email}</td>
                <td>
                  <button className="block-button">
                    <span>🚫 Block</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Doctorlist;
