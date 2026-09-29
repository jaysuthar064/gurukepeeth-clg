import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import IQACPage from './pages/IQACPage';
import NAACPage from './pages/NAACPage';
import FacultyPage from './pages/FacultyPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="site-wrapper">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/academics/*" element={<AcademicsPage />} />
            <Route path="/admissions/*" element={<AdmissionsPage />} />
            <Route path="/iqac/*" element={<IQACPage />} />
            <Route path="/naac/*" element={<NAACPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
