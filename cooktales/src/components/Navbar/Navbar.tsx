import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => (
  <nav className="px-6 py-4 flex justify-between items-center">
    <span className="font-bold text-xl">Cooktales</span>
    <button className="px-4 py-2 rounded border">Log In / Log Out</button>
  </nav>
);

export default Navbar;