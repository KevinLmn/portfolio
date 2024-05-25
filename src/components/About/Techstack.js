import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiGit,
  DiJavascript1,
  DiNodejs,
  DiReact,
  DiSymfony
} from "react-icons/di";
import {
  SiAlgolia,
  SiC,
  SiCsharp,
  SiDocker,
  SiExpress,
  SiI18Next,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPostgresql,
  SiPrismic
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPhp />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiC />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCsharp />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiSymfony />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNestjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNextdotjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiGit />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostgresql />
      </Col>
      
      <Col xs={4} md={2} className="tech-icons">
        <SiPrismic />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAlgolia />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNuxtdotjs />
      </Col><Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col><Col xs={4} md={2} className="tech-icons">
        <SiExpress />
        </Col><Col xs={4} md={2} className="tech-icons">
        <SiI18Next />
      </Col>
    </Row>
  );
}

export default Techstack;
