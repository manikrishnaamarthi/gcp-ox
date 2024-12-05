import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import { MdOutlineFileDownload, MdKeyboardArrowDown } from 'react-icons/md';
import { TiArrowUnsorted } from 'react-icons/ti';
import './Invoicelist.css';

const InvoiceList: React.FC = () => {
  const invoices = [
    { number: 'INV0938-09-001', email: 'Sam45@gmail.com', subject: 'Clinic', date: '16/10/2024', amount: 2000, status: 'Paid' },
    { number: 'INV0938-09-002', email: 'Sam45@gmail.com', subject: 'Wheel', date: '15/10/2024', amount: 2500, status: 'Unpaid' },
    { number: 'INV0938-09-003', email: 'Sam45@gmail.com', subject: 'Wheel', date: '13/10/2024', amount: 1000, status: 'Paid' },
    { number: 'INV0938-09-004', email: 'Sam45@gmail.com', subject: 'Clinic', date: '12/10/2024', amount: 1500, status: 'Unpaid' },
    { number: 'INV0938-09-005', email: 'Sam45@gmail.com', subject: 'Wheel', date: '12/10/2024', amount: 2000, status: 'In Process' },
  ];

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

  return (
    <div className="invoice-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="invoice-content">
        {/* Header */}
        <div className="invoice-header">
          <h1>Invoice Lists</h1>
        </div>

        {/* Tabs */}
        <div className="invoice-tabs">
          <div className="invoice-tab1">
          <button className="tab-button">All 200</button>
          <button className="tab-button">Paid 160</button>
          <button className="tab-button">Unpaid 20</button>
          </div>
          <div className="invoice-filters">
            <input type="text" className="search-input" placeholder="Search" />
  
          </div>
        </div>

        {/* Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>INVOICE NUMBER #</th>
              <th>
                EMAIL
              </th>
              <th>SERVICE TYPE</th>
              <th>DATE</th>
              <th>
                AMOUNT 
              </th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="invoice-number">
                  <a href="#">{invoice.number}</a>
                </td>
                <td>{invoice.email}</td>
                <td>{invoice.subject}</td>
                <td>{invoice.date}</td>
                <td>{invoice.amount} USD</td>
                <td className={getStatusClass(invoice.status)}>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Load More */}
        <div className="load-more">

        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
