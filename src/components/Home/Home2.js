import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function Home2() {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsReady(true);
    }
  }, [i18n.isInitialized]);

  if (!isReady) {
    return (
      <section className="min-h-screen relative">
        <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-white text-lg leading-relaxed text-justify px-4 md:px-8 space-y-6">
              <div className="h-[200px]"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative">
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-white text-lg leading-relaxed text-justify px-4 md:px-8 space-y-6">
            <p>
              {t("intro_name")}
              <span className="text-[#cd5ff8]">{t("intro_role")}</span>
              <br />
              {t("intro_what")}
              <span className="text-[#cd5ff8]">{t("intro_qualities")}</span>
            </p>

            <p>
              {t("content_years")}
              <br />
              {t("content_learned")}
              <span className="text-[#cd5ff8]">{t("content_skills")}</span>
              {t("content_use")}
            </p>

            <p>
              {t("code_since")}
              <span className="text-[#cd5ff8]">{t("code_what")}</span>
              <br />
              {t("code_how")}
              <span className="text-[#cd5ff8]">{t("code_qualities")}</span>
            </p>

            <div>
              <h2 className="text-2xl font-[500] text-[#cd5ff8] mb-4">
                {t("doing_title")}
              </h2>
              <p className="space-y-2">
                {t("doing_apps")}
                <br />
                {t("doing_transform")}
                <br />
                {t("doing_infra")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-[500] text-[#cd5ff8] mb-4">
                {t("tech_title")}
              </h2>
              <p>
                {t("tech_intro")}
                <br />
                <code className="block py-4 font-mono text-lg text-[#a388c0]">
                  {t("tech_stack")}
                </code>
                {t("tech_why")}
                <span className="text-[#cd5ff8]">{t("tech_goal")}</span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-[500] text-[#cd5ff8] mb-4">
                {t("looking_title")}
              </h2>
              <p className="space-y-2">
                {t("looking_projects")}
                <span className="text-[#cd5ff8]">
                  {t("looking_projects_highlight")}
                </span>
                {t("looking_projects_end")}
                <br />
                {t("looking_teams")}
                <span className="text-[#cd5ff8]">
                  {t("looking_teams_highlight")}
                </span>
                <br />
                {t("looking_products")}
                <span className="text-[#cd5ff8]">
                  {t("looking_products_highlight")}
                </span>
                {t("looking_products_end")}
                <br />
                {t("looking_growth")}
                <span className="text-[#cd5ff8]">
                  {t("looking_growth_highlight")}
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-2xl text-[#cd5ff8] mb-4">
                {t("bring_title")}
              </h2>
              <ul className="space-y-2 text-left list-none">
                <li>{t("bring_mastery")}</li>
                <li>{t("bring_technical")}</li>
                <li>{t("bring_product")}</li>
                <li>{t("bring_ship")}</li>
              </ul>
            </div>

            <p className="text-xl italic text-center text-[#a388c0] mt-12 mb-12">
              {t("outro_text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home2;
