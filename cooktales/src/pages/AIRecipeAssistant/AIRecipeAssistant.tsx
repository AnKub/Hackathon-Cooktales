import React, { useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './AIRecipeAssistant.scss';

interface AIRecipe {
  name: string;
  country: string;
  flag: string;
  description: string;
  ingredients: string[];
  steps: string[];
}

interface ErrorState {
  message: string;
  details?: string;
  type?: string;
}

const AIRecipeAssistant: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [mealType, setMealType] = useState<string>('dinner');
  const [recipes, setRecipes] = useState<AIRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [backendStatus, setBackendStatus] = useState<'unknown' | 'online' | 'offline'>('unknown');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Set<string>>(new Set());
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  const AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || 'http://localhost:3001';

  React.useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${AI_BACKEND_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setBackendStatus('online');
        console.log('✅ AI Backend is online');
      } else {
        setBackendStatus('offline');
        console.warn('⚠️ AI Backend responded with error:', response.status);
      }
    } catch (error) {
      setBackendStatus('offline');
      console.error('❌ AI Backend is offline:', error);
    }
  };

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients.filter(ing => ing.trim()), currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const createShortDescription = (aiRecipe: AIRecipe): string => {
    const ingredientsList = aiRecipe.ingredients.slice(0, 3).join(', ');
    const remainingCount = aiRecipe.ingredients.length - 3;
    const ingredientsText = remainingCount > 0 
      ? `${ingredientsList} and ${remainingCount} more ingredients`
      : ingredientsList;
    
    return `${aiRecipe.flag} ${aiRecipe.country} cuisine. Made with: ${ingredientsText}. ${aiRecipe.description}`;
  };

  const createFullRecipe = (aiRecipe: AIRecipe): string => {
    const ingredientsSection = `🥘 INGREDIENTS:\n${aiRecipe.ingredients.map((ing, idx) => `${idx + 1}. ${ing}`).join('\n')}`;
    const stepsSection = `👨‍🍳 COOKING STEPS:\n${aiRecipe.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n\n')}`;
    const headerSection = `${aiRecipe.flag} ${aiRecipe.country} Recipe\n${aiRecipe.description}\n\n`;
    
    return `${headerSection}${ingredientsSection}\n\n${stepsSection}`;
  };

  const handleFavoriteToggle = (recipeId: string) => {
    setFavoriteRecipes(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  const handleSuggest = async () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const minInterval = 3000;

    if (timeSinceLastRequest < minInterval) {
      const waitTime = Math.ceil((minInterval - timeSinceLastRequest) / 1000);
      setError({
        message: `Please wait ${waitTime} seconds before making another request`,
        type: 'rate_limit'
      });
      return;
    }

    const validIngredients = ingredients.filter(ing => ing && ing.trim().length > 0);

    if (validIngredients.length === 0) {
      setError({
        message: 'Please add at least one ingredient',
        type: 'validation'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setRecipes([]);
    setLastRequestTime(now);

    try {
      console.log('🚀 Sending request to AI backend...');
      console.log('📝 Ingredients:', validIngredients);
      console.log('🍽️ Meal type:', mealType);

      const response = await fetch(`${AI_BACKEND_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: validIngredients,
          mealType: mealType
        })
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        let errorDetails = '';

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          errorDetails = errorData.details || '';
        } catch {
          errorDetails = await response.text();
        }

        throw new Error(`${errorMessage}${errorDetails ? ': ' + errorDetails : ''}`);
      }

      const data = await response.json();
      console.log('✅ Received recipes:', data);

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected array of recipes');
      }

      if (data.length === 0) {
        setError({
          message: 'No recipes were generated. Try different ingredients or meal type.',
          type: 'no_results'
        });
        return;
      }

      const validRecipes = data.filter((recipe: any) => {
        const required = ['name', 'country', 'flag', 'description', 'ingredients', 'steps'];
        return required.every(field => recipe[field] && 
          (field === 'ingredients' || field === 'steps' 
            ? Array.isArray(recipe[field]) && recipe[field].length > 0
            : typeof recipe[field] === 'string' && recipe[field].trim().length > 0
          )
        );
      });

      if (validRecipes.length === 0) {
        throw new Error('No valid recipes in response');
      }

      setRecipes(validRecipes);
      console.log(`✅ Successfully loaded ${validRecipes.length} recipes`);

    } catch (error) {
      console.error('💥 Error in handleSuggest:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError({
          message: 'Unable to connect to AI service',
          details: 'Please make sure the AI backend is running on port 3001',
          type: 'connection'
        });
      } else {
        setError({
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
          type: 'api'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSuggest();
  };

  return (
    <div className="ai-assistant-page">
      <h2>🤖 AI Recipe Assistant</h2>

      <div className="backend-status">
        <span className={`status-indicator status-indicator--${backendStatus}`}></span>
        <span>AI Backend: {backendStatus === 'online' ? 'Online' : backendStatus === 'offline' ? 'Offline' : 'Checking...'}</span>
        {backendStatus === 'offline' && (
          <button onClick={checkBackendHealth} className="retry-button">
            Check Again
          </button>
        )}
      </div>

      <div className="ai-input-block">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="Add ingredient..."
          onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
        />
        <button onClick={addIngredient} disabled={!currentIngredient.trim()}>
          Add
        </button>
      </div>

      <div className="ai-ingredients">
        {ingredients.filter(ing => ing.trim()).map((ingredient, index) => (
          <div key={index} className="ai-ingredient">
            {ingredient}
            <button onClick={() => removeIngredient(index)}>×</button>
          </div>
        ))}
      </div>

      <div className="ai-meal-type">
        {['breakfast', 'lunch', 'dinner', 'snack', 'dessert'].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="mealType"
              value={type}
              checked={mealType === type}
              onChange={(e) => setMealType(e.target.value)}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>

      <button
        onClick={handleSuggest}
        disabled={loading || backendStatus === 'offline'}
        className="ai-suggest-btn"
      >
        {loading ? 'Generating...' : '🎯 Get Recipe Suggestions'}
      </button>

      {loading && (
        <div className="ai-loader">
          🤖
          <p>AI is cooking up some recipes...</p>
        </div>
      )}

      {error && (
        <div className={`error-message error-message--${error.type}`}>
          <h4>❌ {error.message}</h4>
          {error.details && <p>{error.details}</p>}
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="ai-recipes">
          {recipes.map((aiRecipe, index) => {
            const recipeId = `ai-recipe-${index}`;
            const placeholderImage = `https://via.placeholder.com/300x200/ff914d/ffffff?text=${encodeURIComponent(aiRecipe.name)}`;
            
            return (
              <div key={recipeId} className="ai-recipe-card">
                <div className="ai-recipe-flag">{aiRecipe.flag}</div>
                <h3>{aiRecipe.name}</h3>
                <p>{aiRecipe.country} • {aiRecipe.description}</p>
                
                <RecipeCard
                  id={recipeId}
                  title={aiRecipe.name}
                  image={placeholderImage}
                  shortDescription={createShortDescription(aiRecipe)}
                  fullRecipe={createFullRecipe(aiRecipe)}
                  isFavorite={favoriteRecipes.has(recipeId)}
                  onFavorite={() => handleFavoriteToggle(recipeId)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AIRecipeAssistant;