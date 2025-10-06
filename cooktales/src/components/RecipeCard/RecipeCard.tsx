import React, { useState } from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './RecipeCard.scss';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  title: string;
  image: string;
  shortDescription: string;
  fullRecipe: string;
  isFavorite: boolean;
  onFavorite: () => void;
  id?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  shortDescription,
  fullRecipe,
  isFavorite,
  onFavorite,
  id,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.recipe-card__favorite')) return;
    setShowModal(true);
  };

  return (
    <>
      <div
        className="recipe-card"
        onClick={handleCardClick}
        tabIndex={0}
        role="button"
        aria-label={`Open recipe ${title}`}
      >
        <div className="recipe-card__image-wrapper">
          <img src={image} alt={title} className="recipe-card__image" />
        </div>
        <h2 className="recipe-card__title">{title}</h2>
        <div className="recipe-card__desc">{shortDescription}</div>
      <FavoriteButton isFavorite={isFavorite} onToggle={onFavorite} />
      </div>

      {showModal && (
        <div className="recipe-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="recipe-modal" onClick={e => e.stopPropagation()}>
            <div className="recipe-modal__image-wrapper">
              <img src={image} alt={title} className="recipe-modal__image" />
            </div>
            <h2 className="recipe-modal__title">{title}</h2>
            <div className="recipe-modal__desc">{fullRecipe}</div>
            <div className="recipe-modal__actions">
              <button className="recipe-modal__close" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button
                className="recipe-modal__next"
                onClick={() => {
                  setShowModal(false);
                  if (id) navigate(`/recipe/${id}`);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;