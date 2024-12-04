"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventorys.css";
import Sidebar from "../Sidebar/page";
import { LuFilter } from "react-icons/lu";

const Inventorys = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [groupedRequests, setGroupedRequests] = useState({});

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleApproveButton = async (vendorId, productId) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/inventoryapp_inventorydetails/", {
                vendor_id: vendorId,
                product_id: productId,
                action: "approve",
            });

            if (response.data.message === "Request status updated successfully") {
                setGroupedRequests((prevGroupedRequests) => {
                    const updatedGroupedRequests = { ...prevGroupedRequests };
                    Object.keys(updatedGroupedRequests).forEach((date) => {
                        updatedGroupedRequests[date] = updatedGroupedRequests[date].map((request) =>
                            request.vendor_identifier === vendorId && request.product_id === productId
                                ? { ...request, request_status: "Approved" }
                                : request
                        );
                    });
                    return updatedGroupedRequests;
                });
            }
        } catch (error) {
            console.error("Error approving request status:", error);
        }
    };

    const handleRejectButton = async (vendorId, productId) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/inventoryapp_inventorydetails/", {
                vendor_id: vendorId,
                product_id: productId,
                action: "reject",
            });

            if (response.data.message === "Request status updated successfully") {
                setGroupedRequests((prevGroupedRequests) => {
                    const updatedGroupedRequests = { ...prevGroupedRequests };
                    Object.keys(updatedGroupedRequests).forEach((date) => {
                        updatedGroupedRequests[date] = updatedGroupedRequests[date].map((request) =>
                            request.vendor_identifier === vendorId && request.product_id === productId
                                ? { ...request, request_status: "Rejected" }
                                : request
                        );
                    });
                    return updatedGroupedRequests;
                });
            }
        } catch (error) {
            console.error("Error rejecting request status:", error);
        }
    };

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/inventoryapp_inventorydetails/");
                const groupedData = response.data.reduce((acc, curr) => {
                    const date = curr.req_date;
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(curr);
                    return acc;
                }, {});
                setGroupedRequests(groupedData);
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
                <div className="card-container">
                <div className="cards-header">
                        <div className="requests">
                            <span>Requests</span>
                        </div>
                        <div className="filters">
                            <i className="filter-icon"><LuFilter /></i>
                            <span>Filters</span>
                        </div>
                    </div>
                    <div className="request-card card-header">
                        <div className="card-column">
                            <span className="card-label">Items and Category</span>
                        </div>
                        <div className="card-column">
                            <span className="card-label">Vendors</span>
                        </div>
                        <div className="card-column">
                            <span className="card-label">Status</span>
                        </div>
                        <div className="card-column">
                            <span className="card-label">Req Date with time</span>
                        </div>
                        <div className="card-column">
                            <span className="card-label">Send items to vendor</span>
                        </div>
                    </div>


                    {Object.entries(groupedRequests).map(([date, requests]) => (
                        <div key={date} className="date-group">
                            <h3 className="date-header">{date}</h3>
                            {requests.map((request, index) => (
                                <div className="request-card" key={index}>
                                    <div className="card-column">
                                        <div className="product-info">
                                            <span>{request.product_name}</span>
                                            <span className="category">{request.request_quantity}</span>
                                        </div>
                                    </div>
                                    <div className="card-column">
                                        <span>{request.vendor || "N/A"}</span>
                                        <small>{request.location || "Unknown Location"}</small>
                                    </div>
                                    <div className="card-column">
                                        <span className={`status ${request.request_status?.toLowerCase()}`}>
                                            {request.request_status || "No Status"}
                                        </span>
                                    </div>
                                    <div className="card-column">
                                        <span>
                                            {request.req_date} at {request.request_time}
                                        </span>
                                    </div>
                                    <div className="card-column">
                                        <div className="button-container">
                                            <button
                                                className="action-button approve"
                                                onClick={() =>
                                                    handleApproveButton(request.vendor_identifier, request.product_id)
                                                }
                                                disabled={request.request_status === "Approved"}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="action-button reject"
                                                onClick={() =>
                                                    handleRejectButton(request.vendor_identifier, request.product_id)
                                                }
                                                disabled={request.request_status === "Rejected"}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Inventorys;
