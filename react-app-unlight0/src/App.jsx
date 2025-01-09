import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CharacterList from "./components/CharacterList";
import CharacterForm from "./components/CharacterForm";
import StoryForm from "./components/StoryForm";
import CharacterDetails from "./components/CharacterDetails";
import AdminCharacterDetails from "./components/AdminCharacterDetails";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import RecentStories from "./components/RecentStories";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/characters/new" element={<CharacterForm />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/admin/characters/:id" element={<AdminCharacterDetails />} />
        <Route path="/stories/new" element={<StoryForm />} />
        <Route path="/recent-stories" element={<RecentStories />} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
      <div className="footer-placeholder"></div>
      <Footer />
    </Router>
  );
};

export default App;
