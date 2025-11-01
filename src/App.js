// frontend/src/App.jsx

import React from 'react';
import { ThemeProvider } from './hooks/useTheme';
import LoginPage from './pages/auth/LoginPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
