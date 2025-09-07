import React from 'react';
import './About.scss';

const images = [
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/7.webp',
  '/images/8.webp',
];

const About: React.FC = () => (
  <div className="about-page">
    <img src="/images/monster.png" alt="Cookie Monster" className="about-mascot" />
    <div className="about-carousel-wrapper">
      <div className="about-carousel">
        {[...images, ...images].map((src, idx) => (
          <div className="about-carousel-item" key={idx}>
            <img src={src} alt={`carousel-${idx}`} />
          </div>
        ))}
      </div>
    </div>
    <div className="about-story-frame">
      <div className="about-story">
        <h2>How Cooktales Was Born</h2>
        <p>
          Once upon a time, in a land of lonely kitchens and empty fridges, a wise Cookie Monster from Sesame Street whispered an idea: <br />
          <i>"Why not create a place where everyone can find warmth, family, and delicious dinners, even if their only friend is a rubber duck?"</i><br /><br />
          Thus, Cooktales was born! A magical app for those who crave cozy evenings, hearty meals, and maybe a crumb or two on the keyboard. <br />
          Whether you’re a master chef or a cereal enthusiast, here you’ll find recipes, AI-powered suggestions, and a sprinkle of love in every pixel.<br /><br />
          So grab your spatula, invite your imaginary friends, and let’s cook up some memories together! 🍪
        </p>
      </div>
    </div>
  </div>
);

export default About;