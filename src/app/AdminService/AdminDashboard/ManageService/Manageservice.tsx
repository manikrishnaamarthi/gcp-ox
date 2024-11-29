// 'use client';
// import React from 'react';
// import { FaHome, FaCartPlus, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
// import { BiSolidBookAdd } from 'react-icons/bi';
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { CgRemove } from "react-icons/cg";
// import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
// import { FaPeopleGroup } from 'react-icons/fa6';
// import { CiSquareRemove } from 'react-icons/ci';
// import './Manageservice.css';

// const Manageservice = () => {
//   return (
//     <div className="manage-service">
//       <aside className="manage-sidebar">
//         <div className="logo-container">
//           <img src="/images/shot.png" alt="Logo" className="logo-img" />
//           <p className="logo-text">Super Admin</p>
//         </div>

//         <nav className="sidebar-icons">
//           <div className="sidebar-icon" data-name="Admin">
//             <FaHome />
//           </div>
//           <div className="sidebar-icon" data-name="Invoice">
//             <FaCartPlus />
//           </div>
//           <div className="sidebar-icon" data-name="Booking">
//             <BiSolidBookAdd />
//           </div>
//           <div className="sidebar-icon" data-name="Vendor Approval">
//             <FaPeopleGroup />
//           </div>
//           <div className="sidebar-icon" data-name="Revenue">
//             <FaChartArea />
//           </div>
//           <div className="sidebar-icon" data-name="Manage Service">
//             <MdManageAccounts />
//           </div>
//           <div className="sidebar-icon" data-name="Inventory">
//             <MdOutlineInventory />
//           </div>
//           <div className="sidebar-icon" data-name="Vendor">
//             <MdOutlinePeopleAlt />
//           </div>
//           <div className="sidebar-icon logout-icon" data-name="Logout">
//             <FaSignOutAlt />
//           </div>
//         </nav>
//       </aside>

//       <main className="content">
//         <header className="header">
//           <h2 className="page-title">Manage Service</h2>
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search services..."
//           />
//         </header>

//         <div className="actions">
//           <button className="add-service-btn">
//             <IoMdAddCircleOutline className="add-icon" /> Add Service
//           </button>
//         </div>

//         <section className="service-cards">
//           <div className="card">
//             <div className="card-image">
//               <img src="/images/oxi_clinic.jpg" alt="Oxi Clinic" />
//               <h3 className="head1">Oxi Clinic</h3>
//             </div>
//             <div className="card-content">
//               <p><strong>Service:</strong> HYPERBARIC OXYGEN THERAPY (HBOT)</p>
//               <p>
//                 <strong>Description:</strong> Unleash your mind's potential with
//                 our cutting-edge anti-aging treatments.
//               </p>
//               <p><strong>Price:</strong> 2,000 Rs.</p>
//               <button className="remove-btn">
//                 <CgRemove className="remove-icon" /> Remove
//               </button>
//             </div>
//           </div>

//           <div className="card">
//             <div className="card-image">
//               <img src="/images/oxi_home.jpg" alt="Oxi Home" />
//               <h3 className="head1">Oxi Home</h3>
//             </div>
//             <div className="card-content">
//               <p><strong>Service:</strong> Treats the Muscles and body pain</p>
//               <p>
//                 <strong>Description:</strong> Say goodbye to aches, pains, and
//                 fatigue.
//               </p>
//               <p><strong>Price:</strong> 2,599 Rs.</p>
//               <button className="remove-btn">
//                 <CiSquareRemove className="remove-icon" /> Remove
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Manageservice;





'use client';
import React, { useState, useEffect } from 'react';
import { FaHome, FaCartPlus, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCameraOutline } from "react-icons/io5";
import { CgRemove } from "react-icons/cg";
import './Manageservice.css';

// Define form data type
interface FormData {
  serviceName: string;
  description: string;
  price: string;
  serviceType: string;
  image: File | null;
}

interface Service {
  service_id: string;
  service: string;
  description: string;
  price: string;
  service_type: string;
  service_image: string;
}

const Manageservice: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    description: '',
    price: '',
    serviceType: '',
    image: null,
  });
  const [services, setServices] = useState<Service[]>([]);

  // Fetch services from the backend when the component mounts
  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/manage-service/');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle remove button click
  const handleRemove = async (service_id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/manage-service/$SI-16971/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Service deleted successfully!");
        setServices((prevServices) => prevServices.filter((service) => service.service_id !== service_id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete service: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("An error occurred while deleting the service.");
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
      setSelectedImageName(e.target.files[0].name); // Store the selected file name
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.image) {
      alert('Please fill data & upload an image.');
      return;
    }

    try {
      // Step 1: Upload image to Cloudinary
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dpysjcjbf/image/upload';
      const uploadPreset = 'documents_all';

      const imageFormData = new FormData();
      imageFormData.append('file', formData.image);
      imageFormData.append('upload_preset', uploadPreset);

      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: imageFormData,
      });

      const cloudinaryData = await cloudinaryResponse.json();

      if (!cloudinaryData.secure_url) {
        alert('Image upload failed.');
        return;
      }

      // Step 2: Send data to backend
      const backendData = {
        service: formData.serviceName,
        description: formData.description,
        price: formData.price,
        service_type: formData.serviceType,
        service_image: cloudinaryData.secure_url,
      };

      const backendResponse = await fetch('http://localhost:8000/api/manage-service/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });

      if (backendResponse.ok) {
        alert('Service added successfully!');
        setFormData({
          serviceName: '',
          description: '',
          price: '',
          serviceType: '',
          image: null,
        });
        setShowModal(false);
        fetchServices();
      } else {
        alert('Failed to add service.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="manage-service">
      <aside className="manage-sidebar">
        <div className="logo-container">
          <img src="/images/shot.png" alt="Logo" className="logo-img" />
          <p className="logo-text">Super Admin</p>
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
        <header className="header">
          <h2 className="page-title">Manage Service</h2>
          <input type="text" className="search-bar" placeholder="Search services..." />
        </header>

        <div className="actions">
          <button className="add-service-btn" onClick={() => setShowModal(true)}>
            <IoMdAddCircleOutline className="add-icon" /> Add Service
          </button>
        </div>

        <section className="service-cards">
          {services.map((service) => (
            <div key={service.service_id} className="card">
              <div className="card-image">
                <img src={service.service_image} alt={service.service} />
                <h3 className="head1">{service.service_type}</h3>
              </div>
              
              <div className="card-content">
                <p><strong>Service:</strong> {service.service}</p>
                <p><strong>Description:</strong> {service.description}</p>
                <p>
                  <strong>Price:</strong> <span style={{ color: 'red' }}>{service.price} Rs.</span>
                </p>
                <button className="remove-btn" onClick={() => handleRemove(service.service_id)}>
                  <CgRemove className="remove-icon" /> Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="heading5">Add New Service</h3>
              <form>
                <label>Service Name:</label>
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  placeholder="Enter service name"
                />
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter service description"
                ></textarea>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
                <label>Service Type:</label>
                <input
                  type="text"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  placeholder="Enter service type"
                />
               <label>Upload Image:</label>
          
<div className="upload-container">
  <button
    type="button"
    className="upload-btn"
    onClick={() => document.getElementById('fileInput')?.click()}
  >
    <IoCameraOutline className="camera-icon" />
    {formData.image ? (
      <span className="file-name">{formData.image.name}</span>
    ) : (
      <span className='place'>Upload Image</span>
    )}
  </button>
  <input
    type="file"
    id="fileInput"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={handleImageUpload}
  />
</div>

                <div className="modal-actions">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Manageservice;


