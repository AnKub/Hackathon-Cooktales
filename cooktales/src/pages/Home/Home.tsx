import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
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

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Фільтрація по пошуку
  const filteredRecipes = recipes.filter(recipe =>
    recipe.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  // Пагінація
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
                onFavorite={() => toggleFavorite(recipe.idMeal)}
              />
            ))}
          </div>
          {/* Пагінація */}
          <div className="home-pagination">
            {[...Array(Math.min(3, totalPages)).keys()].map(i => (
              <button
                key={i + 1}
                className={page === i + 1 ? 'active' : ''}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            {totalPages > 3 && <span>...</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;