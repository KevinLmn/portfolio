import React from "react";
import { useTranslation } from "react-i18next";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function Home() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: `url(/images/home-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
      className="w-full"
    >
      <div className="bg-gradient-to-bl from-[rgba(17,16,16,0.582)] to-[rgba(12,8,24,0.904)] min-h-screen">
        <section className="h-screen">
          <Particle />
          <div className="h-screen flex items-center">
            <div className="relative z-30 w-full">
              <div className="container mx-auto px-4 md:px-14">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 space-y-4 md:space-y-6 md:pl-16">
                    <h1 className="text-3xl md:text-4xl font-[500] text-white md:text-left">
                      {t("hiThere")} !{" "}
                      <span
                        className="wave inline-block"
                        role="img"
                        aria-labelledby="wave"
                      >
                        👋🏻
                      </span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                      <h1 className="text-3xl md:text-4xl font-normal text-white text-center md:text-left">
                        {t("im")}
                      </h1>
                      <h1 className="text-3xl md:text-4xl text-[#cd5ff8] text-center md:text-left font-black">
                        KEVIN LEMNIAI
                      </h1>
                    </div>
                    <div className="pt-8 md:pt-14 min-h-[32px] font-black">
                      <Type />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                    <img
                      src="/images/about.png"
                      alt="laptop illustration"
                      className="w-full max-w-[300px] md:max-w-[600px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Home2 />
      </div>
    </div>
  );
}

export default Home;
