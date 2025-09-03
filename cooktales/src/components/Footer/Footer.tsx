import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer-glass">
    <div className="footer-logo">Cooktales</div>
    <div className="footer-columns">
      <div className="footer-column">
        <h4>About</h4>
        <ul>
          <li>Team</li>
          <li>Vision</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Recipes</h4>
        <ul>
          <li>Categories</li>
          <li>Popular</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Support</h4>
        <ul>
          <li>Contact</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Legal</h4>
        <ul>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;