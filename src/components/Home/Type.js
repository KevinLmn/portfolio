import React from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

function Type() {
  const { t } = useTranslation();
  return (
    <div className="text-2xl md:text-lg lg:text-[16px] font-normal text-[#be6adf] h-[32px] text-left">
      <Typewriter
        options={{
          strings: [
            "Software Developer",
            t("Freelancer"),
            t("contentCreator"),
            t("continuousLearner"),
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}

export default Type;
