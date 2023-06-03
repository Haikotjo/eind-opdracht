import React, { useState } from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import AllHeros from "./pages/Allheroes/Allheroes";
import AllComics from "./pages/AllComics/Allcomics";
import HeroCard from "./components/HeroCard";
import ComicCard from "./components/ComicCard";
// import Superhero from "./pages/Superhero";

function App() {
    // We houden in de state bij of iemand is "ingelogd" (simpele versie)
    const [isAuthenticated, toggleIsAuthenticated] = useState(false);

    return (
        <>
            <Router>
            <Navigation isAuth={isAuthenticated} toggleAuth={toggleIsAuthenticated} />
                <Routes>
                    <Route path="/AllHeros" element={<AllHeros />} />
                    <Route path="/AllComics" element={<AllComics />} />
                    <Route path="/hero/:id" element={<HeroCard />} />
                    <Route path="/comic/:id" element={<ComicCard />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
