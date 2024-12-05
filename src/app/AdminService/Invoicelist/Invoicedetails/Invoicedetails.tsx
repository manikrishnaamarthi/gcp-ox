import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { MdOutlineFileDownload, MdKeyboardArrowDown } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import './Invoicedetails.css';

const Invoicedetails: React.FC = () => {
  return (
    <div className="invoice-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="invoice-content">
        {/* Header Section */}
        <div className="invoice-header">
          <div className="header-left">
            <h1>INV4257-09-011</h1>
            <p>2000 USD Paid at 25 Jan 2023</p>
          </div>
          <div className="header-right">
            <div className="status-box paid">Paid</div>
          </div>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Payment Details Section */}
        <div className="payment-details">
          <h2 className='payment-details3'>Payment Batch October 2024</h2>
          <div className="details-grid">
            <div>
              <p><strong>Name</strong>: Samir Singh</p>
              <p><strong>Email</strong>: SamirSingh@gmail.com</p>
              <p><strong>Mobile Number</strong>: 0987654321</p>
              <p><strong>Location</strong>: 0987654321</p>
              <p><strong>Clinic Name</strong>: 0987654321</p>
            </div>
            <div>
              <p><strong>Invoice Number</strong>: INV4257-09-011</p>
              <p><strong>Issued</strong>: 20 October 2024</p>
              <p><strong>Due Date</strong>: 30 October 2024</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Oxygen chamber</td>
              {/* <td>3</td> */}
              {/* <td>6,00,000 Rs</td> */}
              <td>18,00,000 Rs</td>
            </tr>
            <tr>
              <td> B.P. Monitor</td>
              {/* <td>8</td> */}
              {/* <td>1,500 Rs</td> */}
              <td>12,000 Rs</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={1}><strong>Total</strong></td>
              <td><strong>18,12,000 Rs</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Invoicedetails;
