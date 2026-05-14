import React from 'react';
import '../../admin.css';
import './profile.css';
import { useAdminAuth } from '../../auth/AdminAuthContext';

const AdminProfile = () => {
  const { adminUser } = useAdminAuth();
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Admin Profile</h2>
      </div>
      <div className='admin-profile'>
        <div className='profile-row'>
          <span>Name</span>
          <strong>{adminUser?.name || 'Admin'}</strong>
        </div>
        <div className='profile-row'>
          <span>Email</span>
          <strong>{adminUser?.email || 'admin@example.com'}</strong>
        </div>
        <div className='profile-row'>
          <span>Role</span>
          <strong>Administrator</strong>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;


