import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

import { useAnalytics } from "../../hooks/useAnalytics";
import Particle from "../Particle";

import Type from "./Type";

function Home() {
  const { t } = useTranslation();
  const { trackPageView } = useAnalytics();

  React.useEffect(() => {
    trackPageView("Home");
  }, [trackPageView]);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[rgba(17,16,16,0.582)] to-[rgba(12,8,24,0.904)] relative">
      <div className="absolute inset-0 pointer-events-none">
        <Particle />
      </div>
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t("home.title")}
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#cd5ff8] mb-6">
              <Type />
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {t("home.description")}
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-[#c770f0] to-[#8e44ad] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#c770f0]/30 transition-all duration-300"
              >
                {t("home.contactButton")}
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border border-[#c770f0] text-[#c770f0] rounded-full font-semibold hover:bg-[#c770f0] hover:text-white transition-all duration-300"
              >
                {t("home.projectsButton")}
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
            <Image
              src="/images/profile.webp"
              alt="Profile"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-full"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
