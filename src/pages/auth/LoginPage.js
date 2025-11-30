import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanPhone = Number(phone.replace(/\D/g, '').slice(-10));
    console.log("🔥 Login attempt:", { phone: cleanPhone, hasPassword: !!password });

    try {
      const response = await fetch('https://viz-sm-be.onrender.com/api/account/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanPhone.toString(),  // ← STRING "9370770190"
          password: password,
          remember: true
        })

      });

      console.log("🔥 Backend status:", response.status);

      const data = response.ok ? await response.json() : {};
      
      console.log("🔥 Backend data:", data);

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate('/home');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error("🔥 Login error:", err);
      setError('Login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-split-root">
      <div className="login-split-top">
        <div className="login-split-logo-circle">
          <img src="/your-lightning-icon.svg" alt="logo" className="login-split-logo" />
        </div>
        <div className="login-split-title">SMART ENERGY SOLUTIONS</div>
      </div>
      <div className="login-split-bottom">
        <div className="login-split-form">
          <span className="login-split-heading">Enter Login Credentials</span>
          
          {error && <p className="error-text" style={{color: '#ff4444', margin: '10px 0'}}>{error}</p>}
          
          <Input
            placeholder="Phone"
            className="login-split-input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            className="login-split-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            disabled={isLoading || !phone || !password}
            style={{
              background: 'linear-gradient(90deg, #89D957 0%, #C9E265 100%)',
              color: '#062540',
              fontWeight: 600,
              fontSize: '1.18em',
              borderRadius: '1.9em',
              marginTop: '1.2em',
            }}
            type="button"
            onClick={handleLogin}  // ← FIXED: onClick + handleLogin
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="login-forgot">
            <a href="#" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </p>

          <Button
            fullWidth
            style={{
              background: '#062540',
              color: '#b5e142',
              border: '1.5px solid #b5e142',
              fontWeight: 600,
              borderRadius: '1.9em',
              marginTop: '1.2em',
            }}
            type="button"
            onClick={() => navigate('/signup')}
          >
            Create an account
          </Button>
          <div className="login-made-title">Made with ❤️ by</div>
          <div className="login-company-title">Vjra Technologies</div>
        </div>
      </div>
    </div>
  );
}
