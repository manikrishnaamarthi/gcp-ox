import React from 'react';
import './applicationNotApproved.css';

const ApplicationNotApproved: React.FC = () => {
  return (
    <div className="not-approved-container">
      <img src="/images/notverify.png" alt="Not Approved" className="not-approved-image" />
      <div className="not-approved-text">
        "Unfortunately, your Application
        <p className='below-text'>was not approved".</p>
      </div>
    </div>
  );
};

export default ApplicationNotApproved;
