import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import './PartnerKYC.css';

export default function PartnerKYC() {
  const navigate = useNavigate();
  const [aadharInputs, setAadharInputs] = useState(Array(12).fill(''));
  const [panInputs, setPanInputs] = useState(Array(10).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const aadharRefs = useRef([]);
  const panRefs = useRef([]);

  // Handle Aadhar input (12 digits, first must be >= 2)
  const handleAadharChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newInputs = [...aadharInputs];
    newInputs[index] = value;
    setAadharInputs(newInputs);

    // Move to next input if value entered
    if (value && index < 11) {
      aadharRefs.current[index + 1]?.focus();
    }
  };

  // Handle PAN input (AAAAA####A format)
  const handlePanChange = (index, value) => {
    if (value.length > 1) return;

    const panFormat = 'AAAAA####A';
    const isAlpha = panFormat[index] === 'A';
    const isDigit = panFormat[index] === '#';

    // Validate character type
    if (isAlpha && !/^[A-Za-z]*$/.test(value)) return;
    if (isDigit && !/^\d*$/.test(value)) return;

    const newInputs = [...panInputs];
    newInputs[index] = value.toUpperCase();
    setPanInputs(newInputs);

    // Move to next input if value entered
    if (value && index < 9) {
      panRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace for navigation
  const handleAadharKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !aadharInputs[index] && index > 0) {
      aadharRefs.current[index - 1]?.focus();
    }
  };

  const handlePanKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !panInputs[index] && index > 0) {
      panRefs.current[index - 1]?.focus();
    }
  };

  // Validate and submit
  const handleSubmitKYC = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const aadhar = aadharInputs.join('');
    const pan = panInputs.join('');

    // Validate Aadhar
    if (aadhar.length !== 12) {
      setError('Please enter complete Aadhar number (12 digits)');
      return;
    }

    if (parseInt(aadhar[0]) < 2) {
      setError('Aadhar number must start with 2 or higher');
      return;
    }

    // Validate PAN
    if (pan.length !== 10) {
      setError('Please enter complete PAN card number');
      return;
    }

    const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/;
    if (!panRegex.test(pan)) {
      setError('Invalid PAN card format (AAAAA####A)');
      return;
    }

    console.log('KYC Data:', { aadhar, pan });

    // TODO: Call your API to submit KYC data
    setSuccess('KYC details submitted successfully!');

    setTimeout(() => {
      // After submission, navigate back and update status to 'waiting'
      navigate('/profile', { state: { kycStatus: 'waiting' } });
    }, 1500);
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className="partner-kyc-root">
      {/* ============ HEADER ============ */}
      <div className="partner-kyc-header">
        <button
          className="partner-kyc-back-btn"
          onClick={handleBack}
          aria-label="Back"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="partner-kyc-title">KYC Verification</h1>
      </div>

      {/* ============ CONTAINER ============ */}
      <div className="partner-kyc-container">
        <form className="partner-kyc-form" onSubmit={handleSubmitKYC}>
          {error && <p className="partner-kyc-error">{error}</p>}
          {success && <p className="partner-kyc-success">{success}</p>}

          {/* ---- AADHAR SECTION ---- */}
          <div className="partner-kyc-section">
            <label className="partner-kyc-label">Aadhar Number (12 digits)</label>
            <p className="partner-kyc-hint">Start with 2 or higher</p>
            <div className="partner-kyc-input-group">
              {aadharInputs.map((value, index) => (
                <input
                  key={`aadhar-${index}`}
                  ref={(el) => (aadharRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="partner-kyc-char-input"
                  value={value}
                  onChange={(e) => handleAadharChange(index, e.target.value)}
                  onKeyDown={(e) => handleAadharKeyDown(index, e)}
                  placeholder="-"
                  inputMode="numeric"
                />
              ))}
            </div>
          </div>

          {/* ---- PAN SECTION ---- */}
          <div className="partner-kyc-section">
            <label className="partner-kyc-label">PAN Card Number</label>
            <p className="partner-kyc-hint">Format: AAAAA####A</p>
            <div className="partner-kyc-input-group">
              {panInputs.map((value, index) => {
                const panFormat = 'AAAAA####A';
                const isAlpha = panFormat[index] === 'A';
                return (
                  <input
                    key={`pan-${index}`}
                    ref={(el) => (panRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    className="partner-kyc-char-input"
                    value={value}
                    onChange={(e) => handlePanChange(index, e.target.value)}
                    onKeyDown={(e) => handlePanKeyDown(index, e)}
                    placeholder={isAlpha ? 'A' : '#'}
                    inputMode={isAlpha ? 'text' : 'numeric'}
                  />
                );
              })}
            </div>
          </div>

          {/* ---- SUBMIT BUTTON ---- */}
          <Button
            type="submit"
            className="partner-kyc-submit-btn"
            style={{
              background: '#A4E376',
              color: '#000000',
              fontWeight: 700,
              fontSize: '1.05rem',
              padding: '0.9rem 2.5rem',
              borderRadius: '1.8rem',
              border: 'none',
              marginTop: '2rem',
              minHeight: '2.8rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Submit KYC
          </Button>
        </form>
      </div>
    </div>
  );
}
