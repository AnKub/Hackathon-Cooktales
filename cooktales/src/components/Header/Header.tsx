import React, { useState } from 'react';
import './Header.scss';

const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${newTheme}`);
  };

  return (
    <header className="header-glass">
      <span className="header-logo">Cooktales</span>
      <nav className="navbar-links">
        <a href="/">Home</a>
        <a href="/favorites">Favorites</a>
        <a href="/ai-assistant">AI Assist</a>
        <a href="/about">About</a>
      </nav>
      <div className="header-actions">
        <button className="header-theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌗' : '🌞'}
        </button>
        <button className="header-auth-btn">Log In / Log Out</button>
      </div>
    </header>
  );
};

export default Header;