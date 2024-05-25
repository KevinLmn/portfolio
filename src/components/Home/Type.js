import React from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

function Type() {
  const {t} = useTranslation();
  return (
    <Typewriter
      options={{
        strings: [
          "Software Developer",
          "Freelancer",
          t("contentCreator"),
          t('continuousLearner'),
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
