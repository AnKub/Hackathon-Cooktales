import React, { useState } from 'react';
import './AIRecipeAssistant.scss';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

const AIRecipeAssistant: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [mealType, setMealType] = useState(mealTypes[0]);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const addIngredient = () => {
    if (input && !ingredients.includes(input.trim().toLowerCase())) {
      setIngredients([...ingredients, input.trim().toLowerCase()]);
      setInput('');
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleSuggest = async () => {
    setLoading(true);
    setRecipes([]);
    // Тут буде запит до AI (зараз заглушка)
    setTimeout(() => {
      setRecipes([
        { name: 'Borscht', country: 'Ukraine', flag: '🇺🇦', description: 'Traditional beet soup.' },
        { name: 'Paella', country: 'Spain', flag: '🇪🇸', description: 'Rice dish with seafood.' }
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="ai-assistant-page">
      <h2>AI Recipe Assistant</h2>
      <div className="ai-input-block">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter ingredient..."
        />
        <button onClick={addIngredient}>Add</button>
      </div>
      <div className="ai-ingredients">
        {ingredients.map(ing => (
          <span key={ing} className="ai-ingredient">
            {ing}
            <button onClick={() => removeIngredient(ing)}>×</button>
          </span>
        ))}
      </div>
      <div className="ai-meal-type">
        {mealTypes.map(type => (
          <label key={type}>
            <input
              type="radio"
              checked={mealType === type}
              onChange={() => setMealType(type)}
            />
            {type}
          </label>
        ))}
      </div>
      <button className="ai-suggest-btn" onClick={handleSuggest} disabled={loading || ingredients.length === 0}>
        Suggest Recipes
      </button>
      {loading && (
        <div className="ai-loader">
          {/* Тут може бути SVG-анімація казанка */}
          <span role="img" aria-label="cauldron">🧙‍♀️🍲</span>
          <p>AI is thinking...</p>
        </div>
      )}
        <div className="ai-recipes">
        {recipes.map(recipe => (
          <div key={recipe.name} className="ai-recipe-card" onClick={() => setSelectedRecipe(recipe)}>
            <span className="ai-recipe-flag">{recipe.flag}</span>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="ai-modal">
          <div className="ai-modal-content">
            <button className="ai-modal-close" onClick={() => setSelectedRecipe(null)}>×</button>
            <h3>{selectedRecipe.name} {selectedRecipe.flag}</h3>
            <p>{selectedRecipe.description}</p>
            {/* Тут можна додати інгредієнти, кроки, кнопку "Add to Favorites" */}
            <button className="ai-favorite-btn">Add to Favorites ⭐</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecipeAssistant;