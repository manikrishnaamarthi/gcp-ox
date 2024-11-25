import React from "react";
import "./Inventory.css";
import Sidebar from '../Sidebar/page';

const Inventory = () => {
  return (
    <div className="inventory-container">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Recent Activity</h1>
          <input
            type="text"
            placeholder="Search "
            className="search-bar"
          />
        </header>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <p className="count">700</p>
            <p>Total</p>
            <span>NEW ITEMS</span>
          </div>
          <div className="card highlighted">
            
            <p className="count">4</p>
            <p>Vendors</p>
            <span>NEW MESSAGE</span>
          </div>
          <div className="card">
            <p className="count">1</p>
            <p>Vendor</p>
            <span>REFUNDS</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          {/* Inventory Table */}
          <section className="inventory-table">
            <table>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Product Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>BP Monitor</td>
                  <td>95</td>
                  <td>1,599 Rs</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Oxygen Chamber</td>
                  <td>38</td>
                  <td>6,26,500 Rs</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Oxygen Cylinder</td>
                  <td>87</td>
                  <td>2,000 Rs</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Syringe</td>
                  <td>55</td>
                  <td>100 Rs</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Surgical Mask</td>
                  <td>45</td>
                  <td>20 Rs</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Oxi Pulsemeter</td>
                  <td>25</td>
                  <td>559 Rs</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Sethascope</td>
                  <td>105</td>
                  <td>800 Rs</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Gloves</td>
                  <td>68</td>
                  <td>150 Rs</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Thermometer</td>
                  <td>123</td>
                  <td>1,000 Rs</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Threadmill</td>
                  <td>57</td>
                  <td>58,000 Rs</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Categories and Stock Numbers */}
          <div className="side-panel">
            {/* Item Categories */}
            <div className="categories">
              <h2>Item Categories List</h2>
              <button className="view-all">View All</button>
              <div className="icons-grid">
                <div className="icon">🩺</div>
                <div className="icon">💉</div>
                <div className="icon">🩹</div>
                <div className="icon">📟</div>
                <div className="icon">⚕️</div>
                <div className="icon">👕</div>
                <div className="icon">🌡️</div>
              </div>
              <button className="add-items">+ Add Items</button>
            </div>

            {/* Stock Numbers */}
            <div className="stock-numbers">
              <h2>Stock Numbers</h2>
              <p>Low Stock Items: <span className="highlight">12</span></p>
              <p>Item Categories: <span className="highlight">9</span></p>
              <p>Refunded Items: <span className="highlight">2</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
