"use client";
import React, { use } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5'; // Import the icon
import './ReferFriend.css';
import { useRouter } from 'next/navigation';

const ReferFriend: React.FC = () => {
  const Router =useRouter()
  return (
    <div className="refer-friend-container">
      <button className="back-button">
        <div className="icon-circle"> {/* Circle wrapper for the icon */}
          <IoChevronBackSharp onClick={() => Router.back()} />
        </div>
      </button>
      <div className="refer-friend-content">
        <div className="icon-wrapper">
          <img src="/images/refer.png" alt="Refer Icon" className="refer-icon" />
        </div>
        <h2>Share with friends</h2>
        <p>Refer to your friend and get</p>
        <p className="highlight">Get a cash reward of $5</p>
        <button className="share-now-btn">Share Now</button>
      </div>
    </div>
  );
};

export default ReferFriend;
