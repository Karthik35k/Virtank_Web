import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import API from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './LoginPopup.css'

const LoginPopup = ({ setShowLogin }) => {
  const { login } = useAuth()
  const [currentState, setCurrentState] = useState('Login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agree) {
      setError('Please agree to the terms to continue.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const endpoint = currentState === 'Login' ? '/auth/login' : '/auth/register'
      const payload =
        currentState === 'Login'
          ? { email: formData.email, password: formData.password }
          : formData

      const res = await API.post(endpoint, payload)

      if (res.data.role === 'admin') {
        setError('Please use the admin login page for admin accounts.')
        localStorage.removeItem('token')
        return
      }

      login(res.data)
      setShowLogin(false)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (currentState === 'Login' ? 'Invalid credentials' : 'Registration failed')
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={handleSubmit} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='Close'
          />
        </div>

        <div className='login-popup-inputs'>
          {currentState === 'Sign Up' && (
            <input
              type='text'
              name='username'
              placeholder='Your name'
              onChange={handleChange}
              required
            />
          )}
          <input
            type='email'
            name='email'
            placeholder='Your email'
            onChange={handleChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </div>

        <div className='login-popup-condition'>
          <input
            type='checkbox'
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {error && <p className='error-text'>{error}</p>}

        <button type='submit' disabled={loading || !agree}>
          {loading
            ? currentState === 'Login'
              ? 'Logging in...'
              : 'Creating account...'
            : currentState === 'Login'
              ? 'Login'
              : 'Create account'}
        </button>

        {currentState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => { setCurrentState('Sign Up'); setError('') }}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => { setCurrentState('Login'); setError('') }}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
