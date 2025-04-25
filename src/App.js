import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Preloader from "../src/components/Pre";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects/Projects";
import Resume from "./components/Resume/ResumeNew";
import ScrollToTop from "./components/ScrollToTop";
import { useAnalytics } from "./hooks/useAnalytics";
import i18n from "./i18next";
import { LanguageContext } from "./LanguageContext";
import "./style.css";

function AppContent() {
  const [language, setLanguage] = useState("fr");
  const value = { language, setLanguage };
  const [load, updateLoad] = useState(true);
  const { trackLanguageChange, trackScrollDepth } = useAnalytics();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    trackLanguageChange("fr", language);
  }, [language, trackLanguageChange]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPercent =
            (window.scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100;
          if (scrollPercent >= 25 && scrollPercent < 50) {
            trackScrollDepth(25);
          } else if (scrollPercent >= 50 && scrollPercent < 75) {
            trackScrollDepth(50);
          } else if (scrollPercent >= 75) {
            trackScrollDepth(75);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackScrollDepth]);

  return (
    <LanguageContext.Provider value={value}>
      <Preloader load={load} />
      <div
        className="App min-h-screen flex flex-col"
        id={load ? "no-scroll" : "scroll"}
      >
        <Navbar />
        <ScrollToTop />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
