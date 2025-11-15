import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './ResetPassword.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please enter both password fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Reset password:', { password });
    setSuccess('Password reset successfully!');
    setError('');

    // TODO: Call your API to reset password
    // If successful, navigate to login:
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="reset-password-root">
      {/* ============ TOP SECTION ============ */}
      <div className="reset-password-top">
        <div className="reset-password-icon">
          <i className="fas fa-lock"></i>
        </div>
        <h1 className="reset-password-title">Forgot<br />Password?</h1>
        <p className="reset-password-subtitle">
          No worries, verify OTP sent<br />on phone number then set<br />new password
        </p>
      </div>

      {/* ============ BOTTOM SECTION ============ */}
      <div className="reset-password-bottom">
        <form className="reset-password-form" onSubmit={handleResetPassword}>
          {/* Label */}
          <label className="reset-password-label">Enter new Password</label>

          {error && <p className="reset-password-error">{error}</p>}
          {success && <p className="reset-password-success">{success}</p>}

          {/* Password Input */}
          <Input
            type="password"
            placeholder="Enter Password"
            className="reset-password-input"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {/* Confirm Password Input */}
          <Input
            type="password"
            placeholder="Enter Password again"
            className="reset-password-input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />

          {/* Set new Password Button */}
          <Button
            type="submit"
            className="reset-password-button"
            style={{
              background: '#A4E376',
              color: '#000000',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '0.9rem 2rem',
              borderRadius: '1.8rem',
              border: 'none',
              marginTop: '1.5rem',
              minHeight: '2.8rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Set new Password
          </Button>

          {/* Back to Login Link */}
          <a href="#" className="reset-password-back-link" onClick={handleBackToLogin}>
            Back to Login
          </a>
        </form>
      </div>
    </div>
  );
}
