"use client";

import React, { useState } from "react";

import Footer from "../components/Footer";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar";
import Preloader from "../components/Pre";
import Projects from "../components/Projects/Projects";
import ScrollToTop from "../components/ScrollToTop";
import { LanguageContext } from "../LanguageContext";

export default function Page() {
  const [load, setLoad] = useState(true);
  const [language, setLanguage] = useState("en");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Home />
        <Projects />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
