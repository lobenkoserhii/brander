import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const sunIconPath = '/sunny.svg';
const moonIconPath = '/moon.svg';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [animationClass, setAnimationClass] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const handleClick = () => {
    setAnimationClass('fade'); 
    toggleTheme();
    setTimeout(() => {
      setAnimationClass(''); 
    }, 500); 
  };

  if (isDarkMode === null) return null;

  return (
    <button onClick={handleClick} className="theme-toggle-btn">
      <img
        src={isDarkMode ? moonIconPath : sunIconPath}
        alt={isDarkMode ? 'Moon' : 'Sun'}
        className={`theme-icon ${animationClass}`}
      />
    </button>
  );
};

export default ThemeToggle;
