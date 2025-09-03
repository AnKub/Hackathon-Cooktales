import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => (
  <nav className="navbar-glass">
    <span className="navbar-logo">Cooktales</span>
    <div className="navbar-links">
      <a href="/">Home</a>
      <a href="/favorites">Favorites</a>
      <a href="/ai-assistant">AI Assistant</a>
    </div>
  </nav>
);

export default Navbar;