import React, { memo, useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { AiOutlineFundProjectionScreen, AiOutlineHome } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics";

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
            to="/"
            className="text-white text-xl font-medium hover:text-[#cd5ff8] transition-colors"
          >
            Kévin Lemniai
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={() => handleNavClick("home")}
              className="text-gray-300 hover:text-[#cd5ff8] transition-colors flex items-center gap-2"
            >
              <AiOutlineHome className="text-xl" />
              <span>{t("home")}</span>
            </Link>

            <Link
              to="/project"
              onClick={() => handleNavClick("projects")}
              className="text-gray-300 hover:text-[#cd5ff8] transition-colors flex items-center gap-2"
            >
              <AiOutlineFundProjectionScreen className="text-xl" />
              <span>{t("projects")}</span>
            </Link>

            <Link
              to="/resume"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#cd5ff8]/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-between">
                <span
                  className={`block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-3 flex flex-col items-center">
            <Link
              to="/"
              onClick={() => handleNavClick("home")}
              className="text-gray-300 hover:text-[#cd5ff8] px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
            >
              <AiOutlineHome className="text-xl" />
              <span>{t("home")}</span>
            </Link>

            <Link
              to="/project"
              onClick={() => handleNavClick("projects")}
              className="text-gray-300 hover:text-[#cd5ff8] px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
            >
              <AiOutlineFundProjectionScreen className="text-xl" />
              <span>{t("projects")}</span>
            </Link>

            <Link
              to="/resume"
              onClick={() => handleNavClick("resume")}
              className="text-gray-300 hover:text-[#cd5ff8] px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2"
            >
              <CgFileDocument className="text-xl" />
              <span>{t("resume")}</span>
            </Link>

            <button
              onClick={handleLanguageChange}
              disabled={isChangingLang}
              className={`px-3 py-2 text-gray-300 hover:text-[#cd5ff8] rounded-md transition-colors flex items-center justify-center ${
                isChangingLang ? "opacity-50" : ""
              }`}
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
