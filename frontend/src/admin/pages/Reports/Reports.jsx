import React from 'react';
import './reports.css';

const Reports = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Reports</h2>
        <div className='section-actions'>
          <button className='btn ghost'>Download CSV</button>
        </div>
      </div>
      <div className='grid cols-2 reports-grid'>
        <div className='card'>
          <h3>Sales (This Week)</h3>
          <div className='muted'>Chart placeholder</div>
          <div className='metric'>₹24,300</div>
        </div>
        <div className='card'>
          <h3>Orders Trend</h3>
          <div className='muted'>Chart placeholder</div>
          <div className='metric'>+12%</div>
        </div>
      </div>
    </section>
  );
};

export default Reports;


