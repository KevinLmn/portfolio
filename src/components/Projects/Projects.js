import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";

import { useAnalytics } from "../../hooks/useAnalytics";

// eslint-disable-next-line no-unused-vars
const _keepReact = React;

function ProjectSlider({ images, title, link, onProjectClick, settings }) {
  const handleImageClick = (e) => {
    if (e.target.closest(".slick-arrow") || e.target.closest(".slick-dots")) {
      e.stopPropagation();
      return;
    }
    onProjectClick({ title, link });
  };

  return (
    <div
      className="relative w-full h-[200px] md:h-[300px] cursor-pointer rounded-lg overflow-hidden"
      onClick={handleImageClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onProjectClick({ title, link });
        }
      }}
      aria-label={`View ${title} project details`}
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="w-full h-[200px] md:h-[300px]">
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${title} project screenshot ${index + 1} of ${images.length}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                priority={false}
                quality={75}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

ProjectSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  onProjectClick: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

ProjectSlider.defaultProps = {
  link: null,
};

function ProjectCard({ project, onProjectClick, sliderSettings }) {
  const { t } = useTranslation();
  return (
    <article className="group bg-gradient-to-br from-[rgba(17,16,16,0.6)] to-[rgba(12,8,24,0.8)] rounded-2xl overflow-hidden shadow-lg border border-[#cd5ff8]/10 hover:border-[#cd5ff8]/40 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden rounded-t-2xl">
        <ProjectSlider
          images={project.images}
          title={project.title}
          link={project.link}
          onProjectClick={onProjectClick}
          settings={sliderSettings}
        />
      </div>
      <div className="p-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mt-6 mb-2 text-center group-hover:text-[#cd5ff8] transition-colors duration-300">
          {t(`projectsPage.projectList.${project.key}.title`, project.title)}
        </h3>
        <p className="text-gray-400 text-center min-h-[40px] mt-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          {t(
            `projectsPage.projectList.${project.key}.description`,
            project.description
          )}
        </p>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
  onProjectClick: PropTypes.func.isRequired,
  sliderSettings: PropTypes.object.isRequired,
};

function Projects() {
  const { t } = useTranslation();
  const { trackProjectView } = useAnalytics();
  const [activeType, setActiveType] = useState("professional");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <IoIosArrowBack size={24} className="text-[#cd5ff8]" />,
    nextArrow: <IoIosArrowForward size={24} className="text-[#cd5ff8]" />,
    customPaging: () => (
      <div className="w-3 h-3 border-2 border-[rgba(199,112,240,0.5)] rounded-full bg-[rgba(199,112,240,0.2)] transition-all duration-300" />
    ),
  };

  const personalProjects = [
    {
      key: "cinema",
      title: t("projectsPage.projectList.cinema.title"),
      images: ["/images/film1.webp", "/images/film2.webp"],
      description: t("projectsPage.projectList.cinema.description"),
    },
    {
      key: "manga",
      title: t("projectsPage.projectList.manga.title"),
      images: ["/images/manga1.webp", "/images/manga2.webp"],
      description: t("projectsPage.projectList.manga.description"),
    },
    {
      key: "dashboard",
      title: t("projectsPage.projectList.dashboard.title"),
      images: ["/images/dashboard1.webp", "/images/dashboard2.webp"],
      description: t("projectsPage.projectList.dashboard.description"),
    },
    {
      key: "specta",
      title: t("projectsPage.projectList.specta.title"),
      images: ["/images/specta.webp"],
      description: t("projectsPage.projectList.specta.description"),
    },
  ];

  const professionalProjects = [
    {
      key: "idealwine",
      title: t("projectsPage.projectList.idealwine.title"),
      images: ["/images/idw1.webp", "/images/idw2.webp"],
      description: t("projectsPage.projectList.idealwine.description"),
      link: "https://www.idealwine.com",
    },
    {
      key: "alpiq",
      title: t("projectsPage.projectList.alpiq.title"),
      images: ["/images/alpiq1.webp", "/images/alpiq2.webp"],
      description: t("projectsPage.projectList.alpiq.description"),
      link: "https://www.alpiq.com",
    },
    {
      key: "met",
      title: t("projectsPage.projectList.met.title"),
      images: ["/images/met1.webp", "/images/met2.webp"],
      description: t("projectsPage.projectList.met.description"),
      link: "https://www.met.com",
    },
    {
      key: "cvm",
      title: t("projectsPage.projectList.cvm.title"),
      images: ["/images/cvm.webp"],
      description: t("projectsPage.projectList.cvm.description"),
      link: "https://www.contrelesviolencessurmineurs.fr",
    },
    {
      key: "uptoo",
      title: t("projectsPage.projectList.uptoo.title"),
      images: ["/images/uptoo1.webp", "/images/uptoo2.webp"],
      description: t("projectsPage.projectList.uptoo.description"),
      link: "https://www.uptoo.fr",
    },
  ];

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  const handleProjectClick = (project) => {
    trackProjectView(project.title, activeType);
    if (project.link) {
      window.open(project.link, "_blank", "noopener noreferrer");
    }
  };

  const projects =
    activeType === "professional" ? professionalProjects : personalProjects;

  return (
    <div
      className="min-h-screen relative pt-10 sm:pt-12"
      style={{ background: "#1a0826" }}
    >
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          {t("myRecent")}{" "}
          <span className="text-[#cd5ff8] font-bold">{t("projects")}</span>
        </h1>

        <div className="flex justify-center gap-4 mb-12">
          {["professional", "personal"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 cursor-pointer
                ${
                  activeType === type
                    ? "bg-gradient-to-r from-[#c770f0] to-[#8e44ad] text-white shadow-lg shadow-[#c770f0]/30"
                    : "text-[#c770f0] border border-[#c770f0] hover:bg-[#c770f0] hover:text-white hover:shadow-md hover:shadow-[#c770f0]/40"
                }`}
            >
              {type === "professional"
                ? t("projectsPage.professional")
                : t("projectsPage.personal")}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-12">
          {/* Top 3 projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onProjectClick={handleProjectClick}
                sliderSettings={sliderSettings}
              />
            ))}
          </div>

          {/* Bottom 2 centered */}
          {projects.length > 3 && (
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {projects.slice(3).map((project, index) => (
                <div
                  key={index}
                  className="w-full md:w-[48%] lg:w-[30%] flex justify-center"
                >
                  <ProjectCard
                    project={project}
                    onProjectClick={handleProjectClick}
                    sliderSettings={sliderSettings}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
