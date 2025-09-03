import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.scss';

type Recipe = {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
};

const RecipeDetails: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
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

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="recipe-details-loading">Loading...</div>;
  if (!recipe) return <div className="recipe-details-empty">Recipe not found.</div>;

  return (
    <div className="recipe-details-page">
      <h2 className="recipe-details-title">{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-details-image" />
      <h3>Ingredients</h3>
      <ul className="recipe-details-ingredients">
        {Object.keys(recipe)
          .filter(key => key.startsWith('strIngredient') && recipe[key])
          .map((key, idx) => (
            <li key={idx}>
              {recipe[key]} {recipe[`strMeasure${idx + 1}`]}
            </li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p className="recipe-details-instructions">{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;