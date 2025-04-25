import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useAnalytics } from "../hooks/useAnalytics";

function Footer() {
  const { t } = useTranslation();
  const { trackSocialClick } = useAnalytics();

  let date = new Date();
  let year = date.getFullYear();

  const handleSocialClick = (platform) => {
    trackSocialClick(platform, "footer");
  };

  return (
    <Container fluid className="footer">
      <Row className="footer-container">
        <Col md="4" className="footer-copywright footer-open">
          <h3>{t("openToOffers")}</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>{year}</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/KevinLmn"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("github")}
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/kévin-lemniaï-70658125a/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick("linkedin")}
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
