import React from 'react';
import './Footer.css';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Footer = () => {
  const location = useLocation();

  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <img src={assets.logo} alt="Logo" className="footer-logo" />
                <p>Fresh meals, fast delivery. We connect you with your favorite restaurants and local kitchens, bringing delicious food right to your doorstep. Safe, quick, and reliable – because great food deserves great service.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                </div> 
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>
                      <Link 
                        to='/' 
                        className={location.pathname === '/' ? "active" : ""}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/about' 
                        className={location.pathname === '/about' ? "active" : ""}
                      >
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/delivery' 
                        className={location.pathname === '/delivery' ? "active" : ""}
                      >
                        Delivery
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/privacy-policy' 
                        className={location.pathname === '/privacy-policy' ? "active" : ""}
                      >
                        Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to='/help-support' 
                        className={location.pathname === '/help-support' ? "active" : ""}
                      >
                        Help & Support
                      </Link>
                    </li>
                </ul>
            </div>
            <div className="footer-content-right">
    <h2>GET IN TOUCH</h2>
    <ul>
        <li>
            <a href="https://www.google.com/maps?q=5/69/23,+Lakshmipuram,+Guntur,+Andhra+Pradesh+522007" target="_blank" rel="noopener noreferrer">
                5/69/23, Lakshmipuram, Guntur, Andhra Pradesh 522007
            </a>
        </li>
        <li>
            <a href="tel:+919989118386">
                +91-998-911-8386
            </a>
        </li>
        <li>
            <a href="mailto:vitranofficial@gmail.com">
                virtankofficial@gmail.com
            </a>
        </li>
    </ul>
</div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 ©Virtank.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;