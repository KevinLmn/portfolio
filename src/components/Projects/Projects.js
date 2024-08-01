import { default as React, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { SiSlack, SiUbuntu, SiVisualstudiocode } from "react-icons/si";
import alpiq1 from "../../Assets/alpiq1.webp";
import alpiq2 from "../../Assets/alpiq2.webp";
import cvm from "../../Assets/cvm.webp";
import idealwine1 from "../../Assets/idw1.webp";
import idealwine2 from "../../Assets/idw2.webp";
import met1 from "../../Assets/met1.webp";
import met2 from "../../Assets/met2.webp";
import Particle from "../Particle";

function Projects() {
  const [isProfessionnal, setIsProffessionnal] = useState(true);
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container
        style={{
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          justifySelf: "center",
        }}
      >
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <h2 style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <strong
              className={isProfessionnal ? "purple" : "white"}
              onClick={() => setIsProffessionnal(true)}
              style={{ cursor: "pointer" }}
            >
              Professionnal{" "}
            </strong>
            <strong
              style={{ color: "white" }}
              onClick={() => setIsProffessionnal(true)}
            >
              /
            </strong>
            <strong
              className={!isProfessionnal ? "purple" : "white"}
              onClick={() => {
                setIsProffessionnal(false);
              }}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Personal
            </strong>
          </div>
        </h2>
        {isProfessionnal ? (
          <Row
            style={{
              marginTop: "35px",
              display: "flex",
              justifyContent: "center",
              paddingBottom: "50px",
              gap: "20px",
              width: "full",
            }}
          >
            <Col xs={20} md={5} className="tech-icons">
              <a
                href="https://idealwine.com"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="white">iDealWine</h2>
                <Carousel data-interval="100">
                  <Carousel.Item>
                    <img
                      styles={{ objectFit: "fill" }}
                      src={idealwine1}
                      alt="about"
                      className="img-fluid laptop-image"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={idealwine2}
                      alt="about"
                      className="img-fluid laptop-image"
                    />
                  </Carousel.Item>
                </Carousel>
              </a>
            </Col>
            <Col xs={20} md={5} className="tech-icons">
              <a
                href="https://particuliers.alpiq.fr/"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="white">Alpiq</h2>
                <Carousel data-interval="100">
                  <Carousel.Item>
                    <img
                      src={alpiq1}
                      alt="about"
                      className="img-fluid laptop-image"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={alpiq2}
                      alt="about"
                      className="img-fluid laptop-image"
                    />
                  </Carousel.Item>
                </Carousel>
              </a>
            </Col>
            <Col xs={20} md={5} className="tech-icons">
              <a
                href="https://fr.met.com/fr"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="white">Met France</h2>
                <Carousel data-interval="100">
                  <Carousel.Item>
                    <img
                      src={met1}
                      alt="about"
                      className="img-fluid laptop-image"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={met2}
                      alt="about"
                      className="img-fluid laptop-image"
                    />
                  </Carousel.Item>
                </Carousel>
              </a>
            </Col>
            <Col xs={20} md={5} className="tech-icons">
              <a
                href="https://association-cvm.org/"
                style={{ color: "white", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="white">Contre les Violences sur Mineurs</h2>
                <img src={cvm} alt="about" className="img-fluid laptop-image" />
              </a>
            </Col>
          </Row>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <Col xs={40} md={20} className="tech-icons">
              <img
                src={idealwine1}
                alt="about"
                className="img-fluid laptop-image"
              />
              <SiUbuntu />
            </Col>
            <Col xs={4} md={2} className="tech-icons">
              <SiVisualstudiocode />
            </Col>
            <Col xs={4} md={2} className="tech-icons">
              <SiSlack />
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
