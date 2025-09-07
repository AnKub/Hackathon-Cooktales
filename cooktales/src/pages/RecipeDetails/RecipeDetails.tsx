import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.scss';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="recipe-details__loading">Loading...</div>;
  if (!recipe) return <div className="recipe-details__notfound">Recipe not found</div>;

  return (
    <div className="recipe-details">
      <div className="recipe-details__card">
        <div className="recipe-details__image-wrapper">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-details__image" />
        </div>
        <h1 className="recipe-details__title">{recipe.strMeal}</h1>
        <div className="recipe-details__instructions">
          {recipe.strInstructions}
        </div>
        <button className="recipe-details__back" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
      <div className="recipe-details__recommendations">
        {/* Тут можна додати рекомендації (наприклад, інші рецепти) */}
      </div>
    </div>
  );
};

export default RecipeDetails;