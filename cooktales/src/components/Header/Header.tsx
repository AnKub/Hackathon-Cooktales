import React, { useState } from 'react';
import './Header.scss';

const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Тут буде логіка для зміни класу body або context, коли додамо стилі
  };

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <h1 className="text-2xl font-bold">Cooktales</h1>
      <button onClick={toggleTheme} className="px-4 py-2 rounded border">
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>
    </header>
  );
};

export default Header;