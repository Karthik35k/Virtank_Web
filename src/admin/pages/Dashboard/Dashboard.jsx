import React from 'react';
import './dashboard.css';

const Dashboard = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Dashboard</h2>
        <div className='section-actions'>
          <button className='btn ghost'>Refresh</button>
        </div>
      </div>
      <div className='dashboard-metrics cards'>
        <div className='card'>
          <div className='muted'>Today Sales</div>
          <div className='metric'>₹1840</div>
        </div>
        <div className='card'>
          <div className='muted'>Orders</div>
          <div className='metric'>21</div>
        </div>
        <div className='card'>
          <div className='muted'>Avg. ETA</div>
          <div className='metric'>13m</div>
        </div>
        <div className='card'>
          <div className='muted'>Pending Tickets</div>
          <div className='metric'>5</div>
        </div>
      </div>
      <div className='grid cols-2'>
        <div className='card dashboard-table'>
          <h3>Recent Orders</h3>
          <div className='table-wrap'>
            <table className='data'>
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>#784213</td><td>Ram</td><td>₹420</td><td><span className='status success'>Delivered</span></td></tr>
                <tr><td>#784214</td><td>Sita</td><td>₹350</td><td><span className='status info'>On the way</span></td></tr>
                <tr><td>#784215</td><td>Arjun</td><td>₹610</td><td><span className='status warn'>Preparing</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='card dashboard-activity'>
          <h3>Activity</h3>
          <ul>
            <li className='muted'>2:30 PM • Coupon VIRT10 applied on order #784220</li>
            <li className='muted'>1:55 PM • Ticket #552 escalated</li>
            <li className='muted'>1:20 PM • New item added “Paneer Bowl”</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;


