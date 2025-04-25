import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

import { useAnalytics } from "../hooks/useAnalytics";
// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function Footer() {
  const { t } = useTranslation();
  const { trackSocialClick } = useAnalytics();
  const year = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    trackSocialClick(platform, "footer");
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full md:h-16 h-12 bg-[#0a0416] z-50 border-t border-[#cd5ff8]/20">
      <div className="container mx-auto h-full">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 h-full items-center">
          <div className="text-center">
            <h3 className="text-white text-lg">{t("openToOffers")}</h3>
          </div>
          <div className="text-center">
            <h3 className="text-white text-lg">{year}</h3>
          </div>
          <div className="flex justify-center">
            <ul className="flex gap-8 items-center">
              <li>
                <a
                  href="https://github.com/KevinLmn"
                  className="text-white hover:text-[#cd5ff8] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("github")}
                >
                  <AiFillGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kévin-lemniaï-70658125a/"
                  className="text-white hover:text-[#cd5ff8] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("linkedin")}
                >
                  <FaLinkedinIn size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden grid grid-cols-2 h-full items-center px-4">
          <div className="text-left">
            <h3 className="text-white text-sm">{t("openToOffers")}</h3>
          </div>
          <div className="flex justify-end">
            <ul className="flex gap-6 items-center">
              <li>
                <a
                  href="https://github.com/KevinLmn"
                  className="text-white hover:text-[#cd5ff8] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("github")}
                >
                  <AiFillGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kévin-lemniaï-70658125a/"
                  className="text-white hover:text-[#cd5ff8] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick("linkedin")}
                >
                  <FaLinkedinIn size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
