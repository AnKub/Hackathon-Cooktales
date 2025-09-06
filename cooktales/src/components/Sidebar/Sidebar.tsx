import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const links = [
  { to: '/', label: 'Home' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/ai-assistant', label: 'AI Assist' },
  { to: '/about', label: 'About' },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <button
        className="sidebar-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? '✖' : '☰'}
      </button>
      <nav>
        <ul>
          {links.map((link, idx) => (
            <li
              key={link.to}
              style={{
                transitionDelay: open ? `${idx * 80}ms` : `${(links.length - idx) * 60}ms`,
              }}
              className={open ? 'sidebar-link-visible' : ''}
            >
              <Link to={link.to} tabIndex={open ? 0 : -1} onClick={handleLinkClick}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;