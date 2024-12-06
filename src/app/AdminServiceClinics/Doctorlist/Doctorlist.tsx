"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/page";
import "./Doctorlist.css";

interface Doctor {
  id: number;
  name: string;
  phone: string;
  email: string | null; // Allow null values
  clinic: string | null; // Allow null values
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

  const filteredDoctors = doctors.filter((doctor) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const normalizedName = doctor.name?.toLowerCase() || ""; // Ensure safety
    const normalizedPhone = doctor.phone || ""; // No transformation needed
    const normalizedEmail = doctor.email?.toLowerCase() || ""; // Ensure safety
    const normalizedClinic = doctor.clinic?.toLowerCase() || ""; // Ensure safety

    return (
      normalizedName.includes(normalizedQuery) ||
      normalizedPhone.includes(normalizedQuery) ||
      normalizedEmail.includes(normalizedQuery) ||
      normalizedClinic.includes(normalizedQuery)
    );
  });

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
                <td>{doctor.clinic || "N/A"}</td> {/* Display "N/A" if null */}
                <td>{doctor.name}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email || "N/A"}</td> {/* Display "N/A" if null */}
                <td>
                  <button className="block-button">
                    <span>Block</span>
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
