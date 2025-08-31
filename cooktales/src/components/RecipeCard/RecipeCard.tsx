import React from 'react';
import './RecipeCard.scss';

interface RecipeCardProps {
  title: string;
  image: string;
  onFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, onFavorite }) => (
  <div className="recipe-card">
    <img src={image} alt={title} className="recipe-card__image" />
    <div className="recipe-card__content">
      <h2 className="recipe-card__title">{title}</h2>
      <button onClick={onFavorite} className="recipe-card__favorite">
        ❤️ Add to favorites
      </button>
    </div>
  </div>
);

export default RecipeCard;