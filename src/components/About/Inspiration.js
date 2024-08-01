import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import laptopImg from "../../Assets/inspiration.jpg";
import Particle from "../Particle";
import InspirationCard from "./InspirationCard";

function Inspiration() {
  const { t } = useTranslation();
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={5}
            style={{
              paddingBottom: "10px",
              justifySelf: "center",
              display: "flex",
            }}
          >
            <img
              src={laptopImg}
              style={{ height: "auto", objectFit: "contain" }}
              alt="about"
              className="img-fluid laptop-image"
            />
          </Col>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              {t("my")} <strong className="purple">{t("inspirations")}</strong>
            </h1>
            <InspirationCard />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Inspiration;
