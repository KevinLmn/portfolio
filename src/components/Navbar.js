import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { AiOutlineFundProjectionScreen, AiOutlineHome } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAnalytics } from "../hooks/useAnalytics";
import { useLanguage } from "../LanguageContext";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const portalRef = useRef(null);
  const { currentLanguage, changeLanguage } = useLanguage();
  const { trackNavigation } = useAnalytics();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.createElement("div");
      container.id = "mobile-menu-portal";
      document.body.appendChild(container);
      portalRef.current = container;

      return () => {
        if (portalRef.current && portalRef.current.parentNode) {
          portalRef.current.parentNode.removeChild(portalRef.current);
          portalRef.current = null;
        }
      };
    }
  }, []);

  const handleLanguageChange = () => {
    setIsChangingLang(true);
    const newLang = currentLanguage === "fr" ? "en" : "fr";
    changeLanguage(newLang);
    setTimeout(() => setIsChangingLang(false), 500);
  };

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (router.pathname !== href) {
      router.push(href).then(() => {
        trackNavigation(href);
      });
    }
  };

  // Custom nav link with underline animation
  const NavLink = ({ href, children, onClick, noUnderline }) => (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        handleNavClick(href);
      }}
      className={`relative inline-block px-2 py-1 font-[300] text-xl leading-tight transition-colors duration-200
      hover:text-[#cd5ff8] focus:text-[#cd5ff8]
      ${!noUnderline ? "group" : ""}
    `}
      style={{ overflow: "hidden" }}
    >
      {children}
      {!noUnderline && (
        <span className="absolute left-0 bottom-0 w-full h-[4px] bg-[#cd5ff8] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 rounded-full" />
      )}
    </Link>
  );

  // Mobile menu overlay as a portal
  const mobileMenu = (
    <div
      className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#0a0416]/95 backdrop-blur-md z-50 transition-transform duration-300
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
        <NavLink href="/" onClick={() => handleNavClick("/")}>
          <AiOutlineHome className="inline mr-2 mb-1" />
          {t("navbar.accueil")}
        </NavLink>
        <NavLink href="/projects" onClick={() => handleNavClick("/projects")}>
          <AiOutlineFundProjectionScreen className="inline mr-2 mb-1" />
          {t("navbar.projects")}
        </NavLink>
        <NavLink href="/resume" onClick={() => handleNavClick("/resume")}>
          <CgFileDocument className="inline mr-2 mb-1" />
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
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${
          isScrolled
            ? "bg-[#0a0416]/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }
      `}
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center">
            <NavLink href="/" onClick={() => handleNavClick("/")} noUnderline>
              <span className="text-2xl font-[800] tracking-tight select-none text-[#cd5ff8]">
                Kevin Lemniai
              </span>
            </NavLink>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <NavLink href="/" onClick={() => handleNavClick("/")}>
              <AiOutlineHome className="inline mr-2 mb-1" />
              {t("navbar.accueil")}
            </NavLink>
            <NavLink
              href="/projects"
              onClick={() => handleNavClick("/projects")}
            >
              <AiOutlineFundProjectionScreen className="inline mr-2 mb-1" />
              {t("navbar.projects")}
            </NavLink>
            <NavLink href="/resume" onClick={() => handleNavClick("/resume")}>
              <CgFileDocument className="inline mr-2 mb-1" />
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
      </div>
      {/* Mobile menu overlay as portal */}
      {portalRef.current && createPortal(mobileMenu, portalRef.current)}
    </nav>
  );
}

export default Navbar;
