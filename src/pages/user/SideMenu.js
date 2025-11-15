import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideMenu.css';

export default function SideMenu() {
  const navigate = useNavigate();
  const [userInfo] = useState({
    name: 'Pritam Rokade',
    phone: '+91 9370770190',
    avatar: '/user-avatar.png'
  });

  const handleBack = () => {
    navigate('/home');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleMyProfileClick = () => {
    navigate('/profile');
  };

const handleAnalyticsClick = () => {
  navigate('/useranalytics');
};


  const handleHelpClick = () => {
    navigate('/help-support');
  };


  const handleTermsClick = () => {
    console.log('Navigate to Terms & Conditions');
  };

  const handlePrivacyClick = () => {
    console.log('Navigate to Privacy Policy');
  };

  const handleRefundClick = () => {
    console.log('Navigate to Refund Policy');
  };

  const handleLogout = () => {
    console.log('Logout');
    navigate('/login');
  };

  return (
    <div className="user-profile-root">
      {/* ============ TOP PROFILE SECTION ============ */}
      <div className="profile-header-section">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div className="profile-user-info">
          <span className="profile-label">USER</span>
          <h1 className="profile-name">{userInfo.name}</h1>
          <p className="profile-phone">{userInfo.phone}</p>
        </div>
      </div>

      {/* ============ MAIN NAVIGATION MENU ============ */}
      <div className="profile-menu-section">
        <button className="profile-menu-item " onClick={handleHomeClick}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </button>
        <button className="profile-menu-item " onClick={handleMyProfileClick}>
          <i className="fas fa-user"></i>
          <span>My Profile</span>
        </button>
        <button className="profile-menu-item" onClick={handleAnalyticsClick}>
          <i className="fas fa-chart-bar"></i>
          <span>Analytics</span>
        </button>
        <button className="profile-menu-item" onClick={handleHelpClick}>
          <i className="fas fa-headset"></i>
          <span>Help & Support</span>
        </button>
      </div>

      {/* ============ FOOTER LINKS & LOGOUT ============ */}
      <div className="profile-footer-section">
        <div className="profile-footer-links">
          <button className="footer-link" onClick={handleTermsClick}>
            Terms & Conditions
          </button>
          <button className="footer-link" onClick={handlePrivacyClick}>
            Privacy Policy
          </button>
          <button className="footer-link" onClick={handleRefundClick}>
            Refund Policy
          </button>
        </div>

        <button className="profile-logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
