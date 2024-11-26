import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from '../Sidebar/page';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Dashboard</h1>
          <div className={styles.actions}>
            <button className={styles.shareButton}>Share</button>
            <button className={styles.exportButton}>Export</button>
          </div>
        </div>

        {/* Revenue Cards */}
        <div className={styles.revenueCards}>
          <div className={`${styles.card} ${styles.activeCard}`}>
            <h2>Oxi Clinic</h2>
            <p>$9,027.01</p>
          </div>
          <div className={styles.card}>
            <h2>Oxi Wheel</h2>
            <p>$12,027.01</p>
          </div>
          <div className={styles.card}>
            <h2>Oxi Gym</h2>
            <p>$6,027.01</p>
          </div>
          <div className={`${styles.card} ${styles.totalCard}`}>
            <h2>Total Revenue</h2>
            <p>$28,027.01</p>
          </div>
        </div>

        {/* Performance Section */}
        <div className={styles.performanceSection}>
          <div className={styles.overallPerformance}>
            <h3>Overall Performance</h3>
            <div className={styles.performanceChart}>
              {/* Sample Chart Data */}
              <div className={`${styles.bar}`} style={{ height: "60%" }}></div>
              <div className={`${styles.bar}`} style={{ height: "80%" }}></div>
              <div className={`${styles.bar}`} style={{ height: "50%" }}></div>
              <div className={`${styles.bar}`} style={{ height: "90%" }}></div>
            </div>
          </div>

          <div className={styles.totalServices}>
            <h3>Total Services</h3>
            <ul>
              <li>
                Oxi Clinic: <span>55</span>
              </li>
              <li>
                Oxi Wheel: <span>84</span>
              </li>
              <li>
                Oxi Gym: <span>25</span>
              </li>
              <li>
                Total: <span>164</span>
              </li>
            </ul>
          </div>
        </div>

        {/* User Activity Section */}
        <div className={styles.userActivitySection}>
          <div className={styles.userActivityGraph}>
            <h3>User Activity</h3>
            <p>This Month</p>
            <div className={styles.graph}>
              {/* Placeholder for graph data */}
              <div className={styles.graphLine}>
                <span>Sep 3</span>
                <span>Sep 18</span>
                <span>Oct 3</span>
              </div>
            </div>
          </div>
          <div className={styles.userActivityStats}>
            <h3>User Activity</h3>
            <p>-10%</p>
            <div className={styles.statsDetails}>
              <p>
                43,345 Users <br />
                -10% vs last month
              </p>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
