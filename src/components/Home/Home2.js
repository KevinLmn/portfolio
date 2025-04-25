import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useAnalytics } from "../../hooks/useAnalytics";

function Home2() {
  const { t } = useTranslation();
  const { trackSocialClick } = useAnalytics();

  const handleSocialClick = (platform) => {
    trackSocialClick(platform, "home");
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="home-about-description">
            <h1
              style={{
                fontSize: "3em",
                textAlign: "center",
                marginBottom: "2rem",
                fontWeight: "600",
              }}
            >
              Laissez moi <span className="purple">ME PRÉSENTER</span>
            </h1>
            <p
              className="home-about-body"
              style={{
                fontSize: "1.2em",
                lineHeight: "1.8",
                textAlign: "justify",
                padding: "0 2rem",
              }}
            >
              {t("intro_name")}
              <span className="purple">{t("intro_role")}</span>
              <br />
              {t("intro_what")}
              <span className="purple">{t("intro_qualities")}</span>
              <br />
              <br />
              {t("content_years")}
              <br />
              {t("content_learned")}
              <span className="purple">{t("content_skills")}</span>
              {t("content_use")}
              <br />
              <br />
              {t("code_since")}
              <span className="purple">{t("code_what")}</span>
              <br />
              {t("code_how")}
              <span className="purple">{t("code_qualities")}</span>
              <br />
              <br />
              <h2
                className="purple"
                style={{
                  fontSize: "1.5em",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {t("doing_title")}
              </h2>
              {t("doing_apps")}
              <br />
              {t("doing_transform")}
              <br />
              {t("doing_infra")}
              <br />
              <br />
              <h2
                className="purple"
                style={{
                  fontSize: "1.5em",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {t("tech_title")}
              </h2>
              {t("tech_intro")}
              <br />
              <div
                style={{
                  padding: "1rem 0",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                  color: "#a388c0",
                }}
              >
                {t("tech_stack")}
              </div>
              {t("tech_why")}
              <span className="purple">{t("tech_goal")}</span>
              <br />
              <br />
              <h2
                className="purple"
                style={{
                  fontSize: "1.5em",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {t("looking_title")}
              </h2>
              {t("looking_projects")}
              <span className="purple">{t("looking_projects_highlight")}</span>
              {t("looking_projects_end")}
              <br />
              {t("looking_teams")}
              <span className="purple">{t("looking_teams_highlight")}</span>
              <br />
              {t("looking_products")}
              <span className="purple">{t("looking_products_highlight")}</span>
              {t("looking_products_end")}
              <br />
              {t("looking_growth")}
              <span className="purple">{t("looking_growth_highlight")}</span>
              <br />
              <br />
              <h2
                className="purple"
                style={{
                  fontSize: "1.5em",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {t("bring_title")}
              </h2>
              <div style={{ paddingLeft: "1rem" }}>
                {t("bring_mastery")}
                <br />
                {t("bring_technical")}
                <br />
                {t("bring_product")}
                <br />
                {t("bring_ship")}
              </div>
              <br />
              <br />
              <p
                style={{
                  fontSize: "1.2em",
                  fontStyle: "italic",
                  marginTop: "2rem",
                  textAlign: "center",
                  color: "#a388c0",
                }}
              >
                {t("outro_text")}
              </p>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>{t("findMeOn")}</h1>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/KevinLmn"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display-4"
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
                  className="display-4"
                  onClick={() => handleSocialClick("linkedin")}
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
