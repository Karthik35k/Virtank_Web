import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../auth/AdminAuthContext';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('admin@virtank.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setError('Please agree to the terms to continue.');
      return;
    }
    const res = await login(email, password);
    if (res.ok) navigate(from, { replace: true });
    else setError(res.error || 'Login failed');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-head">
          <h2>Admin Login</h2>
          <p>Use your admin credentials to continue.</p>
        </div>
        <form onSubmit={onSubmit} className="admin-login-form">
          <label>
            <span>Email</span>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="admin@example.com" />
          </label>
          <label>
            <span>Password</span>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" />
          </label>
          <label className="admin-login-consent">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} aria-label="Agree to terms" />
            <span>
              By continuing, I agree to the <a href="/privacy-policy" target="_self">terms of use</a> & <a href="/privacy-policy" target="_self">privacy policy</a>.
            </span>
          </label>
          {error ? <div className="admin-login-error">{error}</div> : null}
          <button className="admin-login-btn" type="submit" disabled={!agree}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
