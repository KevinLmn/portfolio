import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {
  DiGit,
  DiJavascript1,
  DiNodejs,
  DiReact,
  DiSymfony,
} from "react-icons/di";
import {
  SiAlgolia,
  SiC,
  SiDocker,
  SiExpress,
  SiGo,
  SiI18Next,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPostgresql,
  SiPrismic,
} from "react-icons/si";
import sylius from "../../Assets/sylius.png";

function Techstack() {
  const renderTooltip = (text) => <Tooltip id="button-tooltip">{text}</Tooltip>;
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Javascript")}>
          <div>
            <DiJavascript1 />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Express")}>
          <div>
            <SiExpress />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("NestJS")}>
          <div>
            <SiNestjs />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("MySQL")}>
          <div>
            <SiMysql />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("NextJS")}>
          <div>
            <SiNextdotjs />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Git")}>
          <div>
            <DiGit />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Docker")}>
          <div>
            <SiDocker />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Php")}>
          <div>
            <SiPhp />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Golang")}>
          <div>
            <SiGo />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Symfony")}>
          <div>
            <DiSymfony />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("NodeJs")}>
          <div>
            <DiNodejs />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("React")}>
          <div>
            <DiReact />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("PostGresQL")}>
          <div>
            <SiPostgresql />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Prismic")}>
          <div>
            <SiPrismic />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Algolia")}>
          <div>
            <SiAlgolia />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("NuxtJS")}>
          <div>
            <SiNuxtdotjs />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("i18n")}>
          <div>
            <SiI18Next />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("Sylius")}>
          <div>
            <img src={sylius} alt="sylius" className="w-25" />
          </div>
        </OverlayTrigger>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <OverlayTrigger placement="top" overlay={renderTooltip("C")}>
          <div>
            <SiC />
          </div>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}

export default Techstack;
