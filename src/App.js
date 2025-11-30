import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import PartnerSignup from './pages/auth/PartnerSignup';
import UserHomePage from './pages/user/UserHome';
import SideMenu from './pages/user/SideMenu';
import UserWallet from './pages/user/UserWallet';
import UserPool from './pages/user/UserPool';
import LinkDevice from './pages/user/LinkDevice';
import UserProfile from './pages/user/UserProfile';
import PartnerProfile from './pages/partner/PartnerProfile';
import PartnerKYC from './pages/partner/PartnerKYC';
import HelpSupport from './pages/user/HelpSupport';
import UserAnalytics from './pages/user/UserAnalytics';
import VerifyOTP from './pages/auth/VerifyOTP';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword'; // For next step
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/partnersignup" element={<PartnerSignup />} />
          <Route path="/partner-kyc" element={<PartnerKYC />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/sidemenu" element={<SideMenu />} />
          <Route path="/topup-wallet" element={<UserWallet />} />
          <Route path="/transfer-pool" element={<UserPool />} />
          <Route path="/link-device" element={<LinkDevice />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/partnerprofile" element={<PartnerProfile />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/useranalytics" element={<UserAnalytics />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
