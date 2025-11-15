import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './UserWallet.css';

export default function UserWallet() {
  const navigate = useNavigate();
  const [walletBalance] = useState(100);
  const [walletSerial] = useState('89457230');
  const [amount, setAmount] = useState('');

  const handleBack = () => {
    navigate('/home');
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleQuickAdd = (value) => {
    setAmount(value.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && amount > 0) {
      console.log('Topup amount:', amount);
      // Call your API to process topup
      // Then navigate back to home
      // navigate('/home');
    }
  };

  const handleSendAmount = () => {
    if (amount && amount > 0) {
      console.log('Send topup amount:', amount);
      handleSubmit({ preventDefault: () => {} });
    }
  };

  return (
    <div className="wallet-topup-root">
      {/* ============ HEADER ============ */}
        <div className="wallet-topup-header">
        <div className="wallet-header-side">
            <button className="wallet-back-btn" onClick={handleBack} aria-label="Back">
            <i className="fas fa-arrow-left"></i>
            </button>
        </div>
        <div className="wallet-header-center">
            <h1 className="wallet-topup-title">Topup WALLET</h1>
        </div>
        <div className="wallet-header-side">{/* empty for symmetry */}</div>
        </div>


      {/* ============ CONTENT ============ */}
      <div className="wallet-topup-container">
        {/* ---- WALLET CARD ---- */}
        <div className="wallet-card">
          <div className="wallet-card-header">
            <span className="wallet-card-link">Topup History</span>
            <div className="wallet-card-balance">
              Balance <span className="wallet-balance-amount">₹{walletBalance}</span>
            </div>
          </div>
          <div className="wallet-card-serial">{walletSerial}</div>
          <div className="wallet-card-title">WALLET</div>
        </div>

        {/* ---- TOPUP FORM ---- */}
        <div className="wallet-topup-form-section">
          <label className="wallet-form-label">Add amount to topup</label>
          <form onSubmit={handleSubmit} className="wallet-topup-form">
            <div className="wallet-input-group">
              <Input
                type="number"
                placeholder="Enter amount"
                className="wallet-amount-input"
                value={amount}
                onChange={handleAmountChange}
                min="1"
                required
              />
              <button
                type="button"
                className="wallet-send-btn"
                onClick={handleSendAmount}
                aria-label="Send"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>

          {/* ---- QUICK ADD BUTTONS ---- */}
          <div className="wallet-quick-buttons">
            <button
              type="button"
              className="wallet-quick-btn"
              onClick={() => handleQuickAdd(500)}
            >
              +500
            </button>
            <button
              type="button"
              className="wallet-quick-btn"
              onClick={() => handleQuickAdd(100)}
            >
              +100
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
