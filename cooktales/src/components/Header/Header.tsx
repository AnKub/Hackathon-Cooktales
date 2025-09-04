import React from 'react';
import './Header.scss';

const Header: React.FC = () => (
  <header className="header-glass">
    <h1 className="header-title">Cooktales</h1>
    <div className="header-actions">
      <button className="header-theme-btn">🌗</button>
      <button className="header-auth-btn">Log In / Log Out</button>
    </div>
  </header>
);

export default Header;