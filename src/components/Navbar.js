import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineFundProjectionScreen, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { CgFileDocument } from "react-icons/cg";
import { LanguageContext } from "../LanguageContext";
import { useAnalytics } from "../hooks/useAnalytics";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const { trackNavigation } = useAnalytics();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  const { t } = useTranslation();

  window.addEventListener("scroll", scrollHandler);

  const handleNavClick = (destination) => {
    updateExpanded(false);
    trackNavigation(destination);
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={`${navColour ? "sticky " : "navbar"} ${
        expand !== "expanded" ? "navbar-not-expanded" : ""
      }`}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex home-center home-div">
          <div className="home">Kévin Lemniai</div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => handleNavClick("home")}>
                <AiOutlineHome /> {t("home")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => handleNavClick("projects")}
              >
                <AiOutlineFundProjectionScreen /> {t("projects")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => handleNavClick("resume")}
              >
                <CgFileDocument /> {t("resume")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="language-flag-item">
              <Button
                className="button-country"
                onClick={() =>
                  language === "fr" ? setLanguage("en") : setLanguage("fr")
                }
              >
                {language === "fr" ? (
                  <ReactCountryFlag
                    countryCode="FR"
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                    title="FR"
                  />
                ) : (
                  <ReactCountryFlag
                    countryCode="GB"
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                    title="GB"
                  />
                )}
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
