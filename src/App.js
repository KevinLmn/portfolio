import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Preloader from "../src/components/Pre";
import "./App.css";
import { LanguageContext } from "./LanguageContext";
import About from "./components/About/About";
import Inspiration from "./components/About/Inspiration";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects/Projects";
import Resume from "./components/Resume/ResumeNew";
import ScrollToTop from "./components/ScrollToTop";
import i18n from "./i18next";
import "./style.css";

function App() {
  const [language, setLanguage] = useState("fr");
  const value = { language, setLanguage };
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  console.log(language)

  return (
    <LanguageContext.Provider value={value}>
      <Router>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/inspirations" element={<Inspiration />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
