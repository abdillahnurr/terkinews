// router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeNews from './pages/Home';
import IndonesiaNews from './pages/IndonesiaNews';
import SavedNews from './pages/SavedNews';
import Programming from './pages/ProgrammingNews';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import SearchNews from './pages/SearchNews';

function AppRouter() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeNews />} />
        <Route path="/indonesia" element={<IndonesiaNews />} />
        <Route path="/saved" element={<SavedNews />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/search/:keyword" element={<SearchNews />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
