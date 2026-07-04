import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const UserGuard = ({ children }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className='profile-page'>Loading...</div>
  }

  if (!isAuthenticated || isAdmin) {
    return <Navigate to='/' replace state={{ from: location }} />
  }

  return children
}

export default UserGuard
