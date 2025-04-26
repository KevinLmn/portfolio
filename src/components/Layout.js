import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Particle from "./Particle";

const Layout = ({ children }) => (
  <div
    className="relative min-h-screen w-full flex flex-col"
    style={{ background: "#12001a" }}
  >
    <Navbar />
    <main className="relative z-20 flex-1 flex flex-col">
      <div className="absolute inset-0 pointer-events-none z-10">
        <Particle />
      </div>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
