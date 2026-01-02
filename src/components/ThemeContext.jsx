import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    // We are ignoring system settings entirely here. 
    // It only turns dark if the user specifically clicked it in the past.
    return saved === 'dark';
  });

  // useLayoutEffect runs BEFORE the paint, so we can stop the dark flash
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // This second effect is a "Safety Guard" 
  // It ensures that even if something else adds 'dark', we remove it on load if isDarkMode is false
  useEffect(() => {
    if (!isDarkMode) {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);