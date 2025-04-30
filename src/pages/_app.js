import Head from "next/head";
import React from "react";
import { I18nextProvider } from "react-i18next";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Layout from "../components/Layout";
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
    <>
      <Head>
        <link rel="icon" type="image/webp" href="/favicon.webp" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Kevin Lemniai - Fullstack Developer</title>
        <meta
          name="description"
          content="Kevin Lemniai - Fullstack Developer. Portfolio, projects, and contact. Specialized in React, Node.js, and modern web technologies."
        />
        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Kevin Lemniai - Fullstack Developer"
        />
        <meta
          property="og:description"
          content="Portfolio, projects, and contact. Specialized in React, Node.js, and modern web technologies."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://kevinlemniai.fr/" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kevin Lemniai - Fullstack Developer"
        />
        <meta
          name="twitter:description"
          content="Portfolio, projects, and contact. Specialized in React, Node.js, and modern web technologies."
        />
        <meta name="twitter:image" content="/images/og-image.jpg" />
      </Head>
      <GoogleAnalytics />
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <div className=" min-h-screen text-white">
            <main className="pb-12 md:pb-16">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </main>
          </div>
        </LanguageProvider>
      </I18nextProvider>
    </>
  );
}
