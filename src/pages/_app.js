import React from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { LanguageProvider } from "../LanguageContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <div className="bg-[#0a0416] min-h-screen text-white">
        <Navbar />
        <main className="pb-12 md:pb-16">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
