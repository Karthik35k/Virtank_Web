import React from 'react';
import './emergency.css';

const Emergency = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Emergency Reports</h2>
      </div>
      <div className='table-wrap emergency-table'>
        <table className='data'>
          <thead><tr><th>ID</th><th>Type</th><th>Employee</th><th>Problem</th><th>Status</th><th>Time</th></tr></thead>
          <tbody>
            <tr><td>ER-201</td><td>Food Safety</td><td>EMP-123 (Kiran)</td><td>Unhygienic packing</td><td><span className='status warn'>Open</span></td><td>2:45 PM</td></tr>
            <tr><td>ER-202</td><td>Harassment</td><td>EMP-105 (Meera)</td><td>Verbal abuse report</td><td><span className='status info'>Investigating</span></td><td>2:10 PM</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Emergency;


