import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';

const About = () => {
  return (
    <div className='about'>
      <div className="about-container">
        <div className="about-header">
          <h1>About Virtank</h1>
          <p>Your trusted partner in food delivery</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded with a passion for great food and exceptional service, Virtank has been connecting 
                food lovers with their favorite restaurants and local kitchens since our inception. We believe 
                that everyone deserves access to delicious, fresh meals delivered right to their doorstep.
              </p>
              <p>
                Our mission is simple: to make food ordering and delivery seamless, safe, and reliable. 
                Whether you're craving comfort food, exploring new cuisines, or need a quick meal during 
                a busy day, we're here to serve you.
              </p>
            </div>
            <div className="about-image">
              <img src={assets.about} alt="About us" />
            </div>
          </div>

          <div className="about-section reverse">
            <div className="about-text">
              <h2>What We Offer</h2>
              <ul>
                <li>Wide selection of restaurants and cuisines</li>
                <li>Fast and reliable delivery service</li>
                <li>Safe and secure payment options</li>
                <li>Real-time order tracking</li>
                <li>24/7 customer support</li>
                <li>Fresh, quality food guaranteed</li>
              </ul>
            </div>
            <div className="about-image">
              <img src={assets.offer} alt="Our services" />
            </div>
          </div>

          <div className="about-section values-section">
            <div className="about-text">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <h3>Quality</h3>
                  <p>We partner only with the best restaurants to ensure you get the highest quality food.</p>
                </div>
                <div className="value-item">
                  <h3>Speed</h3>
                  <p>Our efficient delivery network ensures your food arrives hot and fresh food.</p>
                </div>
                <div className="value-item">
                  <h3>Trust</h3>
                  <p>Transparent pricing, secure payments, and reliable service you can count on.</p>
                </div>
                <div className="value-item">
                  <h3>Community</h3>
                  <p>Supporting local restaurants and building stronger food communities together.</p>
                </div>
                <div className="value-item">
                  <h3>Service</h3>
                  <p>Dedicated customer service team committed to ensuring your complete satisfaction with every order.</p>
                </div>
                <div className="value-item">
                  <h3>Time</h3>
                  <p>We respect your time with efficient ordering systems and prompt delivery services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
