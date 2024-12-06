"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import './Invoicelist.css';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

interface Invoice {
  invoice_id: string;
  vendor: {
    email: string;
  };
  service_type: string;
  issued_date: string;
  total: number;
  status: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  const router = useRouter(); // Initialize the router for navigation

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/invoices/')
      .then((response) => response.json())
      .then((data) => {
        setInvoices(data);
        setFilteredInvoices(data); // Initially show all invoices
      })
      .catch((error) => console.error('Error fetching invoices:', error));
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [filter, invoices]);

  const filterInvoices = () => {
    switch (filter) {
      case 'paid':
        setFilteredInvoices(invoices.filter((invoice) => invoice.status === 'Paid'));
        break;
      case 'unpaid':
        setFilteredInvoices(invoices.filter((invoice) => invoice.status === 'Unpaid'));
        break;
      case 'all':
      default:
        setFilteredInvoices(invoices);
        break;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'status-paid';
      case 'Unpaid':
        return 'status-unpaid';
      case 'In Process':
        return 'status-in-process';
      default:
        return '';
    }
  };

  const getCountByStatus = (status: 'paid' | 'unpaid') => {
    return invoices.filter((invoice) => invoice.status.toLowerCase() === status).length;
  };

  // Function to handle row click and navigate to the details page
  const handleRowClick = (status: string) => {
    if (status === 'Unpaid') {
      router.push('http://localhost:3000/AdminService/Invoicelist/Invoiceunpaid');
    }
  };

  return (
    <div className="invoice-page">
      <Sidebar />
      <div className="invoice-content">
        <div className="invoice-header">
          <h1>Invoice Lists</h1>
        </div>
        <div className="invoice-tabs">
          <div className="invoice-tab1">
            <button className="tab-button" onClick={() => setFilter('all')}>
              All ({invoices.length})
            </button>
            <button className="tab-button" onClick={() => setFilter('paid')}>
              Paid ({getCountByStatus('paid')})
            </button>
            <button className="tab-button" onClick={() => setFilter('unpaid')}>
              Unpaid ({getCountByStatus('unpaid')})
            </button>
          </div>
          <div className="invoice-filters">
            <input type="text" className="search-input" placeholder="Search" />
          </div>
        </div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>INVOICE NUMBER #</th>
              <th>EMAIL</th>
              <th>SERVICE TYPE</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.invoice_id}
                onClick={() => handleRowClick(invoice.status)} // Add click handler to row
              >
                <td className="invoice-number">
                  <a href="#">{invoice.invoice_id}</a>
                </td>
                <td>{invoice.vendor_email}</td>
                <td>{invoice.service_type}</td>
                <td>{invoice.issued_date}</td>
                <td>{invoice.total} USD</td>
                <td className={getStatusClass(invoice.status)}>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
