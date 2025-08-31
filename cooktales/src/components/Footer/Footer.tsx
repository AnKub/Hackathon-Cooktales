import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__logo">Cooktales</div>
    <div className="footer__columns">
      <div className="footer__column">
        <h4>Column 1</h4>
        <ul>
          <li>About</li>
          <li>Team</li>
        </ul>
      </div>
      <div className="footer__column">
        <h4>Column 2</h4>
        <ul>
          <li>Recipes</li>
          <li>Categories</li>
        </ul>
      </div>
      <div className="footer__column">
        <h4>Column 3</h4>
        <ul>
          <li>Contact</li>
          <li>Support</li>
        </ul>
      </div>
      <div className="footer__column">
        <h4>Column 4</h4>
        <ul>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;