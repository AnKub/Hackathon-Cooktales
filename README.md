# CookTales 🍳

## Project Description

**CookTales** is a modern web app for searching, saving, and generating recipes — designed especially for people who often cook for themselves and food enthusiasts who live alone. The idea is to help anyone prepare something tasty, even with a limited set of ingredients, when there's no one around to ask for cooking advice!

## Features

- **Recipe search** by dish name with filtering and sorting
- **Pagination** with lazy loading for smooth browsing
- **Save your favorite recipes** for quick access
- **AI Recipe Assistant** — powered by OpenAI GPT-3.5: enter your available ingredients, choose meal type (breakfast, lunch, dinner, snack, dessert), and get unique recipes you can actually cook with what you have
- **User authentication** via Firebase Auth (registration, login, favorites protection)
- **Responsive design** — works great on desktop and mobile devices
- **Dark/Light theme** support with CSS variables
- **Rate limiting protection** for AI requests

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Authentication:** Firebase Auth + Firestore
- **AI Integration:** OpenAI GPT-3.5 API via custom Node.js backend
- **Backend:** Node.js + Express (AI proxy server)
- **Styling:** SCSS with CSS variables for theming
- **Recipe Data:** TheMealDB API
- **State Management:** React Hooks

## Project Structure

```
Cooktales/
│
├─ cooktales/                # Frontend (React + TypeScript)
│    ├─ src/
│    │   ├─ components/      # Reusable components
│    │   ├─ pages/          # Page components
│    │   ├─ services/       # API services
│    │   ├─ styles/         # Global styles
│    │   └─ ...
│    └─ package.json
│
├─ ai-backend/               # AI backend proxy (Node.js)
│    ├─ index.js            # Express server
│    ├─ package.json
│    └─ .env                # OpenAI API key
│
└─ README.md
```

## How it works

1. **Search & Browse** — search recipes by name, filter by categories, navigate with pagination
2. **AI Generation** — add your available ingredients, select meal type, get personalized AI-generated recipes with cooking instructions
3. **Favorites System** — save recipes to your personal collection
4. **Authentication** — register/login to sync favorites across devices
5. **Responsive Experience** — seamless usage on any device

## Development Challenges

- **Appwrite Integration Issues** — Initial authentication setup with Appwrite had compatibility problems, leading to a migration to Firebase
- **AI Rate Limiting** — Implemented proper error handling and request throttling for OpenAI API limits
- **Time Constraints** — Hackathon deadline required prioritizing core features over polish

## Run Locally

### Prerequisites
- Node.js 18+
- OpenAI API key
- Firebase project setup

### Frontend
```bash
cd cooktales
npm install
npm run dev
```

### AI Backend
```bash
cd ai-backend
# Create .env file with: OPENAI_API_KEY=your_key_here
npm install
npm start
```

### Environment Setup
1. Create Firebase project and add config to frontend
2. Add OpenAI API key to `ai-backend/.env`
3. Ensure both servers are running (frontend: port 5173, backend: port 3001)

## Live Demo Features
- ✅ Recipe search and pagination
- ✅ AI recipe generation
- ✅ User authentication
- ✅ Favorites system
- ✅ Responsive design
- ⚠️ Rate limiting for AI requests (free tier)

## Note

This project was developed during a hackathon with focus on core functionality. The main challenge was AI integration complexity and OpenAI API rate limiting on free tier. Future improvements would include better caching, recipe image generation, and enhanced error handling.

## Author
 Junior Full-Stack Developer

---

**CookTales — your personal AI kitchen sidekick! 🤖👨‍🍳**