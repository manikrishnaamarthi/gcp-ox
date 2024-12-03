"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventorys.css";
import Sidebar from "../Sidebar/page";
import { LuFilter } from "react-icons/lu";

const Inventorys = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [requests, setRequests] = useState([]); // Define state to hold request data

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        // Add search functionality if required
    };

    const handleSendButton = async (vendorId, productId) => {
        try {
            // Update the request status in the backend
            const response = await axios.post("http://127.0.0.1:8000/api/inventoryapp_inventorydetails/", {
                vendor_id: vendorId,
                product_id: productId, // Send the unique identifier
            });
    
            if (response.data.message === "Request status updated successfully") {
                // Update the status in the local state
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request.vendor_identifier === vendorId && request.product_id === productId
                            ? { ...request, request_status: "Approved" }
                            : request
                    )
                );
            }
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    };
    
    

    useEffect(() => {
        // Fetch data from the backend API
        const fetchInventoryData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/inventoryapp_inventorydetails/");
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };

        fetchInventoryData();
    }, []);

    return (
        <div className="inventory-container">
            <Sidebar />
            <main className="main-content">
                <header className="header1">
                    <h1>Recent Activity</h1>
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-bar1"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </header>
                <div className="summary-cards">
                    <div className="card1">
                        <p className="count">700</p>
                        <p>Total</p>
                        <span>NEW ITEMS</span>
                    </div>
                    <div className="card1">
                        <p className="count">4</p>
                        <p>Vendors</p>
                        <span>NEW MESSAGE</span>
                    </div>
                    <div className="card1">
                        <p className="count">1</p>
                        <p>Vendor</p>
                        <span>REFUNDS</span>
                    </div>
                </div>
                <div className="table-container">
                    <div className="table-header">
                        <div className="requests">
                            <span>Requests</span>
                        </div>
                        <div className="filters">
                            <i className="filter-icon"><LuFilter /></i>
                            <span>Filters</span>
                        </div>
                    </div>
                    <table className="request-table">
                        <thead>
                            <tr>
                                <th>Items and Category</th>
                                <th>Vendors</th>
                                <th>Status</th>
                                <th>Req Date with time</th>
                                <th>Send items to vendor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <td>
                                        {request.product_name}{" "}
                                        <span className="category">{request.request_quantity}</span>
                                    </td>
                                    <td>
                                        {request.vendor || "N/A"} <br />
                                        <small>{request.location || "Unknown Location"}</small>
                                    </td>
                                    <td className={request.request_status ? request.request_status.toLowerCase() : ""}>
                                        {request.request_status || "No Status"}
                                    </td>
                                    <td>
                                        {request.req_date} at {request.request_time}
                                    </td>
                                    <td>
                                    <div className="button-container">
                                        <button
                                            className={`action-button ${request.request_status === "Pending" ? "send" : "sent"}`}
                                            onClick={() => handleSendButton(request.vendor_identifier, request.product_id)}
                                            disabled={request.request_status !== "Pending"}
                                        >
                                            {request.request_status === "Pending" ? "Send" : "Sent"}
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Inventorys;
