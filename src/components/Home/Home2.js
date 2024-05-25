import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  AiFillGithub
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import myImg from "../../Assets/avatar.svg";

function Home2() {
  const {t} = useTranslation();
  
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              {t('letMe')} <span className="purple"> {t('introduce')} </span>{t('myself')}
            </h1>
            <p className="home-about-body">
              {t('contentCreatorFor')}
              <br />
              <br />
              {t('iFellInLoveWith')}
              <br />
              <br />{t('iAmFluent')}
              <i>
                <b className="purple"> {t('typeScriptAndPhp')}</b>
              </i>
              {t('fromProExp')} 
                <i>
                  <b className="purple">{t('CAndCSharp')}</b>
                </i> 
                {t('comingFrom')}
              <br />
              <br />
              {t('myFieldOf')}
              <i>
                <b className="purple">{t('webTechno')}</b>
              </i>
              {t('alsoIn')}
              <i>
                <b className="purple">
                {t('graphismsAndVideoGames')}
                </b>
              </i>             
              <br />
              <br />
              {t('wheneverPossible')} <b className="purple">Node.js</b> {t('and')}
              <i>
                <b className="purple">
                  {" "}
                  {t('modernJSAnd')}
                </b>
              </i>
              &nbsp;{t('like')}
              <i>
                <b className="purple"> {t('reactAndNext')}</b>
              </i>
              {t('imNotAfraid')}
              <i>
                <b className="purple"> Unity</b>
              </i>
               {t('toCreate')}
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>{t('findMeOn')}</h1>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/KevinLmn"
                  style={{ color: "white" }}
                  target="_blank" 
                  rel="noopener noreferrer"
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
