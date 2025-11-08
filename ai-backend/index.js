require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY не знайдено в .env файлі!');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'AI Recipe Backend'
  });
});

app.post('/recipes', async (req, res) => {
  console.log('🍳 POST /recipes called');
  console.log('📝 Request body:', req.body);

  try {
    const { ingredients, mealType } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid ingredients. Expected non-empty array.',
        received: ingredients 
      });
    }

    if (!mealType || typeof mealType !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid mealType. Expected string.',
        received: mealType 
      });
    }

    const validIngredients = ingredients
      .filter(ing => ing && typeof ing === 'string' && ing.trim().length > 0)
      .map(ing => ing.trim());

    if (validIngredients.length === 0) {
      return res.status(400).json({ 
        error: 'No valid ingredients provided after filtering' 
      });
    }

    console.log('✅ Valid ingredients:', validIngredients);
    console.log('🍽️ Meal type:', mealType);

    const prompt = `Create exactly 2 recipes for ${mealType} using these ingredients: ${validIngredients.join(', ')}.

Return ONLY a valid JSON array with this exact structure:
[
  {
    "name": "Recipe Name",
    "country": "Country Name", 
    "flag": "🇺🇦",
    "description": "Brief description",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "steps": ["step 1", "step 2"]
  }
]

Requirements:
- Use as many provided ingredients as possible
- Add common ingredients if needed
- Each recipe should have 3-8 ingredients and 4-8 steps
- Return ONLY the JSON array, no other text`;

    console.log('🤖 Sending request to OpenAI...');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are a professional chef assistant. Always respond with valid JSON only."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const rawResponse = completion.choices[0].message.content;
    console.log('🎯 AI raw response:', rawResponse);

    let cleanedResponse = rawResponse.trim();
    
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\s*/, '').replace(/```\s*$/, '');
    }

    const jsonStart = cleanedResponse.indexOf('[');
    const jsonEnd = cleanedResponse.lastIndexOf(']');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('❌ No JSON array found in response');
      return res.status(500).json({ 
        error: 'No valid JSON array found in AI response',
        raw: rawResponse.substring(0, 500) + '...'
      });
    }

    const jsonString = cleanedResponse.slice(jsonStart, jsonEnd + 1);
    console.log('🔧 Extracted JSON:', jsonString);

    let recipes;
    try {
      recipes = JSON.parse(jsonString);
      
      if (!Array.isArray(recipes)) {
        throw new Error('Response is not an array');
      }

      recipes.forEach((recipe, index) => {
        const required = ['name', 'country', 'flag', 'description', 'ingredients', 'steps'];
        for (const field of required) {
          if (!recipe[field]) {
            throw new Error(`Recipe ${index} missing field: ${field}`);
          }
        }
        
        if (!Array.isArray(recipe.ingredients) || !Array.isArray(recipe.steps)) {
          throw new Error(`Recipe ${index} has invalid ingredients or steps array`);
        }
      });

      console.log('✅ Successfully parsed and validated recipes:', recipes.length);
      res.json(recipes);

    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError.message);
      console.error('🔍 Attempted to parse:', jsonString);
      
      return res.status(500).json({ 
        error: 'Failed to parse AI response as valid JSON',
        details: parseError.message,
        raw: rawResponse.substring(0, 500) + '...'
      });
    }

  } catch (error) {
    console.error('💥 Server error:', error);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Unable to connect to OpenAI service',
        details: 'Please check your internet connection and try again'
      });
    }
    
    if (error.status === 401) {
      return res.status(500).json({ 
        error: 'OpenAI API authentication failed',
        details: 'Invalid API key'
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Too many requests to OpenAI API',
        details: 'Please wait a moment and try again'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      type: error.constructor.name
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Recipe Backend',
    routes: ['/health', '/recipes']
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableRoutes: [
      'GET /health',
      'POST /recipes'
    ]
  });
});

app.use((error, req, res, next) => {
  console.error('💥 Unexpected error:', error);
  res.status(500).json({ 
    error: 'Unexpected server error',
    details: error.message
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 AI backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 OpenAI API key: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});