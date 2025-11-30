// src/pages/auth/SignupPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../../components/common";
import "./SignupPage.css";
import { auth as importedAuth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    retypePassword: ""
  });

  // Ensure recaptcha container exists before initializing
  useEffect(() => {
    // create the container if not present (defensive)
    if (!document.getElementById("recaptcha-container")) {
      const div = document.createElement("div");
      div.id = "recaptcha-container";
      // keep it visually hidden but present
      div.style.position = "absolute";
      div.style.left = "-9999px";
      document.body.appendChild(div);
    }
    // cleanup not necessary (we reuse across navigations)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Create or reuse the RecaptchaVerifier properly (modular SDK v9+ / v12)
  const ensureRecaptcha = async () => {
    const runtimeAuth = importedAuth ?? getAuth();

    if (!runtimeAuth) {
      throw new Error("Firebase auth not initialized. Check src/firebase.js.");
    }

    // Reuse existing verifier if valid
    if (window.recaptchaVerifier) {
      try {
        // If already rendered, reset widget (if grecaptcha available)
        if (window.grecaptcha && typeof window.recaptchaWidgetId !== "undefined") {
          try { window.grecaptcha.reset(window.recaptchaWidgetId); } catch (_) { /* ignore */ }
        }
        // If object looks like a RecaptchaVerifier, reuse it
        if (typeof window.recaptchaVerifier.verify === "function") {
          return window.recaptchaVerifier;
        }
      } catch (e) {
        // If reuse fails fallthrough to recreate
        try { window.recaptchaVerifier.clear && window.recaptchaVerifier.clear(); } catch (_) {}
        window.recaptchaVerifier = undefined;
      }
    }

    // Create new RecaptchaVerifier using correct signature for modular SDK:
    // new RecaptchaVerifier(auth, containerOrId, params)
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        runtimeAuth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (token) => {
            // reCAPTCHA solved — optional handler if you want to do something
            // We'll call signInWithPhoneNumber after ensureRecaptcha resolves.
          },
          "expired-callback": () => {
            // token expired — user must re-trigger recaptcha
            try {
              if (window.grecaptcha && typeof window.recaptchaWidgetId !== "undefined") {
                window.grecaptcha.reset(window.recaptchaWidgetId);
              }
            } catch (_) {}
          }
        }
      );

      // Optional: pre-render and store widget id for reset
      try {
        const widgetId = await window.recaptchaVerifier.render();
        window.recaptchaWidgetId = widgetId;
      } catch (renderErr) {
        // non-fatal; render may fail if grecaptcha not fully ready yet
        console.debug("recaptcha render non-fatal:", renderErr);
      }

      return window.recaptchaVerifier;
    } catch (err) {
      console.error("Failed to initialize reCAPTCHA verifier (correct signature tried):", err);
      // Re-throw so caller can show a helpful error
      throw new Error("Failed to initialize reCAPTCHA verifier. See console for details.");
    }
  };

  const handleSendOTP = async (e) => {
    e && e.preventDefault && e.preventDefault();
    setError("");
    const phoneOnly = (formData.phone || "").replace(/\D/g, "");
    if (!/^\d{10}$/.test(phoneOnly)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    sessionStorage.setItem("signup_form", JSON.stringify(formData));

    try {
      setIsOtpLoading(true);

      const appVerifier = await ensureRecaptcha();
      const runtimeAuth = importedAuth ?? getAuth();

      const fullPhone = `+91${phoneOnly}`; // change country code if needed
      console.info("DEBUG: calling signInWithPhoneNumber with", fullPhone);

      const confirmationResult = await signInWithPhoneNumber(runtimeAuth, fullPhone, appVerifier);

      sessionStorage.setItem("firebase_verificationId", confirmationResult.verificationId);
      navigate("/verify-otp", { state: { phoneNumber: fullPhone } });
    } catch (err) {
      console.error("send otp error", err);
      setError("Refresh the page and try again");
      // try resetting grecaptcha if possible
      try {
        if (window.recaptchaWidgetId && window.grecaptcha) window.grecaptcha.reset(window.recaptchaWidgetId);
      } catch (_) {}
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const { firstname, middlename, lastname, email, phone, password, retypePassword } = formData;
    if (!email?.trim() && !phone?.trim()) {
      setError("Either email or phone is required");
      return;
    }
    if (!password?.trim()) {
      setError("Password is required");
      return;
    }
    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }
    // For now, we route OTP flow if phone is provided
  };

  return (
    <div className="signup-page-root">
      <div className="signup-page-top">
        <div className="signup-page-header">
          <p className="signup-page-lets">Let’s</p>
          <h1 className="signup-page-create">Create<br/>Your Account</h1>
        </div>
      </div>

      <div className="signup-page-bottom">
        <form className="signup-page-form" onSubmit={handleSignup}>
          {error && <p className="error-text" style={{ color: 'salmon' }}>{error}</p>}
          <Input placeholder="First Name*" className="signup-input" name="firstname" value={formData.firstname} onChange={handleChange} />
          <Input placeholder="Middle Name" className="signup-input" name="middlename" value={formData.middlename} onChange={handleChange} />
          <Input placeholder="Last Name*" className="signup-input" name="lastname" value={formData.lastname} onChange={handleChange} />
          <Input placeholder="Email Address" type="email" className="signup-input" name="email" value={formData.email} onChange={handleChange} />
          <Input placeholder="Phone Number" className="signup-input" name="phone" value={formData.phone} onChange={handleChange} />
          <Input placeholder="Password*" type="password" className="signup-input" name="password" value={formData.password} onChange={handleChange} />
          <Input placeholder="Retype Password*" type="password" className="signup-input" name="retypePassword" value={formData.retypePassword} onChange={handleChange} />

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              type="button"
              disabled={isOtpLoading}
              onClick={handleSendOTP}
              style={{
                background: 'linear-gradient(90deg, #89D957 0%, #C9E265 100%)',
                color: '#062540',
                fontWeight: 600,
                fontSize: '1.05rem',
                borderRadius: '25px',
                padding: '10px 18px',
                border: 'none',
                cursor: 'pointer',
                minHeight: 42
              }}
            >
              {isOtpLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>

          <div id="recaptcha-container" />
          <div className="signup-links">
            <p>Already have an account? <span onClick={() => navigate('/login')} className="signup-link">Sign In</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}
