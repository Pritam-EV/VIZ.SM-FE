// src/pages/UserHomePage/UserHomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/common';
import './UserHomePage.css';

export default function UserHomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Pritam');
  const [walletBalance] = useState(100);
  const [poolBalance, setPoolBalance] = useState(0);
  const [walletSerial] = useState('89457230');
  const [poolSerial, setPoolSerial] = useState('VIZ25A01');
  const [poolDevice, setPoolDevice] = useState(null);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [devicesError, setDevicesError] = useState(null);

  // ==========================
  // GET CURRENT USER ID
  // ==========================
  const getCurrentUserId = () => {
    try {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const userObj = JSON.parse(userJson);
        if (userObj && (userObj._id || userObj.id)) return userObj._id || userObj.id;
      }

      const tk =
        localStorage.getItem('authToken') ||
        localStorage.getItem('token') ||
        null;

      if (tk) {
        const parts = tk.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(
            atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
          );
          return payload.sub || payload.id || payload._id || null;
        }
      }
    } catch (e) {
      console.error('getCurrentUserId error', e);
    }
    return null;
  };

  const userId = getCurrentUserId();

  // Base API URL
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!userId) {
      setLoadingDevices(false);
      setPoolDevice(null);
      return;
    }

    let mounted = true;

// 🔥 REPLACE THIS ENTIRE fetchDevices function (around line 81)
const fetchDevices = async () => {
  setLoadingDevices(true);
  setDevicesError(null);
  
  try {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('jwt_token');
    console.log('🔥 TOKEN:', token?.substring(0, 20) + '...'); // ADD
    if (!token) {
      throw new Error('No authentication token found');
    }

    // ✅ CORRECT ENDPOINT - Matches your backend route
    const response = await axios.get(`${API_BASE}/api/account/devices/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ FULL RESPONSE:', response.data); // ADD
    console.log('✅ DEVICE:', response.data.device); // ADD
    if (response.data.device) {
      // ✅ Backend returns { device: { serialnumber, pool, status, rate, totalEnergy } }
      const device = response.data.device;
      setPoolDevice(device);
      setPoolBalance(device.pool || device.totalEnergy || 0);
      setPoolSerial(device.serialnumber || device.serial || poolSerial);
       console.log('✅ SET DEVICE:', device.serialnumber, '₹', device.pool); // ADD
    } else {
      console.log('❌ NO DEVICE IN RESPONSE'); // ADD
      setPoolDevice(null);
    }
  } catch (err) {
     console.error('❌ ERROR:', err.response?.data || err.message); // ADD
    console.error('Devices fetch error:', err);
    setDevicesError('No devices linked. Link a device to get started.');
    setPoolDevice(null);
  } finally {
    setLoadingDevices(false);
  }
};


    fetchDevices();
    return () => {
      mounted = false;
    };
  }, [userId]);

  const handleMenuClick = () => navigate('/sidemenu');
  const handleProfileClick = () => navigate('/profile');
  const handleTopupHistory = () => console.log('Topup History');
  const handleTransferHistory = () => console.log('Transfer History');
  const handleTopupWallet = () => navigate('/topup-wallet');
  const handleTransferToPool = () => navigate('/transfer-pool');
  const handleLinkDevice = () => navigate('/link-device');

  return (
    <div className="user-home-root">
      <header className="user-home-header">
        <div className="header-item left">
          <button className="user-home-menu-btn" onClick={handleMenuClick}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="header-item center">
          <span className="user-home-greeting">Hi {userName}</span>
        </div>
        <div className="header-item right">
          <button className="user-home-profile-btn" onClick={handleProfileClick}>
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </header>

      <div className="user-home-container">
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

        <h2 className="section-title">Linked Devices</h2>

        {loadingDevices ? (
          <div className="user-home-card device-card">
            <div className="card-header">
              <span className="card-link">Loading...</span>
              <div className="card-balance">
                Balance <span className="balance-value">{poolBalance} kWh</span>
              </div>
            </div>
            <div className="card-serial">{poolSerial}</div>
            <div className="card-POOL">POOL</div>
            <div className="device-status offline"></div>
          </div>
        ) : poolDevice ? (
          <div className="user-home-card device-card">
            <div className="card-header">
              <span className="card-link" onClick={handleTransferHistory}>
                Transfer History
              </span>
              <div className="card-balance">
                Balance <span className="balance-value">{poolDevice.pool} kWh</span>
              </div>
            </div>
            <div className="card-serial">{poolDevice.serialnumber}</div>
            <div className="card-POOL">POOL</div>
            <div className={`device-status ${poolDevice.status?.toLowerCase() === 'active' ? 'online' : 'offline'}`}></div>
          </div>
        ) : (
          <div className="user-home-card device-card">
            <div className="card-header">
              <span className="card-link" onClick={handleLinkDevice}>
                Link Device
              </span>
              <div className="card-balance">
                Balance <span className="balance-value">-</span>
              </div>
            </div>
            <div className="card-serial">—</div>
            <div className="card-POOL">No device linked</div>
            <div className="device-status offline"></div>
          </div>
        )}

        {devicesError && (
          <div style={{ color: 'red', marginTop: 8 }}>{devicesError}</div>
        )}
      </div>
    </div>
  );
}
