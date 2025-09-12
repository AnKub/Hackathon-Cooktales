import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { addFavorite, removeFavorite, getFavorites} from '../../api/favorites';
import type { FavoriteRecipe } from '../../api/favorites';
import './Home.scss';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

const RECIPES_PER_PAGE = 12;

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchFavoritesIds = async () => {
      try {
        const favs = await getFavorites();
        setFavorites(favs.map(f => f.id));
      } catch (e) {
        setFavorites([]);
      }
    };
    fetchFavoritesIds();
  }, []);

  const handleFavorite = async (recipe: Recipe) => {
    if (favorites.includes(recipe.idMeal)) {
      await removeFavorite(recipe.idMeal);
      setFavorites(favorites.filter(id => id !== recipe.idMeal));
    } else {
      await addFavorite({
        id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        shortDescription: recipe.strInstructions ? recipe.strInstructions.slice(0, 80) + '...' : 'No description',
        fullRecipe: recipe.strInstructions || '',
      });
      setFavorites([...favorites, recipe.idMeal]);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * RECIPES_PER_PAGE,
    page * RECIPES_PER_PAGE
  );

  return (
    <div className="home-page">
      <h2 className="home-title">Mmm...</h2>
      <SearchBar value={search} onChange={setSearch} />
      {loading ? (
        <div className="home-loading">Loading...</div>
      ) : (
        <>
          <div className="home-grid">
            {paginatedRecipes.map(recipe => (
              <RecipeCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                title={recipe.strMeal}
                image={recipe.strMealThumb}
                shortDescription={recipe.strInstructions ? recipe.strInstructions.slice(0, 80) + '...' : 'No description'}
                fullRecipe={recipe.strInstructions || ''}
                isFavorite={favorites.includes(recipe.idMeal)}
                onFavorite={() => handleFavorite(recipe)}
              />
            ))}
          </div>
          <div className="home-pagination">
            {[...Array(totalPages).keys()].map(i => (
              <button
                key={i + 1}
                className={page === i + 1 ? 'active' : ''}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;