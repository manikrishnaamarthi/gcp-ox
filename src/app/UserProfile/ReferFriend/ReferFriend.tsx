import React from 'react';
import './ReferFriend.css';

const ReferFriend: React.FC = () => {
  return (
    <div className="refer-friend-container">
      <button className="back-button">←</button>
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
