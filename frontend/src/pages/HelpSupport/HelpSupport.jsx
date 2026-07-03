import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HelpSupport.css';

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    helpType: '',
    fullName: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback! We will get back to you soon.');
  };
  return (
    <div className='help-support'>
      <div className="help-container">
        <div className="help-header">
          <h1>Help & Support</h1>
          <p>We're here to help you with any questions or issues</p>
        </div>
        
        <div className="help-content-wrapper">
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="helpType">
                  How can we help you? <span className="required">*</span>
                </label>
                <select
                  id="helpType"
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleInputChange}
                  required
                  className="form-select"
                >
                  <option value="">Select an option</option>
                  <option value="order-issue">Order Issue</option>
                  <option value="delivery-problem">Delivery Problem</option>
                  <option value="payment-issue">Payment Issue</option>
                  <option value="account-problem">Account Problem</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">
                  Mobile Number (optional)
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Type text <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  rows="6"
                  placeholder="Describe your issue or feedback in detail..."
                />
              </div>

              <button type="submit" className="submit-button">
                Submit feedback
              </button>
            </form>
          </div>

          <div className="info-cards-section">
            <div className="info-card emergency-card">
              <h3>Report a Safety Emergency</h3>
              <p>We are committed to the safety of everyone using Virtank. AI Safety Assistant and Report issues immediately.</p>
              <Link to="/emergency-report" className="card-link">
                Report here
              </Link>
            </div>

            <div className="info-card order-card">
              <h3>Issue with your live order?</h3>
              <p>Click on the 'Support' or 'Online ordering help' section in your app to connect to our customer support team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
