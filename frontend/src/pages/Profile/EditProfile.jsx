import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, updateUser } = useAuth();

  // User data state
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    profilePicture: null,
    profilePictureUrl: assets.profile_icon
  });

  // Form states
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // OTP states
  const [showEmailOTP, setShowEmailOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  // Error states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');
  const successTimeoutRef = useRef(null);
  const usernameSuccessTimeoutRef = useRef(null);

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(userData.profilePictureUrl);

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profilePicture: 'Image size should be less than 5MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, profilePicture: 'Please select a valid image file' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setErrors({ ...errors, profilePicture: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle send OTP for email change
  const handleSendOTP = async () => {
    if (!newEmail || newEmail === userData.email) {
      setErrors({ ...errors, newEmail: 'Please enter a different email address' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setErrors({ ...errors, newEmail: 'Please enter a valid email address' });
      return;
    }

    try {
      // Simulate API call to send OTP
      // In real implementation: await fetch('/api/auth/send-email-otp', { method: 'POST', body: JSON.stringify({ email: userData.email }) })
      setOtpSent(true);
      setShowEmailOTP(true);
      setOtpTimer(300); // 5 minutes in seconds
      setErrors({ ...errors, newEmail: '', otp: '' });
      
      // Clear any existing success message timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      setSuccessMessage('OTP sent to your registered email address');
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage('');
        successTimeoutRef.current = null;
      }, 4000);

      // Start countdown timer
      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setErrors({ ...errors, newEmail: 'Failed to send OTP. Please try again.' });
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      // Simulate API call to verify OTP
      // In real implementation: await fetch('/api/auth/verify-email-otp', { method: 'POST', body: JSON.stringify({ otp, email: userData.email }) })
      
      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6) {
        setOtpError('');
        setShowEmailOTP(false);
        setUserData({ ...userData, email: newEmail });
        setEmail(newEmail);
        setNewEmail('');
        setOtp('');
        setOtpSent(false);
        
        // Clear any existing success message timeout
        if (successTimeoutRef.current) {
          clearTimeout(successTimeoutRef.current);
        }
        setSuccessMessage('Email updated successfully!');
        successTimeoutRef.current = setTimeout(() => {
          setSuccessMessage('');
          successTimeoutRef.current = null;
        }, 4000);
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setOtpError('OTP verification failed. Please try again.');
    }
  };

  // Handle username update
  const handleUpdateUsername = async () => {
    if (!username.trim()) {
      setErrors({ ...errors, username: 'Username cannot be empty' });
      return;
    }

    // Clear any existing username success message timeout
    if (usernameSuccessTimeoutRef.current) {
      clearTimeout(usernameSuccessTimeoutRef.current);
    }

    try {
      const res = await API.put('/auth/profile', { username: username.trim() });
      setUserData({ ...userData, username: res.data.username });
      updateUser(res.data);
      setErrors({ ...errors, username: '' });
      setUsernameSuccess('Username updated successfully!');
      
      // Clear success message after 4 seconds
      usernameSuccessTimeoutRef.current = setTimeout(() => {
        setUsernameSuccess('');
        usernameSuccessTimeoutRef.current = null;
      }, 4000);
    } catch (error) {
      setErrors({
        ...errors,
        username: error.response?.data?.message || 'Failed to update username. Please try again.',
      });
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    try {
      await API.put('/auth/password', { currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({ ...errors, currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Clear any existing success message timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      setSuccessMessage('Password changed successfully!');
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage('');
        successTimeoutRef.current = null;
      }, 4000);
    } catch (error) {
      setErrors({
        ...errors,
        currentPassword: error.response?.data?.message || 'Current password is incorrect',
      });
    }
  };

  // Handle save profile picture
  const handleSaveProfilePicture = async () => {
    try {
      // Simulate API call
      // const formData = new FormData();
      // formData.append('profilePicture', fileInputRef.current.files[0]);
      // await fetch('/api/user/update-profile-picture', { method: 'PUT', body: formData })
      setUserData({ ...userData, profilePictureUrl: profilePicture });
      setErrors({ ...errors, profilePicture: '' });
      
      // Clear any existing success message timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      setSuccessMessage('Profile picture updated successfully!');
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage('');
        successTimeoutRef.current = null;
      }, 4000);
    } catch (error) {
      setErrors({ ...errors, profilePicture: 'Failed to update profile picture. Please try again.' });
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='edit-profile-page'>
      <div className='edit-profile-container'>
        <div className='edit-profile-header'>
          <button className='back-button' onClick={() => navigate('/profile')}>
            ← Back to Profile
          </button>
          <h1>Edit Profile</h1>
        </div>

        {successMessage && (
          <div className='success-message'>
            <span className='success-icon'>✓</span>
            {successMessage}
          </div>
        )}

        {/* Profile Picture Section */}
        <div className='profile-section'>
          <div className='section-header'>
            <h2>Profile Picture</h2>
          </div>
          <div className='profile-picture-section'>
            <div className='profile-picture-preview'>
              <img src={profilePicture} alt='Profile' className='profile-preview-img' />
              <button
                className='change-picture-btn'
                onClick={() => fileInputRef.current?.click()}
              >
                <span className='camera-icon'></span>
                Change Picture
              </button>
            </div>
            <input
              type='file'
              ref={fileInputRef}
              accept='image/*'
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
            />
            {errors.profilePicture && (
              <p className='error-text'>{errors.profilePicture}</p>
            )}
            <button
              className='save-btn'
              onClick={handleSaveProfilePicture}
              disabled={profilePicture === userData.profilePictureUrl}
            >
              Save Picture
            </button>
          </div>
        </div>

        {/* Username Section */}
        <div className='profile-section'>
          <div className='section-header'>
            <h2>Username</h2>
          </div>
          <div className='form-group'>
            <label>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: '' });
              }}
              placeholder='Enter your username'
            />
            {errors.username && <p className='error-text'>{errors.username}</p>}
            <button
              className='update-btn'
              onClick={handleUpdateUsername}
              disabled={username === userData.username}
            >
              Update Username
            </button>
            {usernameSuccess && (
              <p className='success-text'>
                ✓ {usernameSuccess}
              </p>
            )}
          </div>
        </div>

        {/* Email Section */}
        <div className='profile-section'>
          <div className='section-header'>
            <h2>Email Address</h2>
            <p className='section-subtitle'>Current email: {userData.email}</p>
          </div>
          {!showEmailOTP ? (
            <div className='form-group'>
              <label>New Email Address</label>
              <div className='email-input-group'>
                <input
                  type='email'
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    setErrors({ ...errors, newEmail: '' });
                  }}
                  placeholder='Enter new email address'
                />
                <button className='send-otp-btn' onClick={handleSendOTP}>
                  Send OTP
                </button>
              </div>
              {errors.newEmail && <p className='error-text'>{errors.newEmail}</p>}
              <p className='info-text'>
                An OTP will be sent to your registered email ({userData.email}) for verification
              </p>
            </div>
          ) : (
            <div className='otp-verification-section'>
              <div className='otp-header'>
                <h3>Verify OTP</h3>
                {otpTimer > 0 && (
                  <p className='otp-timer'>Time remaining: {formatTimer(otpTimer)}</p>
                )}
              </div>
              <p className='info-text'>
                Enter the 6-digit OTP sent to <strong>{userData.email}</strong>
              </p>
              <div className='otp-input-group'>
                <input
                  type='text'
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    setOtpError('');
                  }}
                  placeholder='Enter 6-digit OTP'
                  maxLength={6}
                  className='otp-input'
                />
                <button className='verify-otp-btn' onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              </div>
              {otpError && <p className='error-text'>{otpError}</p>}
              <button
                className='cancel-otp-btn'
                onClick={() => {
                  setShowEmailOTP(false);
                  setOtp('');
                  setOtpError('');
                  setOtpSent(false);
                  setOtpTimer(0);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className='profile-section'>
          <div className='section-header'>
            <h2>Change Password</h2>
          </div>
          <div className='form-group'>
            <label>Current Password</label>
            <input
              type='password'
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setErrors({ ...errors, currentPassword: '' });
              }}
              placeholder='Enter current password'
            />
            {errors.currentPassword && <p className='error-text'>{errors.currentPassword}</p>}
          </div>
          <div className='form-group'>
            <label>New Password</label>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors({ ...errors, newPassword: '' });
              }}
              placeholder='Enter new password'
            />
            {errors.newPassword && <p className='error-text'>{errors.newPassword}</p>}
          </div>
          <div className='form-group'>
            <label>Confirm New Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({ ...errors, confirmPassword: '' });
              }}
              placeholder='Confirm new password'
            />
            {errors.confirmPassword && <p className='error-text'>{errors.confirmPassword}</p>}
            <button className='change-password-btn' onClick={handleChangePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

