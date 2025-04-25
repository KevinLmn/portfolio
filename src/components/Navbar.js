import Link from "next/link";
import React, { memo, useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { AiOutlineFundProjectionScreen, AiOutlineHome } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

import { useAnalytics } from "../hooks/useAnalytics";
import { LanguageContext } from "../LanguageContext";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;

const LanguageFlag = memo(({ language, onClick }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-[#cd5ff8]/10 transition-colors"
  >
    <ReactCountryFlag
      countryCode={language === "fr" ? "FR" : "GB"}
      svg
      style={{
        width: "2em",
        height: "2em",
      }}
      title={language === "fr" ? "FR" : "GB"}
    />
  </button>
));

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const { trackNavigation } = useAnalytics();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = async () => {
    if (isChangingLang) return; // Prevent multiple clicks while changing
    setIsChangingLang(true);
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
    // Add a small delay to prevent rapid switching
    setTimeout(() => {
      setIsChangingLang(false);
    }, 300);
  };

  const handleNavClick = (destination) => {
    setIsOpen(false);
    trackNavigation(destination);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(10,4,22,0.8)] backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white text-xl font-medium hover:text-[#cd5ff8] transition-colors"
          >
            Kévin Lemniai
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              onClick={() => handleNavClick("home")}
              className="text-gray-300 hover:text-[#cd5ff8] transition-colors flex items-center gap-2"
            >
              <AiOutlineHome className="text-xl" />
              <span>{t("home")}</span>
            </Link>

            <Link
              href="/project"
              onClick={() => handleNavClick("projects")}
              className="text-gray-300 hover:text-[#cd5ff8] transition-colors flex items-center gap-2"
            >
              <AiOutlineFundProjectionScreen className="text-xl" />
              <span>{t("projects")}</span>
            </Link>

            <Link
              href="/resume"
              onClick={() => handleNavClick("resume")}
              className="text-gray-300 hover:text-[#cd5ff8] transition-colors flex items-center gap-2"
            >
              <CgFileDocument className="text-xl" />
              <span>{t("resume")}</span>
            </Link>

            <LanguageFlag language={language} onClick={handleLanguageChange} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-[#cd5ff8] transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-3 flex flex-col items-center">
          <Link
            href="/"
            onClick={() => handleNavClick("home")}
            className="text-gray-300 hover:text-[#cd5ff8] px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
          >
            <AiOutlineHome className="text-xl" />
            <span>{t("home")}</span>
          </Link>

          <Link
            href="/project"
            onClick={() => handleNavClick("projects")}
            className="text-gray-300 hover:text-[#cd5ff8] px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
          >
            <AiOutlineFundProjectionScreen className="text-xl" />
            <span>{t("projects")}</span>
          </Link>

          <Link
            href="/resume"
            onClick={() => handleNavClick("resume")}
            className="text-gray-300 hover:text-[#cd5ff8] px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
          >
            <CgFileDocument className="text-xl" />
            <span>{t("resume")}</span>
          </Link>

          <LanguageFlag language={language} onClick={handleLanguageChange} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
