import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";

import { useAnalytics } from "../../hooks/useAnalytics";
import Particle from "../Particle";

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
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="w-full h-[200px] md:h-[300px]">
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${title} - Image ${index + 1}`}
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

function ProjectCard({ project, onProjectClick, sliderSettings }) {
  return (
    <div className="group bg-gradient-to-br from-[rgba(17,16,16,0.6)] to-[rgba(12,8,24,0.8)] rounded-2xl overflow-hidden shadow-lg border border-[#cd5ff8]/10 hover:border-[#cd5ff8]/40 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
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
          {project.title}
        </h3>
        <p className="text-gray-400 text-center min-h-[40px] mt-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          {project.description}
        </p>
      </div>
    </div>
  );
}

function Projects() {
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
      title: "Découverte Cinéma",
      images: ["/images/film1.webp", "/images/film2.webp"],
      description: "Plateforme de découverte de films",
      link: "https://decouvertecinema.com",
    },
    {
      title: "Manga Collection",
      images: ["/images/manga1.webp", "/images/manga2.webp"],
      description: "Application de gestion de collection de mangas",
      link: "https://mangacollection.com",
    },
    {
      title: "E-commerce Dashboard",
      images: ["/images/dashboard1.webp", "/images/dashboard2.webp"],
      description: "Analytiques de performance e-commerce",
      link: "https://ecommerce-dashboard-demo.com",
    },
    {
      title: "Specta",
      images: ["/images/specta.webp"],
      description: "Bot d'analyse de performance League of Legends",
      link: "https://specta-bot.com",
    },
  ];

  const professionalProjects = [
    {
      title: "iDealWine",
      images: ["/images/idw1.webp", "/images/idw2.webp"],
      description: "Leader mondial des enchères de vin en ligne",
      link: "https://www.idealwine.com",
    },
    {
      title: "Alpiq",
      images: ["/images/alpiq1.webp", "/images/alpiq2.webp"],
      description: "Fournisseur d'énergie",
      link: "https://www.alpiq.com",
    },
    {
      title: "Met France",
      images: ["/images/met1.webp", "/images/met2.webp"],
      description: "Fournisseur d'énergie",
      link: "https://www.met.com",
    },
    {
      title: "Contre les Violences sur Mineurs",
      images: ["/images/cvm.webp"],
      description: "Association de protection de l'enfance",
      link: "https://www.contrelesviolencessurmineurs.fr",
    },
    {
      title: "Uptoo",
      images: ["/images/uptoo1.webp", "/images/uptoo2.webp"],
      description: "Plateforme de recrutement et de mise en relation",
      link: "https://www.uptoo.fr",
    },
  ];

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  const handleProjectClick = (project) => {
    trackProjectView(project.title, activeType);
    window.open(project.link, "_blank", "noopener noreferrer");
  };

  const projects =
    activeType === "professional" ? professionalProjects : personalProjects;

  return (
    <div
      className="min-h-screen relative pt-10 sm:pt-12"
      style={{ background: "#1a0826" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particle />
      </div>
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
        <h1 className="text-4xl font-[500] text-white text-center mb-12">
          Mes <span className="text-[#cd5ff8]">Projets</span>
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
              {type === "professional" ? "Professionnels" : "Personnels"}
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
