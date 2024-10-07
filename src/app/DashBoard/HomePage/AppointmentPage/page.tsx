// src/app/DashBoard/HomePage/page.tsx
"use client";
import React from 'react';
import Appointment from './appointment';


const Page: React.FC = () => {
  return (
    <div className="page-container">
      <Appointment/>
    </div>
  );
};

export default Page;
