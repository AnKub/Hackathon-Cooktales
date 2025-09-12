// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Header.scss';

// const Header: React.FC = () => {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const navigate = useNavigate();

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     document.body.classList.remove('theme-light', 'theme-dark');
//     document.body.classList.add(`theme-${newTheme}`);
//   };

//   return (
//     <header className="header-glass">
//       <span className="header-logo">Cooktales</span>
//       <nav className="navbar-links">
//         <a href="/">Home</a>
//         <a href="/favorites">Favorites</a>
//         <a href="/ai-assistant">AI Assist</a>
//         <a href="/about">About</a>
//       </nav>
//       <div className="header-actions">
//         <button className="header-theme-btn" onClick={toggleTheme}>
//           {theme === 'light' ? (
//             <img src="/images/dark.png" alt="Light theme" className="theme-icon" />
//           ) : (
//             <img src="/images/yellow.png" alt="Dark theme" className="theme-icon" />
//           )}
//         </button>
//         <button className="header-auth-btn" onClick={() => navigate('/auth')}>In / Out</button>
//       </div>
//     </header>
//   );
// };

// // export default Header;