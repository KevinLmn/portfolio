import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { Link } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { CgFileDocument } from "react-icons/cg";
import { LanguageContext } from "../LanguageContext";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  const { t } = useTranslation();

  window.addEventListener("scroll", scrollHandler);

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
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> {t("home")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser
                  style={{ marginBottom: "2px", whiteSpace: "nowrap" }}
                />{" "}
                {t("about")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                {t("projects")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> {t("resume")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/inspirations"
                onClick={() => updateExpanded(false)}
              >
                <ImBlog style={{ marginBottom: "2px" }} /> {t("inspirations")}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
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
            countryCode="US"
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
            title="US"
          />
        )}
      </Button>
    </Navbar>
  );
}

export default NavBar;
