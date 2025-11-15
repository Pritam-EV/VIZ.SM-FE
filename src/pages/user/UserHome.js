import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import './UserHomePage.css';

export default function UserHomePage() {
  const navigate = useNavigate();
  const [userName] = useState('Pritam');
  const [walletBalance] = useState(100);
  const [poolBalance] = useState(0);
  const [walletSerial] = useState('89457230');
  const [poolSerial] = useState('VIZ25A01');

  const handleMenuClick = () => {
    // Handle menu button click
    navigate('/sidemenu');
  };

  const handleProfileClick = () => {
    // Handle profile button click
    navigate('/profile');
  };

  const handleTopupHistory = () => {
    // Navigate to top-up history
    console.log('Navigate to Topup History');
  };

  const handleTransferHistory = () => {
    // Navigate to transfer history
    console.log('Navigate to Transfer History');
  };

  const handleTopupWallet = () => {
  navigate('/topup-wallet');
  };


    const handleTransferToPool = () => {
    navigate('/transfer-pool');
    };

    const handleLinkDevice = () => {
    navigate('/link-device');
    };


  return (
    <div className="user-home-root">
      {/* ============ TOP HEADER BAR ============ */}
        <header className="user-home-header">
        <div className="header-item left">
            <button className="user-home-menu-btn" onClick={handleMenuClick} aria-label="Menu">
            <i className="fas fa-bars"></i>
            </button>
        </div>
        <div className="header-item center">
            <span className="user-home-greeting">Hi {userName}</span>
        </div>
        <div className="header-item right">
            <button className="user-home-profile-btn" onClick={handleProfileClick} aria-label="Profile">
            <i className="fas fa-user-circle"></i>
            </button>
        </div>
        </header>


      {/* ============ MAIN CONTENT ============ */}
      <div className="user-home-container">
        {/* ---- WALLET CARD ---- */}
        <div className="user-home-card wallet-card">
          <div className="card-header">
            <span className="card-link" onClick={handleTopupHistory}>
              Topup History
            </span>
            <div className="card-balance">
              Balance <span className="balance-value">₹{walletBalance}</span>
            </div>
          </div>
          <div className="card-title">WALLET</div>
          
        </div>

        {/* ---- ACTION BUTTONS ---- */}
        <div className="action-buttons">
          <Button onClick={handleTopupWallet} className="action-btn">
            Topup WALLET
          </Button>
          <Button onClick={handleTransferToPool} className="action-btn">
            Transfer WALLET to POOL
          </Button>
          <Button onClick={handleLinkDevice} className="action-btn">
            Link Device
          </Button>
        </div>

        {/* ---- LINKED DEVICES SECTION ---- */}
        <h2 className="section-title">Linked Devices</h2>

        {/* ---- POOL/DEVICE CARD ---- */}
        <div className="user-home-card device-card">
          <div className="card-header">
            <span className="card-link" onClick={handleTransferHistory}>
              Transfer History
            </span>
            <div className="card-balance">
              Balance <span className="balance-value">{poolBalance} kWh</span>
            </div>
          </div>
          <div className="card-serial">{poolSerial}</div>
          <div className="card-POOL">POOL</div>
          {/* Device status indicator (green for online, red for offline) */}
          <div className="device-status offline"></div>
        </div>
      </div>
    </div>
  );
}
