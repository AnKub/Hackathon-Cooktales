import React from 'react';

interface RecipeCardProps {
  title: string;
  image: string;
  onFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, onFavorite }) => (
  <div className="rounded-lg shadow overflow-hidden flex flex-col">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <button
        onClick={onFavorite}
        className="mt-auto px-3 py-1 rounded border"
      >
        ❤️ Add to favorites
      </button>
    </div>
  </div>
);

export default RecipeCard;