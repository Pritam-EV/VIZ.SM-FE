// src/pages/auth/VerifyOTP.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button } from "../../components/common";
import "./VerifyOTP.css";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [verificationId, setVerificationId] = useState("");

  useEffect(() => {
    if (location.state?.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
    }
    const vid = sessionStorage.getItem("firebase_verificationId");
    if (vid) setVerificationId(vid);
  }, [location]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

const handleVerify = async (e) => {
  e.preventDefault();
  setError("");

  if (!otp.trim() || otp.length < 6) {
    setError("Please enter the 6-digit OTP");
    return;
  }

  try {
    if (!verificationId) {
      setError("Verification session missing. Please request OTP again.");
      return;
    }

    // 1. Verify OTP with Firebase
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const userCred = await signInWithCredential(auth, credential);
    
    // 2. Get signup form data
    const signupForm = sessionStorage.getItem("signup_form");
    if (!signupForm) {
      setError("Signup data missing. Please signup again.");
      return;
    }

    const formData = JSON.parse(signupForm);
    
    // 3. CALL BACKEND to create user in MongoDB
    console.log("🔥 Calling backend /api/account/user-signup...");
const backendResponse = await fetch('https://viz-sm-be.onrender.com/api/account/userSignUp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: formData.firstname || 'User',
    mobile: Number(phoneNumber.replace(/\D/g, '').slice(-10)),
    email: formData.email || '',
    password: formData.password,
    aadhar: '',
    pan: ''
  })
});

const backendData = backendResponse.ok ? {} : await backendResponse.json();

console.log("🔥 Backend response:", backendResponse.status, backendData);

if (backendResponse.ok) {  // ✅ 204 is ok!
  sessionStorage.removeItem("firebase_verificationId");
  sessionStorage.removeItem("signup_form");
  navigate("/home");
} else {
  setError(`Backend error: ${backendData.message || backendData.invalid || 'Failed to create account'}`);
}


  } catch (err) {
    console.error("OTP verify error:", err);
    setError("Invalid OTP or backend error. Try again.");
  }
};


  const handleResendOtp = async () => {
    setError("");
    setOtp("");
    setResendTimer(30);
    // Best UX: go back to signup and click "Send OTP" to re-run recaptcha + send
    setError("Please go back to the signup page and click Send OTP to resend.");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="verify-otp-root">
      <div className="verify-otp-top">
        <div className="verify-otp-icon">
          <i className="fas fa-lock"></i>
        </div>
        <p className="verify-otp-message">
          OTP successfully sent to<br />{phoneNumber}
        </p>
      </div>

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
              <Button
                className="verify-otp-back-link"
                disabled={resendTimer > 0}
                onClick={handleResendOtp}
              >
                {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
              </Button>
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
