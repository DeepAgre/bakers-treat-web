import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Only return true if the user manually picked it before
    const saved = localStorage.getItem('theme');
    return saved === 'dark'; 
  });

  // useLayoutEffect runs BEFORE the page is visible to prevent the "Dark Flash"
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark'; // Tells browser to use dark system colors
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light'; // Tells browser to use light system colors
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