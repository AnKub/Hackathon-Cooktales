import React, { useState } from 'react';
import './AIRecipeAssistant.scss';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

const AIRecipeCard: React.FC<{ recipe: any; onClick: () => void }> = ({ recipe, onClick }) => (
  <div className="ai-recipe-card" onClick={onClick}>
    <span className="ai-recipe-flag">{recipe.flag}</span>
    <h3>{recipe.name}</h3>
    <p>{recipe.description}</p>
  </div>
);

const AIRecipeAssistant: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [mealType, setMealType] = useState(mealTypes[0]);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = () => {
    const trimmedInput = input.trim().toLowerCase();
    if (trimmedInput && !ingredients.includes(trimmedInput)) {
      setIngredients([...ingredients, trimmedInput]);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleSuggest = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setRecipes([]);
    setError(null);
    
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, mealType })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }
      
      if (Array.isArray(data) && data.length > 0) {
        setRecipes(data);
      } else {
        setError('AI did not return any recipes. Try different ingredients.');
      }
    } catch (e: any) {
      console.error('Error fetching recipes:', e);
      setError(e.message || 'Server error. Try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="ai-assistant-page">
      <h2>AI Recipe Assistant</h2>
      <div className="ai-input-block">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter ingredient..."
        />
        <button onClick={addIngredient} disabled={!input.trim()}>Add</button>
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
      <button 
        className="ai-suggest-btn" 
        onClick={handleSuggest} 
        disabled={loading || ingredients.length === 0}
      >
        {loading ? 'Generating...' : 'Suggest Recipes'}
      </button>
      
      {loading && (
        <div className="ai-loader">
          <span role="img" aria-label="cauldron">🧙‍♀️🍲</span>
          <p>AI is thinking...</p>
        </div>
      )}
      
      {error && (
        <div className="ai-error">
          <span>{error}</span>
        </div>
      )}
      
      <div className="ai-recipes">
        {recipes.map((recipe, index) => (
          <AIRecipeCard 
            key={recipe.name + index} 
            recipe={recipe} 
            onClick={() => setSelectedRecipe(recipe)} 
          />
        ))}
      </div>
      
      {selectedRecipe && (
        <div className="ai-modal" onClick={() => setSelectedRecipe(null)}>
          <div className="ai-modal-content" onClick={e => e.stopPropagation()}>
            <button className="ai-modal-close" onClick={() => setSelectedRecipe(null)}>×</button>
            <h3>{selectedRecipe.name} {selectedRecipe.flag}</h3>
            <p><strong>Description:</strong> {selectedRecipe.description}</p>
            {selectedRecipe.ingredients && (
              <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
            )}
            {selectedRecipe.steps && (
              <p><strong>Steps:</strong> {selectedRecipe.steps}</p>
            )}
            <button className="ai-favorite-btn">Add to Favorites ⭐</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecipeAssistant;