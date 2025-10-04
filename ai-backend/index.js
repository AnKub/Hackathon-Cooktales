// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const OpenAI = require("openai");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// app.post('/recipes', async (req, res) => {
//   const { ingredients, mealType } = req.body;
//   const prompt = `I want to cook ${mealType}. Here are the ingredients: ${ingredients.join(', ')}. Suggest 2 recipes in the format of a JSON array with the following fields: name, country, flag, description, ingredients, steps. Respond ONLY with a valid JSON array, no explanation, no markdown, no comments.`;

//   try {
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });
//     const text = completion.data.choices[0].message.content;
//     console.log('AI raw response:', text);

//     const jsonStart = text.indexOf('[');
//     const jsonEnd = text.lastIndexOf(']');
//     if (jsonStart === -1 || jsonEnd === -1) {
//       return res.status(500).json({ error: 'No array in response', raw: text });
//     }
//     let recipes;
//     try {
//       recipes = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
//     } catch (err) {
//       return res.status(500).json({ error: 'Invalid JSON from AI', raw: text });
//     }
//     res.json(recipes);
//   } catch (e) {
//     res.status(500).json({ error: "AI response parse error", raw: e.message });
//   }
// });

// app.listen(3001, () => console.log('AI backend running on http://localhost:3001'));