import React from 'react';
import './applicationUnderReview.css';

const ApplicationUnderReview: React.FC = () => {
  return (
    <div className="application-under-review">
      <img src="/images/review.png" alt="Application Under Review" className="review-image" />
      <p className="review-text">Your application is under review.</p>
      <p className="review-text-below">Approval is in progress.</p>
    </div>
  );
};

export default ApplicationUnderReview;
