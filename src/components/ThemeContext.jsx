import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 1. We check if the user MANUALLY set it to dark before
    const saved = localStorage.getItem('theme');
    return saved === 'dark'; // This will be FALSE for new users (Light Mode)
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 2. IMPORTANT: Forcefully remove 'dark' if state is false
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);