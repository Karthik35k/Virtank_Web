import React from 'react';
import './support.css';

const Support = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Support</h2>
      </div>
      <div className='table-wrap support-table'>
        <table className='data'>
          <thead><tr><th>ID</th><th>Subject</th><th>Priority</th><th>Status</th><th>Updated</th></tr></thead>
          <tbody>
            <tr><td>T-552</td><td>Refund request</td><td><span className='status warn'>High</span></td><td>Open</td><td>2h ago</td></tr>
            <tr><td>T-553</td><td>Late delivery</td><td><span className='status info'>Medium</span></td><td>In Progress</td><td>10m ago</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Support;


