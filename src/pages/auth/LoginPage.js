// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Card, Input, Button } from '../../components/common';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-secondary)',
    }}>
      <Card style={{ width: 360 }}>
        <h2 style={{ marginBottom: 32, textAlign: 'center' }}>Login</h2>
        <form>
          <Input
            label="Email or Phone"
            placeholder="Enter email or phone"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mb-md"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mb-lg"
          />
          <Button variant="primary" fullWidth type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
