// frontend/src/hooks/useTheme.js

import { useContext, createContext } from 'react';
import theme from '../styles/theme';

const ThemeContext = createContext(theme);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return theme;
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};