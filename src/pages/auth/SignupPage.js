import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import './SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
    // TODO: Call your backend API here
  };

  return (
    <div className="signup-page-root">
      {/* Top Green Section */}
      <div className="signup-page-top">
        <div className="signup-page-header">
          <p className="signup-page-lets">Let’s</p>
          <h1 className="signup-page-create">Create<br />Your Account</h1>
        </div>
      </div>

      {/* Bottom Dark Section */}
      <div className="signup-page-bottom">
        <form className="signup-page-form" onSubmit={handleSignup}>
          <Input
            placeholder="Full Name"
            className="signup-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Email Address"
            type="email"
            className="signup-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Phone Number"
            className="signup-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            className="signup-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Retype Password"
            type="password"
            className="signup-input"
            name="retypePassword"
            value={formData.retypePassword}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #89D957 0%, #C9E265 100%)',
              color: '#062540',
              fontWeight: 600,
              fontSize: '1.05rem',
              borderRadius: '25px',
              marginTop: '1.2em',
              height: '42px'
            }}
          >
            Sign Up
          </Button>

          <div className="signup-links">
            <p>
              Have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="signup-link"
              >
                Sign In
              </span>
            </p>
            <p>
              Want to signup as a Partner?{' '}
              <span
                onClick={() => navigate('/partner-signup')}
                className="signup-link"
              >
                Partner Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
