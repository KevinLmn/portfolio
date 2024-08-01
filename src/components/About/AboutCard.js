import React from "react";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  const { t } = useTranslation();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {t("heyIAm")}
            <span className="purple"> Kevin Lemniai </span>
            {t("from")} <span className="purple"> {t("paris")}</span>
            {t("currentlySearching")}
            <span className="purple"> {t("inRemote")} </span>
            {t("wheter")}
            <span className="purple">{t("inFranceOrWorldWine")}</span> {t("im")}
            <span className="purple">{t("openToFreelanceOrFullTime")}</span>
            <br />
            <br />
            {t("iHaveFollowed1")}
            <span className="purple">{t("42")}</span>
            {t("iHaveFollowed2")}
            <span className="purple">{t("wildCodeSchool")}</span>
            {t("theseExperiences")}
            <span className="purple">{t("solidExperiences")}</span>
            <br />
            <br />
            {t("iHaveSinceWorkedOn")}
            <span className="purple">{t("severalWordExperiences")}</span>
            {t("myApproach")}
            <span className="purple">{t("creatingARobustSolution")}</span>
            <br />
            <br />
            <br />
            {t("apartFromCoding")}
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> {t("learningNewStuffs")}
            </li>
            <li className="about-activity">
              <ImPointRight /> {t("playingGames")}
            </li>
            <li className="about-activity">
              <ImPointRight /> {t("meetingPeople")}
            </li>
            <li className="about-activity">
              <ImPointRight /> {t("sport")}
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
