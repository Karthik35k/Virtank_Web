import React from 'react';
import './users.css';

const Users = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Users</h2>
        <div className='section-actions'>
          <button className='btn ghost'>Export</button>
        </div>
      </div>
      <div className='table-wrap users-table'>
        <table className='data'>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>CU-1001</td><td>Rahul</td><td>rahul@example.com</td><td><span className='status success'>Active</span></td><td><button className='btn secondary'>View</button></td></tr>
            <tr><td>CU-1002</td><td>Priya</td><td>priya@example.com</td><td><span className='status warn'>Blocked</span></td><td><button className='btn secondary'>View</button></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;


