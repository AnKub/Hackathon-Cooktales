import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Home.scss';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="home-page">
      <h2 className="home-title">Discover Recipes</h2>
      {loading ? (
        <div className="home-loading">Loading...</div>
      ) : (
        <div className="home-grid">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.idMeal}
              title={recipe.strMeal}
              image={recipe.strMealThumb}
              onFavorite={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;