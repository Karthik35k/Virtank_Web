import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className='privacy-policy'>
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: August 2025</p>
        </div>
        
        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              At Virtank, we collect information you provide directly to us, such as when you create an account, 
              place an order, or contact us for support. This may include:
            </p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Delivery address and billing information</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your food orders</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you order updates and delivery notifications</li>
              <li>Improve our services and develop new features</li>
              <li>Send you promotional offers and updates (with your consent)</li>
              <li>Ensure the security of our platform and prevent fraud</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your 
              information only in the following circumstances:
            </p>
            <ul>
              <li>With restaurant partners to fulfill your orders</li>
              <li>With delivery partners to complete deliveries</li>
              <li>With payment processors to process transactions</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure payment processing through certified partners</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our platform. 
              Cookies help us:
            </p>
            <ul>
              <li>Remember your preferences and login status</li>
              <li>Analyze how you use our services</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve our website performance and functionality</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences, though this may 
              affect some functionality of our services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and review your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of promotional communications</li>
              <li>Data portability (receive a copy of your data)</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to provide our services 
              and comply with legal obligations. Order history may be retained for accounting and 
              customer service purposes. You may request deletion of your account at any time.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If we become aware that we have 
              collected such information, we will take steps to delete it promptly.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices 
              or applicable laws. We will notify you of any material changes by posting the updated 
              policy on our website and updating the "Last updated" date.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong> <a href="mailto:virtankofficial@gmail.com">virtankofficial@gmail.com</a>
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> <a href="tel:+919989118386">+91-998-911-8386</a>
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 
                <a href="https://www.google.com/maps?q=5/69/23,+Lakshmipuram,+Guntur,+Andhra+Pradesh+522007" target="_blank" rel="noopener noreferrer">
                  5/69/23, Lakshmipuram, Guntur, Andhra Pradesh 522007
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
