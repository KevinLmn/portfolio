import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { SiSlack, SiUbuntu, SiVisualstudiocode } from "react-icons/si";

function Toolstack() {
  const renderTooltip = (text) => <Tooltip id="button-tooltip">{text}</Tooltip>;
  return (
    <div>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <OverlayTrigger placement="top" overlay={renderTooltip("Ubuntu")}>
            <div>
              <SiUbuntu />
            </div>
          </OverlayTrigger>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip("Visual Studio Code")}
          >
            <div>
              <SiVisualstudiocode />
            </div>
          </OverlayTrigger>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <OverlayTrigger placement="top" overlay={renderTooltip("Slack")}>
            <div>
              <SiSlack />
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
    </div>
  );
}

export default Toolstack;
