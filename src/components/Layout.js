import PropTypes from "prop-types";
import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Particle from "./Particle";

const Layout = ({ children }) => (
  <div
    className="relative min-h-screen w-full flex flex-col"
    style={{ background: "#12001a" }}
  >
    {/* Skip to main content link for accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#c770f0] focus:text-white focus:rounded-lg focus:outline-none"
    >
      Skip to main content
    </a>
    <header role="banner">
      <Navbar />
    </header>
    <main
      id="main-content"
      role="main"
      className="relative z-20 flex-1 flex flex-col"
    >
      <div className="absolute inset-0 pointer-events-none z-10">
        <Particle />
      </div>
      {children}
    </main>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
