import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './admin.css';
import { useAdminAuth } from './auth/AdminAuthContext';
import { assets } from '../assets/assets';
import { NavLink as Link } from 'react-router-dom';

const AdminLayout = () => {
  const { adminUser, logout } = useAdminAuth();
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="brand">Admin</div>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/catalog">Catalog</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/support">Support</NavLink>
          <NavLink to="/admin/emergency">Emergency</NavLink>
          <NavLink to="/admin/promotions">Promotions</NavLink>
          <NavLink to="/admin/content">Content</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
          <NavLink to="/admin/profile">Profile</NavLink>
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div />
          <div className="topbar-right">
            <span className="admin-user">{adminUser?.email}</span>
            <button className="admin-btn" onClick={logout}>Logout</button>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


