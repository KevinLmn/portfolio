import { default as React, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Slider from "react-slick";

// WebP imports
import alpiq1 from "../../Assets/alpiq1.webp";
import alpiq2 from "../../Assets/alpiq2.webp";
import cvm from "../../Assets/cvm.webp";
import dashboard1 from "../../Assets/dashboard1.webp";
import dashboard2 from "../../Assets/dashboard2.webp";
import film1 from "../../Assets/film1.webp";
import film2 from "../../Assets/film2.webp";
import idw1 from "../../Assets/idw1.webp";
import idw2 from "../../Assets/idw2.webp";
import manga1 from "../../Assets/manga1.webp";
import manga2 from "../../Assets/manga2.webp";
import met1 from "../../Assets/met1.webp";
import met2 from "../../Assets/met2.webp";
import specta from "../../Assets/specta.webp";
import uptoo1 from "../../Assets/uptoo1.webp";
import uptoo2 from "../../Assets/uptoo2.webp";

// Fallback imports
import dashboard1Fallback from "../../Assets/dashboard1.jpg";
import dashboard2Fallback from "../../Assets/dashboard2.jpg";
import film1Fallback from "../../Assets/film1.png";
import film2Fallback from "../../Assets/film2.png";
import idw1Fallback from "../../Assets/idw1.jpg";
import idw2Fallback from "../../Assets/idw2.jpg";
import manga1Fallback from "../../Assets/manga1.png";
import manga2Fallback from "../../Assets/manga2.png";
import spectaFallback from "../../Assets/specta.jpg";
import uptoo1Fallback from "../../Assets/uptoo1.jpg";
import uptoo2Fallback from "../../Assets/uptoo2.jpg";

import { useAnalytics } from "../../hooks/useAnalytics";
import Particle from "../Particle";

function ProjectSlider({ images, title, link, onProjectClick, settings }) {
  const handleImageClick = (e) => {
    // Prevent click-through on slider controls
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
        {images.map((image, index) => (
          <div key={index} className="w-full h-[200px] md:h-[300px]">
            <ProjectImage
              src={image}
              alt={`${title} - Image ${index + 1}`}
              placeholder={image.fallback}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

function ProjectImage({ src, alt, placeholder }) {
  const imageSource = typeof src === "string" ? src : src && src.webp;
  const fallback =
    typeof src === "string" ? src : src && (src.fallback || src.webp);

  return (
    <picture className="w-full h-full">
      {imageSource && <source srcSet={imageSource} type="image/webp" />}
      <LazyLoadImage
        src={fallback}
        alt={alt}
        effect="blur"
        placeholderSrc={placeholder}
        className="w-full h-full object-cover rounded-lg"
      />
    </picture>
  );
}

function ProjectCard({ project, onProjectClick, sliderSettings }) {
  return (
    <div className="group bg-gradient-to-br from-[rgba(17,16,16,0.6)] to-[rgba(12,8,24,0.8)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className="relative overflow-hidden rounded-t-2xl">
        <ProjectSlider
          images={project.images}
          title={project.title}
          link={project.link}
          onProjectClick={onProjectClick}
          settings={sliderSettings}
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#cd5ff8] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400">{project.description}</p>
      </div>
    </div>
  );
}

function Projects() {
  const { t } = useTranslation();
  const { trackProjectView } = useAnalytics();
  const [activeType, setActiveType] = useState("professional");
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

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
    customPaging: function () {
      return (
        <div className="w-3 h-3 border-2 border-[rgba(199,112,240,0.5)] rounded-full bg-[rgba(199,112,240,0.2)] transition-all duration-300" />
      );
    },
  };

  const personalProjects = [
    {
      title: "Découverte Cinéma",
      images: [
        { webp: film1, fallback: film1Fallback },
        { webp: film2, fallback: film2Fallback },
      ],
      description: "Plateforme de découverte de films",
      link: "https://decouvertecinema.com",
    },
    {
      title: "Manga Collection",
      images: [
        { webp: manga1, fallback: manga1Fallback },
        { webp: manga2, fallback: manga2Fallback },
      ],
      description: "Application de gestion de collection de mangas",
      link: "https://mangacollection.com",
    },
    {
      title: "E-commerce Dashboard",
      images: [
        { webp: dashboard1, fallback: dashboard1Fallback },
        { webp: dashboard2, fallback: dashboard2Fallback },
      ],
      description: "Analytiques de performance e-commerce",
      link: "https://ecommerce-dashboard-demo.com",
    },
    {
      title: "Specta",
      images: [{ webp: specta, fallback: spectaFallback }],
      description: "Bot d'analyse de performance League of Legends",
      link: "https://specta-bot.com",
    },
  ];

  const professionalProjects = [
    {
      title: "iDealWine",
      images: [
        { webp: idw1, fallback: idw1Fallback },
        { webp: idw2, fallback: idw2Fallback },
      ],
      description: "Leader mondial des enchères de vin en ligne",
      link: "https://www.idealwine.com",
    },
    {
      title: "Alpiq",
      images: [{ webp: alpiq1 }, { webp: alpiq2 }],
      description: "Fournisseur d'énergie",
      link: "https://www.alpiq.com",
    },
    {
      title: "Met France",
      images: [{ webp: met1 }, { webp: met2 }],
      description: "Fournisseur d'énergie",
      link: "https://www.met.com",
    },
    {
      title: "Contre les Violences sur Mineurs",
      images: [{ webp: cvm }],
      description: "Association de protection de l'enfance",
      link: "https://www.contrelesviolencessurmineurs.fr",
    },
    {
      title: "Uptoo",
      images: [
        { webp: uptoo1, fallback: uptoo1Fallback },
        { webp: uptoo2, fallback: uptoo2Fallback },
      ],
      description: "Plateforme de recrutement et de mise en relation",
      link: "https://www.uptoo.fr",
    },
  ];

  const handleTypeChange = (type) => {
    console.log("Button clicked:", type);
    setActiveType(type);
    setPreviewImage(null);
    setCurrentImages([]);
    setCurrentImageIndex(0);
  };

  const handleProjectClick = (project) => {
    trackProjectView(project.title, activeType);
    window.open(project.link, "_blank", "noopener noreferrer");
  };

  const projects =
    activeType === "professional" ? professionalProjects : personalProjects;

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[rgba(17,16,16,0.582)] to-[rgba(12,8,24,0.904)] relative">
      <div className="absolute inset-0 pointer-events-none">
        <Particle />
      </div>
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
        <h1 className="text-4xl font-[500] text-white text-center mb-8 my-10">
          Mes <span className="text-[#cd5ff8]">Projets</span>
        </h1>

        <div className="flex justify-center gap-4 mb-12 relative z-10">
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

        <div className="flex flex-col gap-8">
          {/* First row */}
          <div className="grid grid-cols-3 gap-8">
            <ProjectCard
              project={projects[0]}
              onProjectClick={handleProjectClick}
              sliderSettings={sliderSettings}
            />
            <ProjectCard
              project={projects[1]}
              onProjectClick={handleProjectClick}
              sliderSettings={sliderSettings}
            />
            <ProjectCard
              project={projects[2]}
              onProjectClick={handleProjectClick}
              sliderSettings={sliderSettings}
            />
          </div>

          {/* Second row */}
          {activeType === "professional" ? (
            <div className="flex justify-center gap-8">
              <div className="w-[calc((100%-2rem)/3)]">
                <ProjectCard
                  project={projects[3]}
                  onProjectClick={handleProjectClick}
                  sliderSettings={sliderSettings}
                />
              </div>
              <div className="w-[calc((100%-2rem)/3)]">
                <ProjectCard
                  project={projects[4]}
                  onProjectClick={handleProjectClick}
                  sliderSettings={sliderSettings}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-[calc((100%-2rem)/3)]">
                <ProjectCard
                  project={projects[3]}
                  onProjectClick={handleProjectClick}
                  sliderSettings={sliderSettings}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
