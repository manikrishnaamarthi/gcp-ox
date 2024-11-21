'use client';
import React, { useState, useEffect } from 'react';
import './AdminPerson.css';
import Sidebar from '../Sidebar/page';

const AdminPerson = () => {
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/superadmins/');
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleAddAdminClick = () => {
    setShowAddAdminForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = 'Name is required';
    if (!formValues.contact.trim() || !/^\d{10}$/.test(formValues.contact))
      errors.contact = 'Valid contact number is required';
    if (!formValues.email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email))
      errors.email = 'Valid email is required';
    if (!formValues.address.trim()) errors.address = 'Address is required';
    if (!formValues.state.trim()) errors.state = 'State is required';
    if (!formValues.district.trim()) errors.district = 'District is required';
    if (!formValues.pincode.trim() || !/^\d{6}$/.test(formValues.pincode))
      errors.pincode = 'Valid 6-digit pincode is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/superadmins/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          const newAdmin = await response.json();
          setAdmins([...admins, newAdmin]);
          setShowAddAdminForm(false);
          setFormValues({
            name: '',
            contact: '',
            email: '',
            address: '',
            state: '',
            district: '',
            pincode: '',
          });
          setFormErrors({});

          // Display success message
          alert('Data has been submitted successfully!');
        } else {
          const errorData = await response.json();
          alert(`Failed to add admin: ${JSON.stringify(errorData)}`);
        }
      } catch (error) {
        alert('An error occurred while saving the admin details.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-person-container">
      <Sidebar />
      <main className="content">
        <header>
          <div className="header-content">
            <div className="header-text">
              <h2>{showAddAdminForm ? 'Add Details of Admin' : 'Admin Persons'}</h2>
              <p>
                {showAddAdminForm
                  ? 'Fill the following details to add person'
                  : 'The following table consists of Admins details'}
              </p>
            </div>
            {!showAddAdminForm && (
              <input type="text" placeholder="Search Admin" className="search-input" />
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
                <th>Edit Info</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin.id || index}>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.contact}</td>
                  <td>{admin.location || `${admin.address}, ${admin.state}`}</td>
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
            <form onSubmit={handleSubmit}>
              {['name', 'contact', 'email', 'address', 'state', 'district', 'pincode'].map(
                (field) => (
                  <div className="form-group" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    <input
                      type="text"
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={formValues[field]}
                      onChange={handleInputChange}
                    />
                    {formErrors[field] && <p className="error">{formErrors[field]}</p>}
                  </div>
                )
              )}
              <div className="form-actions">
                <button  className="edit1-btn">
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
