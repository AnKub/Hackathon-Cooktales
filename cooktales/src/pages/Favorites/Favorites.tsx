import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { getFavorites, FavoriteRecipe } from '../../api/favorites';
import './Favorites.scss';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <div className="favorites-empty">You haven't added any favorites yet.</div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(recipe => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              onFavorite={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;