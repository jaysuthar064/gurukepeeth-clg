import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import DisclosuresPage from './pages/DisclosuresPage';
import ExamHubPage from './pages/ExamHubPage';
import AdmissionPortalPage from './pages/AdmissionPortalPage';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="site-wrapper">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/academics/*" element={<AcademicsPage />} />
            <Route path="/admissions/apply" element={<AdmissionPortalPage />} />
            <Route path="/admissions/status" element={<AdmissionPortalPage defaultTab="status" />} />
            <Route path="/admissions/*" element={<AdmissionsPage />} />
            <Route path="/iqac/*" element={<IQACPage />} />
            <Route path="/naac/*" element={<NAACPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/disclosures" element={<DisclosuresPage />} />
            <Route path="/student-corner/*" element={<ExamHubPage />} />
            <Route path="/exam-hub/*" element={<ExamHubPage />} />
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
