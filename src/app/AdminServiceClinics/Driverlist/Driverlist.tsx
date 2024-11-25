"use client"
import React, { useEffect, useState } from "react";
import Sidebar from '../Sidebar/page';
import "./Driverlist.css";

interface Driver {
  id: number;
  name: string;
  phone: string;
  location: string;
}

const Driverlist: React.FC = () => {
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
      driver.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="driverlist-container">
      <Sidebar />
      <main className="driverlist-content">
        <h1>Drivers List</h1>
        <p>The Following table consists of Drivers details</p>
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
              <th>Driver's Name</th>
              <th>Contact No</th>
              <th>Location</th>
              <th>Block this Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.name}</td>
                <td>{driver.phone}</td>
                <td>{driver.location}</td>
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

export default Driverlist;
