import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { useTheme } from '../../context/ThemeContext'; 

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); 
  const navigate = useNavigate();

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
          {theme === 'light' ? (
            <img src="/images/dark.png" alt="Light theme" className="theme-icon" />
          ) : (
            <img src="/images/yellow.png" alt="Dark theme" className="theme-icon" />
          )}
        </button>
        <button className="header-auth-btn" onClick={() => navigate('/auth')}>In / Out</button>
      </div>
    </header>
  );
};

export default Header;