const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { ingredients, mealType } = req.body;
  const prompt = `I want to cook ${mealType}. Here are the ingredients: ${ingredients.join(', ')}. Suggest 2 recipes in the format of a JSON array with the following fields: name, country, flag, description, ingredients, steps. Respond ONLY with a valid JSON array, no explanation, no markdown, no comments.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    const text = completion.choices[0].message.content;

    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    if (jsonStart === -1 || jsonEnd === -1) {
      return res.status(500).json({ error: 'No array in response', raw: text });
    }
    let recipes;
    try {
      recipes = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    } catch (err) {
      return res.status(500).json({ error: 'Invalid JSON from AI', raw: text });
    }
    res.json(recipes);
  } catch (e) {
    res.status(500).json({ error: "AI response parse error", raw: e.message });
  }
};