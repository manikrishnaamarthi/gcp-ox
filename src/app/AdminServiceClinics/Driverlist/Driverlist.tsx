import React from "react";
import Sidebar from '../Sidebar/page';
import "./Driverlist.css";

const Driverlist: React.FC = () => {
  const drivers = [
    { id: 1, name: "Prashant Patil", contact: "7899639187", location: "Bandra, Mumbai" },
    { id: 2, name: "Vishwanath", contact: "7899454567", location: "Thane, Mumbai" },
    { id: 3, name: "Siddharath", contact: "5656789900", location: "Juhu, Mumbai" },
    { id: 4, name: "Vinesh B", contact: "2323456789", location: "Sagar, Mumbai" },
    { id: 5, name: "Samantha A", contact: "9988776655", location: "Dharavi, Mumbai" },
    { id: 2, name: "Vishwanath", contact: "7899454567", location: "Thane, Mumbai" },
    { id: 3, name: "Siddharath", contact: "5656789900", location: "Juhu, Mumbai" },
  ];

  return (
    <div className="driverlist-container">
        <Sidebar />
      {/* <aside className="sidebar">
        <div className="logo">SHOT</div>
        <ul className="menu">
          <li>Admin</li>
          <li>Dashboard</li>
          <li>Services</li>
          <li>Drivers</li>
          <li>Reports</li>
        </ul>
      </aside> */}
      <main className="driverlist-content">
        <h1>Drivers List</h1>
        <p>The Following table consist of Drivers details</p>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Drivers Name</th>
              <th>Contact No</th>
              <th>Location</th>
              <th>Block this Info</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.name}</td>
                <td>{driver.contact}</td>
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
