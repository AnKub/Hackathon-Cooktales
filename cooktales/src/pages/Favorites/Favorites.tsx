
import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { getFavorites, removeFavorite } from '../../api/favorites';
import type { FavoriteRecipe } from '../../api/favorites';
// import { account } from '../../appwrite';
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

 const handleRemoveFavorite = async (id: string) => {
  await removeFavorite(id);
  setFavorites(favorites.filter(f => f.id !== id));
};

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">Favorites</h2>
      {favorites.length === 0 ? (
        <div className="favorites-empty">Any favorites yet.</div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(recipe => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              shortDescription={recipe.shortDescription}
              fullRecipe={recipe.fullRecipe}
              isFavorite={true}
              onFavorite={() => handleRemoveFavorite(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;