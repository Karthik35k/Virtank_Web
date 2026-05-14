import React, { useState } from 'react';
import './EmergencyReport.css';

const EmergencyReport = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I\'m your AI assistant. How can I help you with your emergency report?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportForm, setReportForm] = useState({
    employeeId: '',
    employeeName: '',
    problem: ''
  });
  const [submittedReport, setSubmittedReport] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'ai',
        message: 'Thank you for your report. Our safety team has been notified. A representative will contact you shortly. For immediate assistance, please call our emergency line at +91-998-911-8386.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const emergencyContacts = [
    {
      title: "Emergency Hotline",
      number: "+91-998-911-8386",
      description: "24/7 emergency support",
      icon: "🚨"
    },
    {
      title: "Safety Team",
      number: "+91-998-911-8387",
      description: "Safety incident reporting",
      icon: "🛡️"
    },
    {
      title: "Legal Support",
      number: "+91-998-911-8388",
      description: "Legal and compliance issues",
      icon: "⚖️"
    }
  ];

  const handleQuickActionClick = (type) => {
    setReportType(type);
    setIsReportFormOpen(true);
    setSubmittedReport(null);
    setReportForm({ employeeId: '', employeeName: '', problem: '' });
  };

  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportForm.employeeId.trim() || !reportForm.employeeName.trim() || !reportForm.problem.trim()) return;

    const payload = {
      type: reportType,
      ...reportForm,
      timestamp: new Date().toLocaleString()
    };

    setSubmittedReport(payload);
    setIsReportFormOpen(false);

    // Optional: also reflect in chat
    const aiResponse = {
      id: chatMessages.length + 1,
      type: 'ai',
      message: `Report submitted successfully for ${payload.employeeName} (ID: ${payload.employeeId}) regarding: ${payload.problem}`,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, aiResponse]);
  };

  const handleCancelReport = () => {
    setIsReportFormOpen(false);
  };

  const quickActions = [
    {
      title: "Report Food Safety Issue",
      description: "Report issues with food quality, hygiene, or safety",
      action: "Report Food Issue"
    },
    {
      title: "Report Delivery Safety",
      description: "Report unsafe delivery practices or incidents",
      action: "Report Delivery Issue"
    },
    {
      title: "Report Harassment",
      description: "Report any form of harassment or inappropriate behavior",
      action: "Report Harassment"
    },
    {
      title: "Report Fraud",
      description: "Report suspicious activities or fraudulent transactions",
      action: "Report Fraud"
    }
  ];

  return (
    <div className='emergency-report'>
      <div className="emergency-container">
        <div className="emergency-header">
          <h1>🚨 Emergency Report Center</h1>
          <p>Your safety is our top priority. Report any emergency or safety concerns immediately.</p>
        </div>
        
        <div className="emergency-content">
          <div className="contact-section">
            <div className="contact-header">
              <h2>Emergency Contacts</h2>
              <p>For immediate assistance, contact our emergency team:</p>
            </div>
            
            <div className="emergency-contacts">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-info">
                    <h3>{contact.title}</h3>
                    <p>{contact.description}</p>
                    <a href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`} className="contact-number">
                      {contact.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-chat-section">
            <div className="chat-header">
              <h2>🤖 AI Safety Assistant</h2>
              <p>Get instant help with our AI assistant or connect with a human representative</p>
            </div>
            
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    <div className="message-content">
                      <p>{msg.message}</p>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message ai typing">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Describe your emergency or safety concern..."
                  className="chat-input"
                />
                <button type="submit" className="send-button">
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="quick-actions-section">
            <h2>Quick Actions</h2>
            <p>Report specific types of safety issues:</p>

            {isReportFormOpen && (
              <div className="report-form-wrapper">
                <h3>{reportType}</h3>
                <form onSubmit={handleReportSubmit} className="report-form">
                  <div className="form-row">
                    <label htmlFor="employeeId">Employee ID</label>
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      value={reportForm.employeeId}
                      onChange={handleReportInputChange}
                      placeholder="Enter employee ID"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="employeeName">Employee Name</label>
                    <input
                      id="employeeName"
                      name="employeeName"
                      type="text"
                      value={reportForm.employeeName}
                      onChange={handleReportInputChange}
                      placeholder="Enter employee name"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="problem">Problem</label>
                    <textarea
                      id="problem"
                      name="problem"
                      rows="4"
                      value={reportForm.problem}
                      onChange={handleReportInputChange}
                      placeholder="Describe the problem"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={handleCancelReport} className="action-button cancel">
                      Cancel
                    </button>
                    <button type="submit" className="action-button submit">
                      Submit Report
                    </button>
                  </div>
                </form>
              </div>
            )}

            {submittedReport && !isReportFormOpen && (
              <div className="report-success">
                <h3>Submitted Successfully ✅</h3>
                <div className="success-details">
                  <p><strong>Type:</strong> {submittedReport.type}</p>
                  <p><strong>Employee ID:</strong> {submittedReport.employeeId}</p>
                  <p><strong>Name:</strong> {submittedReport.employeeName}</p>
                  <p><strong>Problem:</strong> {submittedReport.problem}</p>
                  <span className="message-time">{submittedReport.timestamp}</span>
                </div>
              </div>
            )}

            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <div key={index} className="quick-action-card">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <button className="action-button" onClick={() => handleQuickActionClick(action.title)}>
                    {action.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyReport;
