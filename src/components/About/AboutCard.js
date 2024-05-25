import React from "react";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  const {t} = useTranslation();

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {t('heyIAm')}<span className="purple"> Kevin Lemniai </span>
            {t('from')} <span className="purple"> {t('paris')}</span>
            <br />
            {t('currentlySearching')}
            <br />
            <br />
            {t('iHaveFollowed')}
            <br />
            <br />
            {t('iHaveSinceWorkedOn')}
            <br />
            <br />
            {t('apartFromCoding')}
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> {t('learningNewStuffs')} 
            </li>
            <li className="about-activity">
              <ImPointRight /> {t('playingGames')} 
            </li>
            <li className="about-activity">
              <ImPointRight /> {t('meetingPeople')}
            </li>
            <li className="about-activity">
              <ImPointRight /> {t('sport')}
            </li>
          </ul>

        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
