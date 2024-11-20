'use client'
import React, { useState } from "react";
import "./AdminPerson.css";
import { FaHome, FaSignOutAlt, FaCartPlus, FaChartArea } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

const AdminPerson: React.FC = () => {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);

  const admins = [
    { id: 1, name: "Prashant Patil", contact: "7899639187", location: "Bellary, Karnataka" },
    { id: 2, name: "Vishwanath", contact: "7899454567", location: "Madurai, Tamilnadu" },
    { id: 3, name: "Siddharath", contact: "5656789900", location: "Tiruchirappally, Andhra" },
    { id: 4, name: "Vinesh B", contact: "2323456789", location: "Sagar, Tripura" },
    { id: 5, name: "Samantha A", contact: "9988776655", location: "Trisura, Kerala" },
    { id: 6, name: "Aishwarya", contact: "3456787898", location: "Pune, Maharashtra" },
    { id: 7, name: "Suhas V", contact: "6565787899", location: "Ahmedabad, Gujarat" },
    { id: 8, name: "Veeresh B", contact: "3456767575", location: "Bikaner, Rajasthan" },
    { id: 9, name: "Kantesh G", contact: "9090878785", location: "Mysuru, Karnataka" },
  ];

  const handleAddAdminClick = () => {
    setShowAddAdminForm(true);
  };

  const handleCloseForm = () => {
    setShowAddAdminForm(false);
  };

  return (
    <div className="admin-person-container">
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
          <div className="sidebar-icon" data-name="Vendor">
            <MdOutlinePeopleAlt />
          </div>
          <div className="sidebar-icon logout-icon" data-name="Logout">
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>

      <main className="content">
        <header>
          <div className="header-content">
            <div className="header-text">
              <h2>{showAddAdminForm ? "Add Details of Admin" : "Admin Persons"}</h2>
              <p>{showAddAdminForm ? "Fill the following details to add person" : "The following table consists of Admins details"}</p>
            </div>
            {!showAddAdminForm && (
              <input
                type="text"
                placeholder="Search Admin"
                className="search-input"
              />
            )}
          </div>
        </header>

        {!showAddAdminForm && (
          <div className="actions">
            <button className="add-details-btn" onClick={handleAddAdminClick}>
              + Add Admin
            </button>
          </div>
        )}

        {!showAddAdminForm && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Admin's Name</th>
                <th>Contact No</th>
                <th>Location</th>
                <th>Edit or Delete the info</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.contact}</td>
                  <td>{admin.location}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showAddAdminForm && (
          <div className="add-admin-form">
            <h3>Add New Admin</h3>
            <form>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" placeholder="Enter admin name" />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input type="text" placeholder="Enter contact number" />
              </div>
              <div className="form-group">
                <label>Email ID:</label>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="form-group">
                <label>State:</label>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="form-group">
                <label>District:</label>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="form-group">
                <label>Pincode:</label>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="form-actions">
                {/* <button type="button" className="cancel-btn" onClick={handleCloseForm}>
                  Cancel
                </button> */}
                <button type="submit" className="reset-btn">
                  Reset
                </button>
                <button type="submit" className="edit1-btn">
                  Edit
                </button>
                <button type="submit" className="save1-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPerson;
