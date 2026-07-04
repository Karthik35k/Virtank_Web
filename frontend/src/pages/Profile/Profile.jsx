import React from 'react'
import './Profile.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='profile-page'>
      <div className='profile-card'>
        <img src={assets.profile_icon} alt='User Avatar' className='profile-avatar' />
        <h2 className='profile-name'>{user?.username || 'User'}</h2>
        <p className='profile-email'>{user?.email}</p>

        <div className='profile-actions'>
          <button className='profile-action' onClick={() => navigate('/profile/edit')}>Edit Profile</button>
          <a className='profile-action' href='/help-support'>Help & Support</a>
          <button className='logout-button' onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
