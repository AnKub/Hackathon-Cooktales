# Cooktales

## Project Description

**Cooktales** is a modern web app for searching, saving, and generating recipes — designed especially for people who often cook for themselves, and for those who live alone. The idea is to help anyone prepare something tasty, even with a limited set of ingredients, when there’s no one around (yet!) to cook for them.

## Features

- **Recipe search** by dish name.
- **Sorting and pagination** for easy browsing.
- **Save your favorite recipes** for quick access.
- **AI Recipe Assistant** — powered by OpenAI: enter your ingredients, choose meal type (breakfast, lunch, dinner), and get unique recipes you can actually cook with what you have.
- **User authentication** via Appwrite (registration, login, favorites protection).
- **Responsive design** — works great on desktop and mobile.
- **Modal windows** for full recipe view and adding to favorites.

## Tech Stack

- **React** (TypeScript)
- **Appwrite** (authentication, favorites)
- **OpenAI API** (AI recipe generation via custom backend proxy)
- **Node.js + Express** (AI backend proxy)
- **Vercel** (frontend deployment)
- **SCSS** (styling, variables, responsive)
- **TheMealDB API** (basic recipes)

## Project Structure

```
cooktales/
│
├─ cooktales/                # Frontend (React)
│    ├─ src/
│    └─ ...
│
├─ ai-backend/               # AI backend proxy (Node.js)
│    ├─ index.js
│    ├─ package.json
│    └─ .env
│
├─ README.md
└─ ...
```

## How it works

1. **Search** — enter a dish name, get recipes from TheMealDB.
2. **AI generation** — enter your ingredients, pick a meal type, click "Suggest Recipes" and get unique AI-powered recipes.
3. **Favorites** — save your favorite recipes for later.
4. **Authentication** — register to keep your favorites safe.

## Note

- I joined the hackathon a bit late, so not everything is perfectly polished, but the core features are working!
- AI generation is done via a custom backend proxy for OpenAI API key safety.
- Appwrite is used for secure and easy authentication.

## Run locally

### Frontend

```sh
cd cooktales/cooktales
npm install
npm start
```

### AI Backend

```sh
cd ai-backend
npm install
node index.js
```

## Author

[An Kub]

---

**Cooktales — your personal kitchen sidekick!**
