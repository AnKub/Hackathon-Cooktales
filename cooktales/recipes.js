const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (req, res) => {
  // Додай CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { ingredients, mealType } = req.body;
  
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    res.status(400).json({ error: 'Missing or invalid ingredients array' });
    return;
  }

  if (!mealType) {
    res.status(400).json({ error: 'Missing mealType' });
    return;
  }

  const prompt = `I want to cook ${mealType}. Here are the ingredients: ${ingredients.join(', ')}. Suggest 2 recipes in the format of a JSON array with the following fields: name, country, flag, description, ingredients, steps. Respond ONLY with a valid JSON array, no explanation, no markdown, no comments.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    
    const text = completion.choices[0].message.content;
    console.log('AI raw response:', text);

    // Більш надійний парсинг JSON
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\s*/, '').replace(/\s*```$/, '');
    }
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    const jsonStart = cleanText.indexOf('[');
    const jsonEnd = cleanText.lastIndexOf(']');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('No array in response:', text);
      return res.status(500).json({ error: 'No array in response', raw: text });
    }
    
    let recipes;
    try {
      recipes = JSON.parse(cleanText.slice(jsonStart, jsonEnd + 1));
      if (!Array.isArray(recipes)) {
        throw new Error('Response is not an array');
      }
    } catch (err) {
      console.error('Invalid JSON from AI:', text);
      return res.status(500).json({ error: 'Invalid JSON from AI', raw: text });
    }
    
    res.json(recipes);
  } catch (e) {
    console.error('AI error:', e);
    res.status(500).json({ error: "AI response parse error", raw: e.message });
  }
};