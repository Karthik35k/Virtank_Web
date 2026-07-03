import React from 'react'
import './RoleSelect.css'

const RoleSelect = ({ onClose, onSelectUser, onSelectAdmin }) => {
  return (
    <div className='login-popup'>
      <div className='role-select-container'>
        <div className='login-popup-title'>
          <h2>Select Role</h2>
          <span className='role-close' onClick={onClose}>×</span>
        </div>
        <div className='role-actions'>
          <button className='role-btn' onClick={onSelectUser}>I'm a User</button>
          <button className='role-btn' onClick={onSelectAdmin}>I'm an Admin</button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelect


