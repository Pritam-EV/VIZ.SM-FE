import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './UserProfile.css';

export default function UserProfileDetails() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('USER'); // 'USER' or 'PARTNER'
  const [profileData, setProfileData] = useState({
    name: 'Pritam Rokade',
    phone: '9370770190',
    email: 'pritamrokade3@gmail.com',
  });
  const [editMode, setEditMode] = useState(false);

  const handleBack = () => {
    navigate('/home');
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // TODO: Call your API to update profile, show success message, etc.
  };

  return (
    <div className="profile-details-root">
      {/* ============ HEADER SECTION ============ */}
        <div className="profile-details-header">
        <button
            className="profile-details-back-btn"
            onClick={handleBack}
            aria-label="Back"
        >
            <i className="fas fa-arrow-left"></i>
        </button>
        <div className="profile-details-avatar-section">
            <div className="profile-details-avatar">
            <i className="fas fa-user"></i>
            </div>
            <h1 className="profile-details-header-title">My Profile</h1>
        </div>
        {/* Toggle USER / PARTNER */}
        <div className="profile-details-toggle-group">
          <button
            className={`profile-details-toggle-btn ${userType === 'USER' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('USER')}
           
          >
            USER
          </button>
          <button
            className={`profile-details-toggle-btn ${userType === 'PARTNER' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('PARTNER')}
           
          >
            PARTNER
          </button>
        </div>
      </div>

      {/* ============ FORM SECTION ============ */}
      <div className="profile-details-form-section">
        {/* Name Field */}
        <div className={`profile-details-field-group${editMode ? ' editable' : ''}`}>
          <div className="profile-details-field-icon">
            <i className="fas fa-user"></i>
          </div>
          <Input
            type="text"
            placeholder="Full Name"
            className={`profile-details-input${editMode ? ' edit-bg' : ''}`}
            value={profileData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={!editMode}
          />
        </div>
        {/* Phone Field (Always ReadOnly) */}
        <div className="profile-details-field-group">
          <div className="profile-details-field-icon">
            <i className="fas fa-phone"></i>
          </div>
          <Input
            type="tel"
            placeholder="Phone Number"
            className="profile-details-input"
            value={profileData.phone}
            disabled
          />
        </div>
        {/* Email Field */}
        <div className={`profile-details-field-group${editMode ? ' editable' : ''}`}>
          <div className="profile-details-field-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <Input
            type="email"
            placeholder="Email Address"
            className={`profile-details-input${editMode ? ' edit-bg' : ''}`}
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!editMode}
          />
        </div>
        {/* Update/Save Toggle */}
        {!editMode ? (
          <button
            className="profile-details-update-link"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        ) : (
          <Button
            className="profile-details-update-save-btn"
            style={{
              background: '#89D957',
              color: '#062540',
              fontWeight: 700,
              fontSize: '1.08rem',
              padding: '0.8rem 2.2rem',
              borderRadius: '1.5rem',
              border: 'none',
              marginTop: '1.5rem',
            }}
            onClick={handleSaveProfile}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
