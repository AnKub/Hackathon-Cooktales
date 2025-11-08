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

  // Константа для URL бекенду
  const AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || 'http://localhost:3001';

  // Перевірка статусу бекенду при завантаженні компонента
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
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Функція для створення короткого опису
  const createShortDescription = (aiRecipe: AIRecipe): string => {
    const ingredientsList = aiRecipe.ingredients.slice(0, 3).join(', ');
    const remainingCount = aiRecipe.ingredients.length - 3;
    const ingredientsText = remainingCount > 0 
      ? `${ingredientsList} and ${remainingCount} more ingredients`
      : ingredientsList;
    
    return `${aiRecipe.flag} ${aiRecipe.country} cuisine. Made with: ${ingredientsText}. ${aiRecipe.description}`;
  };

  // Функція для створення повного рецепта
  const createFullRecipe = (aiRecipe: AIRecipe): string => {
    const ingredientsSection = `🥘 INGREDIENTS:\n${aiRecipe.ingredients.map((ing, idx) => `${idx + 1}. ${ing}`).join('\n')}`;
    
    const stepsSection = `👨‍🍳 COOKING STEPS:\n${aiRecipe.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n\n')}`;
    
    const headerSection = `${aiRecipe.flag} ${aiRecipe.country} Recipe\n${aiRecipe.description}\n\n`;
    
    return `${headerSection}${ingredientsSection}\n\n${stepsSection}`;
  };

  // Функція для toggle favorite
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
    // Валідація на клієнті
    const validIngredients = ingredients
      .filter(ing => ing && ing.trim().length > 0)
      .map(ing => ing.trim());

    if (validIngredients.length === 0) {
      setError({
        message: 'Please add at least one ingredient',
        type: 'validation'
      });
      return;
    }

    if (!mealType || mealType.trim().length === 0) {
      setError({
        message: 'Please select a meal type',
        type: 'validation'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setRecipes([]);

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

      // Валідація структури кожного рецепта
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
      
      // Розрізняємо типи помилок для кращого UX
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

  const handleCheckBackend = () => {
    checkBackendHealth();
  };

  return (
    <div className="ai-recipe-assistant">
      <div className="container">
        <div className="ai-header">
          <h1>🤖 AI Recipe Assistant</h1>
          <p>Tell me what ingredients you have, and I'll suggest delicious recipes!</p>
          
          {/* Статус бекенду */}
          <div className={`backend-status backend-status--${backendStatus}`}>
            <span className="status-indicator"></span>
            <span className="status-text">
              AI Backend: {backendStatus === 'online' ? 'Online' : backendStatus === 'offline' ? 'Offline' : 'Checking...'}
            </span>
            {backendStatus === 'offline' && (
              <button onClick={handleCheckBackend} className="retry-button">
                Check Again
              </button>
            )}
          </div>
        </div>

        <div className="ai-form">
          <div className="form-section">
            <h3>Ingredients</h3>
            <div className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-input">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="input"
                  />
                  {ingredients.length > 1 && (
                    <button
                      onClick={() => removeIngredient(index)}
                      className="remove-button"
                      type="button"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addIngredient} className="add-button" type="button">
              + Add Ingredient
            </button>
          </div>

          <div className="form-section">
            <h3>Meal Type</h3>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="select"
            >
              <option value="breakfast">🌅 Breakfast</option>
              <option value="lunch">☀️ Lunch</option>
              <option value="dinner">🌙 Dinner</option>
              <option value="snack">🍪 Snack</option>
              <option value="dessert">🍰 Dessert</option>
            </select>
          </div>

          <button
            onClick={handleSuggest}
            disabled={loading || backendStatus === 'offline'}
            className={`suggest-button ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating recipes...
              </>
            ) : (
              <>🎯 Get Recipe Suggestions</>
            )}
          </button>
        </div>

        {/* Обробка помилок */}
        {error && (
          <div className={`error-message error-message--${error.type}`}>
            <div className="error-content">
              <h4>❌ {error.message}</h4>
              {error.details && <p>{error.details}</p>}
              {error.type === 'connection' && (
                <div className="error-actions">
                  <p>Try these steps:</p>
                  <ul>
                    <li>Make sure AI backend is running: <code>cd ai-backend && npm start</code></li>
                    <li>Check if port 3001 is available</li>
                    <li>Verify your OpenAI API key in .env file</li>
                  </ul>
                </div>
              )}
              <button onClick={handleRetry} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Результати */}
        {recipes.length > 0 && (
          <div className="ai-results">
            <h2>🍽️ AI Suggested Recipes ({recipes.length})</h2>
            <div className="recipes-grid">
              {recipes.map((aiRecipe, index) => {
                const recipeId = `ai-recipe-${index}`;
                const placeholderImage = `https://via.placeholder.com/300x200/667eea/white?text=${encodeURIComponent(aiRecipe.name)}`;
                
                return (
                  <div key={recipeId} className="ai-recipe-card-wrapper">
                    <div className="ai-badge">
                      🤖 AI Generated
                    </div>
                    
                    <RecipeCard
                      id={recipeId}
                      title={aiRecipe.name}
                      image={placeholderImage}
                      shortDescription={createShortDescription(aiRecipe)}
                      fullRecipe={createFullRecipe(aiRecipe)}
                      isFavorite={favoriteRecipes.has(recipeId)}
                      onFavorite={() => handleFavoriteToggle(recipeId)}
                    />
                    
                    <div className="country-info">
                      {aiRecipe.flag} {aiRecipe.country} Cuisine
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Якщо немає результатів і немає помилки */}
        {!loading && recipes.length === 0 && !error && (
          <div className="no-results">
            <h3>🔍 No recipes yet</h3>
            <p>Add some ingredients and click "Get Recipe Suggestions" to start!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecipeAssistant;