import React from 'react';
import './settings.css';

const Settings = () => {
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Settings</h2>
        <div className='section-actions'>
          <button className='btn'>Save</button>
        </div>
      </div>
      <div className='grid cols-2 settings-grid'>
        <div className='card'>
          <h3>Platform</h3>
          <div className='muted'>Fees and taxes</div>
          <div style={{ display:'grid', gap:8 }}>
            <label>Delivery Fee <input type='number' defaultValue={30} /></label>
            <label>GST % <input type='number' defaultValue={5} /></label>
          </div>
        </div>
        <div className='card'>
          <h3>Notifications</h3>
          <label><input type='checkbox' defaultChecked /> Email alerts</label>
          <label><input type='checkbox' /> SMS alerts</label>
        </div>
      </div>
    </section>
  );
};

export default Settings;


