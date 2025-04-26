import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAnalytics } from "../hooks/useAnalytics";
import { useLanguage } from "../LanguageContext";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const { trackNavigation } = useAnalytics();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = () => {
    setIsChangingLang(true);
    const newLang = currentLanguage === "fr" ? "en" : "fr";
    changeLanguage(newLang);
    setTimeout(() => setIsChangingLang(false), 500);
  };

  const handleNavClick = (destination) => {
    setIsOpen(false);
    trackNavigation(destination);
  };

  // Custom nav link with underline animation
  const NavLink = ({ href, children, onClick, isActive, noUnderline }) => (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-block px-2 py-1 font-bold text-base leading-tight transition-colors duration-300
        ${isActive ? "text-[#be6adf]" : "text-white"}
        hover:text-[#cd5ff8] focus:text-[#cd5ff8]
        ${
          noUnderline
            ? ""
            : "overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[4px] after:w-0 after:bg-[#cd5ff8] after:transition-all after:duration-300 hover:after:w-full"
        }
      `}
    >
      {children}
    </Link>
  );

  // Determine active route (optional: you can use useRouter for more accuracy)
  const isActive = (path) =>
    typeof window !== "undefined" && window.location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-[#0a0416]/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
      `}
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <NavLink
              href="/"
              onClick={() => handleNavClick("accueil")}
              isActive={isActive("/")}
              noUnderline
            >
              <span className="text-3xl font-[800] tracking-tight select-none text-[#cd5ff8]">
                Kevin Lemniai
              </span>
            </NavLink>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <NavLink
              href="/"
              onClick={() => handleNavClick("accueil")}
              isActive={isActive("/")}
            >
              {t("navbar.accueil")}
            </NavLink>
            <NavLink
              href="/projects"
              onClick={() => handleNavClick("projects")}
              isActive={isActive("/projects")}
            >
              {t("navbar.projects")}
            </NavLink>
            <NavLink
              href="/resume"
              onClick={() => handleNavClick("resume")}
              isActive={isActive("/resume")}
            >
              {t("navbar.resume")}
            </NavLink>
            <button
              onClick={handleLanguageChange}
              disabled={isChangingLang}
              title={t("navbar.changeLanguage") || "Change language"}
              className={`ml-2 p-2 rounded-full cursor-pointer hover:bg-[#cd5ff8]/20 transition-transform duration-200
                hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-[#cd5ff8] focus:outline-none
                ${isChangingLang ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ReactCountryFlag
                countryCode={currentLanguage === "fr" ? "FR" : "GB"}
                svg
                style={{ width: "2em", height: "2em" }}
                title={currentLanguage === "fr" ? "FR" : "GB"}
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-[#cd5ff8] transition-colors duration-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#0a0416]/95 backdrop-blur-md z-40 transition-transform duration-300
            ${isOpen ? "translate-y-0" : "-translate-y-full"}
          `}
          style={{ WebkitBackdropFilter: "blur(8px)" }}
        >
          {/* Close button for mobile menu */}
          <button
            className="absolute top-4 right-6 text-white hover:text-[#cd5ff8] text-3xl focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <NavLink
              href="/"
              onClick={() => handleNavClick("accueil")}
              isActive={isActive("/")}
            >
              {t("navbar.accueil")}
            </NavLink>
            <NavLink
              href="/projects"
              onClick={() => handleNavClick("projects")}
              isActive={isActive("/projects")}
            >
              {t("navbar.projects")}
            </NavLink>
            <NavLink
              href="/resume"
              onClick={() => handleNavClick("resume")}
              isActive={isActive("/resume")}
            >
              {t("navbar.resume")}
            </NavLink>
            <button
              onClick={handleLanguageChange}
              disabled={isChangingLang}
              title={t("navbar.changeLanguage") || "Change language"}
              className={`p-2 rounded-full cursor-pointer hover:bg-[#cd5ff8]/20 transition-transform duration-200
                hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-[#cd5ff8] focus:outline-none
                ${isChangingLang ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ReactCountryFlag
                countryCode={currentLanguage === "fr" ? "FR" : "GB"}
                svg
                style={{ width: "2em", height: "2em" }}
                title={currentLanguage === "fr" ? "FR" : "GB"}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
