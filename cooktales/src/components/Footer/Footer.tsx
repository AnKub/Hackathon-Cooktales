import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer-glass">
  
    <div className="footer-columns">  
      <div className="footer-logo">Cooktales</div>
      <div className="footer-column">
        <h4>About</h4>
        <ul>
          <li>Team</li>
          <li>Vision</li>
          <li>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href="mailto:your@email.com">Email</a>
          </li>
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
    <div className="footer-bottom">
      <span className="footer-author">Author: An</span>
      <span className="footer-made">Made with Paws</span>
    </div>
  </footer>
);

export default Footer;