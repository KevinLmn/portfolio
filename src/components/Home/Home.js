import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAnalytics } from "../../hooks/useAnalytics";

import Home2 from "./Home2";
import Type from "./Type";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function Home() {
  const { t } = useTranslation();
  const { trackPageView } = useAnalytics();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(/images/home-bg.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="w-full relative"
    >
      <div className="min-h-screen relative z-0">
        <div className="absolute inset-0 bg-[rgba(30,0,60,0.75)] z-0"></div>
        <div className="h-screen flex items-center relative z-10">
          <div className="relative z-20 w-full">
            <div className="container mx-auto px-4 md:px-14">
              <div className="flex flex-col md:flex-row items-center md:justify-between px-4">
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

                <div className="relative w-full max-w-[300px] md:max-w-[600px] h-[300px] md:h-[600px]">
                  <Image
                    src="/images/about.webp"
                    alt="laptop illustration"
                    fill
                    sizes="(max-width: 768px) 300px, 600px"
                    className="object-contain"
                    priority={false}
                    loading="lazy"
                    quality={75}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Home2 />
      </div>
    </div>
  );
}

export default Home;
