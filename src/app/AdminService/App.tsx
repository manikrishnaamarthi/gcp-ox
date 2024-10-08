"use client";

import React from 'react';
import Sidebar from './Sidebar'; 
import Header from './Header';
import MainContent from './MainContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './Analytics';
import Application from './Application';
import Products from './Products';
import Vendors from './Vendors';
import Doctors from './Doctors';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-section">
          <Header />
          <Routes>
            <Route path="/overview" element={<MainContent />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/application" element={<Application />} />
            <Route path="/products" element={<Products />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
