import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './LoginPage.css';


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-split-root">
      <div className="login-split-top">
        <div className="login-split-logo-circle">
          <img src="/your-lightning-icon.svg" alt="logo" className="login-split-logo" />
        </div>
        <div className="login-split-title">SMART METERING SOLUTION</div>
      </div>
      <div className="login-split-bottom">
        <div className="login-split-form">
          <span className="login-split-heading">Enter Login Credentials</span>
          <Input
            placeholder="Email or Phone"
            className="login-split-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            style={{
              background: 'linear-gradient(90deg, #89D957 0%, #C9E265 100%)',
              color: '#062540',
              fontWeight: 600,
              fontSize: '1.18em',
              borderRadius: '1.9em',
              marginTop: '1.2em',
            }}
            type="submit"
          >
            Login
          </Button>

          <div className="login-split-forgot-wrap">
            <a href="#" className="login-split-forgot">Forgot password?</a>
          </div>
          <Button
            fullWidth
            style={{
              background: '#062540',
              color: '#fff',
              border: '1.5px solid #b5e142',
              fontWeight: 600,
              borderRadius: '1.9em',
              marginTop: '1.2em',
            }}
            type="button"
            onClick={() => navigate('/signup')}  // Add this line
          >
            Create an account
          </Button>
        </div>
      </div>
      
    </div>
    
  );
}
