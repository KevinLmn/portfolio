import React from "react";
import { I18nextProvider } from "react-i18next";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import i18n from "../i18n";
import { LanguageProvider } from "../LanguageContext";
import "../styles/globals.css";

// Ensure i18next is initialized only once
if (!i18n.isInitialized) {
  i18n.init();
}

// Export i18n instance for use in other files
export { i18n };

export default function App({ Component, pageProps }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <div className="bg-[#0a0416] min-h-screen text-white">
          <Navbar />
          <main className="pb-12 md:pb-16">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </I18nextProvider>
  );
}
