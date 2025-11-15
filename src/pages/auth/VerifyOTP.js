import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './VerifyOTP.css';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+91 9876543210');
  const [resendTimer, setResendTimer] = useState(0);

  // Get phone number from login state if available
  useEffect(() => {
    if (location.state?.phone) {
      setPhoneNumber(location.state.phone);
    }
  }, [location]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError('Please enter OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    console.log('Verifying OTP:', otp);

    // TODO: Call your API to verify OTP
    // If successful, navigate to home or next page:
    navigate('/home');

    // If failed:
    // setError('Invalid OTP. Please try again.');
  };

  const handleResendOtp = () => {
    console.log('Resending OTP to:', phoneNumber);
    setOtp('');
    setError('');
    setResendTimer(30); // 30 second countdown
    // TODO: Call your API to resend OTP
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="verify-otp-root">
      {/* ============ TOP SECTION ============ */}
      <div className="verify-otp-top">
        <div className="verify-otp-icon">
          <i className="fas fa-lock"></i>
        </div>
        <p className="verify-otp-message">
          OTP successfully sent to<br />{phoneNumber}
        </p>
      </div>

      {/* ============ BOTTOM SECTION ============ */}
      <div className="verify-otp-bottom">
        <form className="verify-otp-form" onSubmit={handleVerify}>
          <h2 className="verify-otp-heading">Verify OTP</h2>

          {error && <p className="verify-otp-error">{error}</p>}

          <Input
            type="text"
            placeholder="Enter OTP"
            className="verify-otp-input"
            value={otp}
            onChange={handleOtpChange}
            maxLength="6"
            required
          />

          <Button
            type="submit"
            className="verify-otp-button"
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
            }}
          >
            Verify
          </Button>

          <div className="verify-otp-footer">
            <p className="verify-otp-resend">
              Didn't receive OTP?{' '}
              <button
                type="button"
                className={`verify-otp-resend-btn ${resendTimer > 0 ? 'disabled' : ''}`}
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </p>

            <a href="#" className="verify-otp-back-link" onClick={handleBackToLogin}>
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
