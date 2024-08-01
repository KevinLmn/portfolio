import React from "react";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import { ImTwitch, ImYoutube } from "react-icons/im";

function InspirationCard() {
  const { t } = useTranslation();
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {t("asAYoungDev")}
            <br />
            <br />
            {t("hereAreAFew")}
            <br />
          </p>
          <div className="recommandations">
            <ul
              className="recommandations"
              style={{ listStyleType: "none", paddingLeft: 0 }}
            >
              <li className="inspiration-channel">
                <a
                  href="https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImYoutube /> Fireship
                </a>
                {t("fireshipDescription")}
              </li>
              <li className="inspiration-channel">
                <a
                  href="https://www.twitch.tv/theprimeagen"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImTwitch /> The Primeagen
                </a>
                {t("primeAgenDescription")}
              </li>
              <li className="inspiration-channel" style={{ textAlign: "justify" }}>
                <a
                  href="https://www.twitch.tv/piratesoftware"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImTwitch /> Pirate Software
                </a>
                {t("pirateSoftwareDescription")}
              </li>
              <li className="inspiration-channel">
                <a
                  href="https://www.youtube.com/channel/UCYbK_tjZ2OrIZFBvU6CCMiA"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImYoutube /> Brackeys
                </a>
                {t("brackeysDescription")}
              </li>
              <li className="inspiration-channel">
                <a
                  href="https://www.youtube.com/@acceptingtheuniverse"
                  style={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImYoutube /> {t("acceptingTheUniverse")}
                </a>
                {t("acceptingTheUniverseDescription")}
              </li>
            </ul>
          </div>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default InspirationCard;
