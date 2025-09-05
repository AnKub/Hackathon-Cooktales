import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import NotFound from './components/NotFound/NotFound';
import AIRecipeAssistant from './pages/AIRecipeAssistant/AIRecipeAssistant';
import About from './pages/About/About';

const App: React.FC = () => (
  <Router>
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <div className="desktop-only">
          <Sidebar />
        </div>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/ai-assistant" element={<AIRecipeAssistant />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/About" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;