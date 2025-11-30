import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, Button } from '../../components/common';
import './UserProfile.css';

export default function UserProfileDetails() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('USER');
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  // ✅ FETCH LIVE USER DATA ON MOUNT
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('jwt_token');
      
      if (!token) {
        setError('Please login to view profile');
        setLoading(false);
        return;
      }

      console.log('🔥 Fetching profile from:', `${API_BASE}/api/account/profile`);
      
      const response = await axios.get(`${API_BASE}/api/account/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Profile data:', response.data);

      if (response.data.user) {
        setProfileData({
          name: response.data.user.firstName || response.data.user.name || '',
          phone: response.data.user.mobile || response.data.user.phone || '',
          email: response.data.user.email || '',
        });
      }
    } catch (err) {
      console.error('❌ Profile fetch error:', err.response?.data || err.message);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate('/home');

  const handleUserTypePartner = (type) => {
    setUserType(type);
    navigate('/partnerprofile');
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    navigate('/profile');
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

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      
      const response = await axios.put(`${API_BASE}/api/account/profile`, profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Profile updated:', response.data);
      setEditMode(false);
      // Refresh data
      fetchUserProfile();
    } catch (err) {
      console.error('❌ Update failed:', err.response?.data || err.message);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="profile-details-root" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ color: '#A4E376', fontSize: '1.2rem' }}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-details-root">
      {/* HEADER SECTION */}
      <div className="profile-details-header">
        <button className="profile-details-back-btn" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="profile-details-avatar-section">
          <div className="profile-details-avatar">
            <i className="fas fa-user"></i>
          </div>
          <h1 className="profile-details-header-title">My Profile</h1>
        </div>
        <div className="profile-details-toggle-group">
          <button
            className={`profile-details-toggle-btn ${userType === 'USER' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('USER')}
          >
            USER
          </button>
          <button
            className={`profile-details-toggle-btn ${userType === 'PARTNER' ? 'active' : ''}`}
            onClick={() => handleUserTypePartner('PARTNER')}
          >
            PARTNER
          </button>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="profile-details-form-section">
        {error && (
          <div style={{ color: '#FF3333', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        
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

        {/* Update/Save Button */}
        {!editMode ? (
          <button className="profile-details-update-link" onClick={handleUpdateProfile}>
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
