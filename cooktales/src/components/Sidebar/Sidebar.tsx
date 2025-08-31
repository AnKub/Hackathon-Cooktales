import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss'; 

const Sidebar: React.FC = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;