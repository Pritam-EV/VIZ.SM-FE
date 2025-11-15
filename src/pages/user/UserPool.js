import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import './UserPool.css';

export default function UserPool() {
  const navigate = useNavigate();
  const [devices] = useState([
    { id: 1, serial: 'VIZ25A01', balance: 0, status: 'offline' },
    { id: 2, serial: 'VIZ25A02', balance: 5, status: 'online' },
  ]);

  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState(10);
  const [walletBalance] = useState(100);

  const currentDevice = devices[currentDeviceIndex];
  const ratePerKwh = 10;
  const selectedAmount = selectedUnits * ratePerKwh;

  const handleBack = () => {
    navigate('/home');
  };

  const handlePrevDevice = () => {
    setCurrentDeviceIndex((prev) =>
      prev === 0 ? devices.length - 1 : prev - 1
    );
  };

  const handleNextDevice = () => {
    setCurrentDeviceIndex((prev) =>
      prev === devices.length - 1 ? 0 : prev + 1
    );
  };

  const handleSliderChange = (e) => {
    setSelectedUnits(parseInt(e.target.value));
  };

  const handleTopup = () => {
    if (selectedAmount > walletBalance) {
      alert('Insufficient wallet balance');
      return;
    }
    console.log('Topup Pool:', {
      device: currentDevice.serial,
      units: selectedUnits,
      amount: selectedAmount,
    });
    // Call API and navigate back
    // navigate('/home');
  };

  const maxUnits = 30;
  const sliderPercentage = (selectedUnits / maxUnits) * 100;

  return (
    <div className="pool-topup-root">
      {/* ============ HEADER ============ */}
      <div className="pool-topup-header">
        <div className="pool-header-side">
          <button className="pool-back-btn" onClick={handleBack} aria-label="Back">
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
        <div className="pool-header-center">
          <h1 className="pool-topup-title">Topup POOL</h1>
        </div>
        <div className="pool-header-side"></div>
      </div>

      {/* ============ CONTENT ============ */}
      <div className="pool-topup-container">
        {/* ---- INSTRUCTION TEXT ---- */}
        <p className="pool-instruction">Select POOL to topup</p>

        {/* ---- DEVICE CAROUSEL ---- */}
        <div className="pool-carousel-section">
          <button className="pool-carousel-btn prev" onClick={handlePrevDevice} aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="pool-device-card">
            <div className="pool-card-header">
              <span className="pool-card-link">Transfer History</span>
              <div className="pool-card-balance">
                Balance <span className="pool-balance-amount">{currentDevice.balance} kWh</span>
              </div>
            </div>
            <div className="pool-card-label">SERIAL NUMBER</div>
            <div className="pool-card-serial">{currentDevice.serial}</div>
            <div className="pool-card-title">POOL</div>
            <div className={`pool-device-status ${currentDevice.status}`}></div>
          </div>

          <button className="pool-carousel-btn next" onClick={handleNextDevice} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* ---- DEVICE INFO ---- */}
        <div className="pool-device-info">
          <div className="pool-info-row">
            <span className="pool-info-label">Device Serial Number: <strong>{currentDevice.serial}</strong></span>
            <span className="pool-info-label">Wallet Balance : <strong>₹{walletBalance}</strong></span>
          </div>
          <div className="pool-info-row">
            <span className="pool-info-label">Rate per kWh : <strong>₹{ratePerKwh}</strong></span>
            <span className="pool-info-label">Max Available Units : <strong>{maxUnits}kWh</strong></span>
          </div>
        </div>

        {/* ---- SLIDER SECTION ---- */}
        <div className="pool-slider-section">
          <div className="pool-slider-labels">
            <span className="pool-slider-min">₹0</span>
            <span className="pool-slider-mid">Amount</span>
            <span className="pool-slider-max">₹{maxUnits * ratePerKwh}</span>
          </div>

          <input
            type="range"
            min="0"
            max={maxUnits}
            value={selectedUnits}
            onChange={handleSliderChange}
            className="pool-slider"
            style={{
              background: `linear-gradient(to right, #13304eff 0%, #13304eff ${sliderPercentage}%, #BCD0EC ${sliderPercentage}%, #BCD0EC 100%)`,
            }}
          />

          <div className="pool-slider-range-labels">
            <span className="pool-range-min">0 kWh</span>
            <span className="pool-range-mid">Units</span>
            <span className="pool-range-max">{maxUnits} kWh</span>
          </div>
        </div>

        {/* ---- SUMMARY ---- */}
        <div className="pool-summary">
          <p className="pool-summary-line">Selected Units : <strong>{selectedUnits} kWh</strong></p>
          <p className="pool-summary-line">Selected Amount : <strong>₹{selectedAmount}</strong></p>
        </div>

        {/* ---- TOPUP BUTTON ---- */}
        <Button
          onClick={handleTopup}
          className="pool-topup-btn"
          style={{
            background: '#0A1F35',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '1.1rem',
            padding: '0.85rem 2rem',
            borderRadius: '2rem',
            border: 'none',
            minHeight: '2.6rem',
          }}
        >
          Topup
        </Button>
      </div>
    </div>
  );
}
