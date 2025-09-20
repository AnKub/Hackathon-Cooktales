require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/recipes', async (req, res) => {
  const { ingredients, mealType } = req.body;
  const prompt = `Я хочу приготувати ${mealType}. Ось інгредієнти: ${ingredients.join(', ')}. Запропонуй 2 рецепти у форматі JSON-масиву з такими полями: name, country, flag, description, ingredients, steps.`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    const text = completion.data.choices[0].message.content;
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    const recipes = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    res.json(recipes);
  } catch (e) {
    res.status(500).json({ error: "AI response parse error", raw: e.message });
  }
});

app.listen(3001, () => console.log('AI backend running on http://localhost:3001'));