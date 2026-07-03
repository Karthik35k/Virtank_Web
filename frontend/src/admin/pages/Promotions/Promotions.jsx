import React from 'react';
import './promotions.css';

const Promotions = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Promotions</h2>
        <div className='section-actions'>
          <button className='btn'>Create Coupon</button>
        </div>
      </div>
      <div className='table-wrap promotions-table'>
        <table className='data'>
          <thead><tr><th>Code</th><th>Type</th><th>Discount</th><th>Valid Till</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td>DASARA</td><td>Percent</td><td>40%</td><td>04 OCT</td><td>215</td></tr>
            <tr><td>WEEKEND</td><td>Percent</td><td>10%</td><td>27 SEPT </td><td>98</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Promotions;


