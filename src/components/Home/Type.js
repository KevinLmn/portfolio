import React, { memo } from "react";
import Typewriter from "typewriter-effect";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

const Type = memo(function Type() {
  const strings = [
    "Software Developer",
    "Freelance",
    "Créateur de contenu",
    "Apprenant continu",
  ];

  return (
    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#be6adf] h-[48px] text-left">
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          cursor: "|",
          delay: 75,
          wrapperClassName: "typewriter-wrapper",
          cursorClassName: "typewriter-cursor",
        }}
      />
    </div>
  );
});

export default Type;
