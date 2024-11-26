"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/page";
import "./Driverlist.css";

interface Driver {
  driver_id: number;
  name: string;
  phone: string;
  email: string; // Added email field
  wheel: string; // Wheel name field
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/drivers/");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery) ||
      driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.wheel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="driverlist-container">
      <Sidebar />
      <main className="driverlist-content">
        <h1>Drivers List</h1>
        <p>The following table consists of drivers' details</p>
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
              <th>Wheel Name</th>
              <th>Driver's Name</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Block this Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver, index) => (
              <tr key={driver.driver_id}>
                <td>{index + 1}</td>
                <td>{driver.wheel}</td>
                <td>{driver.name}</td>
                <td>{driver.phone}</td>
                <td>{driver.email}</td>
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

export default DriverList;
