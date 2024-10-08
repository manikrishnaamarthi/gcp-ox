import React from "react";
import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      {/* First Row: Oxivive Clinic, Oxivive Wheel, Oxivive Gym */}
      <div className="cards-row">
        <div className="card clinic-card">
          <h3 className="card-title red-text">Oxivive Clinic</h3>
          <div className="card-value">
            <span className="dollar">$ 12,474.08 </span>
            <span className="green-text">+10%</span>
          </div>
        </div>
        <div className="card wheel-card">
          <h3 className="card-title red-text">Oxivive Wheel</h3>
          <div className="card-value">
            <span className="dollar">$ 10,566.01 </span>
            <span className="green-text">+15%</span>
          </div>
        </div>
        <div className="card gym-card">
          <h3 className="card-title red-text">Oxivive Gym</h3>
          <div className="card-value">
            <span className="dollar">$ 598.08 </span>
            <span className="green-text">+5%</span>
          </div>
        </div>
      </div>

      {/* Second Row: Oxiclinic Overall Revenue and User Activity */}
      <div className="second-row">
        {/* Oxiclinic Overall Revenue */}
        <div className="oxiclinic-overall-revenue">
          <div className="header-section">
            <h3 className="red-text">Oxiclinic</h3>
            <select className="dropdown calendar-dropdown">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="red-text"><h5>Overall Revenue</h5></div>
          <div className="user-activity-value dollar">
            $ 48,574.21 <span className="green-text">+20%</span>
          </div>
          <div className="graph-area">
            <img src="/images/irregular_graph.png" alt="Graph" className="graph-img" />
          </div>
        </div>

        {/* User Activity */}
        <div className="user-activity">
          <div className="user-activity-header">
            <h3 className="red-text">User Activity</h3>
            <select className="dropdown calendar-dropdown">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="user-activity-value dollar">
            $ 10,320 <span className="red-text">-20%</span>
          </div>
          <div className="graph-area">
            <img src="/images/bar_graph.png" alt="Graph" className="graph-img" />
          </div>
        </div>
      </div>

      {/* Third Row: Best Selling and Transaction History */}
      <div className="third-row">
        {/* Best Selling Section */}
        <div className="best-selling">
          <div className="best-selling-header">
            <h3>Best Selling</h3>
            <select className="dropdown calendar-dropdown">
              <option>Dec 20 - Dec 31</option>
            </select>
          </div>
          <div className="best-selling-columns">
            <span></span>
            <span>Product Name</span>
            <span>Brand</span>
            <span>Stock</span>
            <span>Sales</span>
            <span>Price</span>
            <span>Revenue</span>
            <span></span>
          </div>
          <div className="product-list">
            <div className="product-row">
              <div className="circle"></div>
              <div className="product-name">
                <img src="/images/iphone11pro.png" alt="11 Pro" className="product-img" />
                <div className="product-details">
                  <p>iPhone 11 Pro</p>
                </div>
              </div>
              <div className="product-brand">Apple</div>
              <div className="product-stock">32</div>
              <div className="product-sales">230</div>
              <div className="product-price">$1,098</div>
              <div className="product-revenue">$25,254.00</div>
            </div>
          </div>
          <div className="product-list">
            <div className="product-row">
              <div className="circle"></div>
              <div className="product-name">
                <img src="/images/iphone11pro.png" alt="11 Pro" className="product-img" />
                <div className="product-details">
                  <p>iPhone 11 Pro</p>
                </div>
              </div>
              <div className="product-brand">Apple</div>
              <div className="product-stock">32</div>
              <div className="product-sales">230</div>
              <div className="product-price">$1,098</div>
              <div className="product-revenue">$25,254.00</div>
          </div>
            {/* Add more product rows as needed */}
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="transaction-history">
          <div className="transaction-history-header">
            <h3>Transaction History</h3>
          </div>
          <div className="transaction-list">
            {/* First Row: Payment Success */}
            <div className="transaction-row">
              <div className="transaction-details">
                <div className="transaction-text">Payment from #0199</div>
                <div className="transaction-date">Dec 23, 04:00 PM</div>
              </div>
              <div>
                <span className="transaction-icon success"></span>
                <span className="transaction-amount">$421</span>
              </div>
            </div>

            {/* Second Row: Payment Pending */}
            <div className="transaction-row">
              <div className="transaction-details">
                <div className="transaction-text">Payment from #0199</div>
                <div className="transaction-date">Dec 23, 04:00 PM</div>
              </div>
              <div>
                <span className="transaction-icon pending"></span>
                <span className="transaction-amount">$421</span>
              </div>
            </div>

            {/* Third Row: Payment Cancelled */}
            <div className="transaction-row">
              <div className="transaction-details">
                <div className="transaction-text">Payment from #0199</div>
                <div className="transaction-date">Dec 23, 04:00 PM</div>
              </div>
              <div>
                <span className="transaction-icon failure"></span>
                <span className="transaction-amount">$421</span>
              </div>
            {/* Add more transactions if needed */}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MainContent;
