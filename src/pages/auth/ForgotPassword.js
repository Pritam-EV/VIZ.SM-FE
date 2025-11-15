import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleBack = () => {
    navigate('/login');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setError('');
  };

  const handleSendOTP = (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    console.log('Sending OTP to:', phone);
    setSuccess('OTP sent successfully!');
    setError('');

    // TODO: Call your API to send OTP
    // If successful, navigate to reset password page:
    setTimeout(() => {
      navigate('/reset-password', { state: { phone: '+91 ' + phone } });
    }, 1500);
  };

  return (
    <div className="forgot-password-root">
      {/* ============ TOP SECTION ============ */}
      <div className="forgot-password-top">
        <div className="forgot-password-icon">
          <i className="fas fa-lock"></i>
        </div>
        <h1 className="forgot-password-title">Forgot<br />Password?</h1>
        <p className="forgot-password-subtitle">
          No worries, verify OTP sent<br />on phone number then set<br />new password
        </p>
      </div>

      {/* ============ BOTTOM SECTION ============ */}
      <div className="forgot-password-bottom">
        <form className="forgot-password-form" onSubmit={handleSendOTP}>
          {/* Phone Number Label */}
          <label className="forgot-password-label">Phone Number</label>

          {error && <p className="forgot-password-error">{error}</p>}
          {success && <p className="forgot-password-success">{success}</p>}

          {/* Phone Number Input */}
          <Input
            type="tel"
            placeholder="Enter your Phone  Number"
            className="forgot-password-input"
            value={phone}
            onChange={handlePhoneChange}
            required
          />

          {/* Send OTP Button */}
          <Button
            type="submit"
            className="forgot-password-button"
            style={{
              background: '#A4E376',
              color: '#000000',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '0.9rem 2rem',
              borderRadius: '1.8rem',
              border: 'none',
              marginTop: '2rem',
              minHeight: '2.8rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Send OTP
          </Button>

          {/* Back to Login Link */}
          <a href="#" className="forgot-password-back-link" onClick={handleBack}>
            Back to Login
          </a>
        </form>
      </div>
    </div>
  );
}
