import { default as React, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
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

function Projects() {
  const { t } = useTranslation();
  const { trackProjectView } = useAnalytics();
  const [projectType, setProjectType] = useState("professional");
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
    prevArrow: <IoIosArrowBack size={24} />,
    nextArrow: <IoIosArrowForward size={24} />,
    customPaging: function (i) {
      return (
        <div
          style={{
            width: "12px",
            height: "12px",
            border: "2px solid rgba(199, 112, 240, 0.5)",
            borderRadius: "50%",
            background: "rgba(199, 112, 240, 0.2)",
            transition: "all 0.3s ease",
          }}
        />
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
      description: "Bot d'analyse de performance League of legends",
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

  const handleProjectClick = (project) => {
    trackProjectView(project.title, projectType);
    window.open(project.link, "_blank", "noopener,noreferrer");
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
    setCurrentImages([]);
    setCurrentImageIndex(0);
  };

  const ProjectImage = ({ src, alt, placeholder }) => {
    // Handle both WebP and fallback formats
    const imageSource = typeof src === "string" ? src : src && src.webp;
    const fallback =
      typeof src === "string" ? src : src && (src.fallback || src.webp); // Use webp as fallback if no fallback provided

    return (
      <picture>
        {imageSource && <source srcSet={imageSource} type="image/webp" />}
        <LazyLoadImage
          src={fallback}
          alt={alt}
          effect="blur"
          placeholderSrc={placeholder}
          wrapperClassName="project-image-wrapper"
          className="project-image"
        />
      </picture>
    );
  };

  const ProjectSlider = ({ images, title, onProjectClick }) => {
    const handleImageClick = (e) => {
      // If the click is on the arrow buttons or dots, let the slider handle it
      if (e.target.closest(".slick-arrow") || e.target.closest(".slick-dots")) {
        e.stopPropagation();
        return;
      }
      // Only call onProjectClick if it exists
      if (onProjectClick) {
        onProjectClick();
      }
    };

    return (
      <div onClick={handleImageClick}>
        <Slider {...sliderSettings}>
          {images &&
            images.map((image, index) => (
              <div key={index} className="slide-item">
                <ProjectImage
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  placeholder={image && image.fallback}
                />
              </div>
            ))}
        </Slider>
      </div>
    );
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          {t("projects.title")}{" "}
          <strong className="purple">{t("projects.work")}</strong>
        </h1>

        <div className="project-type-selector">
          <button
            className={`project-type-button ${
              projectType === "professional" ? "active" : ""
            }`}
            onClick={() => setProjectType("professional")}
          >
            {t("projects.professional")}
          </button>
          <button
            className={`project-type-button ${
              projectType === "personal" ? "active" : ""
            }`}
            onClick={() => setProjectType("personal")}
          >
            {t("projects.personal")}
          </button>
        </div>

        <div className="projects-wrapper">
          <div className="projects-row top-row">
            {(projectType === "professional"
              ? professionalProjects
              : personalProjects
            )
              .slice(0, 3)
              .map((project, index) => (
                <div
                  className="project-card"
                  key={index}
                  onClick={
                    projectType === "professional"
                      ? () => handleProjectClick(project)
                      : undefined
                  }
                  role={projectType === "professional" ? "link" : undefined}
                  aria-label={
                    projectType === "professional"
                      ? `Visit ${project.title} website`
                      : undefined
                  }
                  style={{
                    cursor:
                      projectType === "professional" ? "pointer" : "default",
                  }}
                >
                  <div className="project-image-container">
                    {project.images.length > 0 ? (
                      project.images.length > 1 ? (
                        <ProjectSlider
                          images={project.images}
                          title={project.title}
                          onProjectClick={
                            projectType === "professional"
                              ? () => handleProjectClick(project)
                              : undefined
                          }
                        />
                      ) : (
                        <div className="project-image-container">
                          <ProjectImage
                            src={project.images[0]}
                            alt={project.title}
                            placeholder={
                              project.images[0].webp
                                ? project.images[0].webp.replace(
                                    /\.(jpg|png|webp)$/,
                                    "-thumb.$1"
                                  )
                                : null
                            }
                          />
                        </div>
                      )
                    ) : (
                      <div className="project-image-placeholder">
                        <span>Image à venir</span>
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="projects-row bottom-row">
            {(projectType === "professional"
              ? professionalProjects
              : personalProjects
            )
              .slice(3, 5)
              .map((project, index) => (
                <div
                  className="project-card"
                  key={index + 3}
                  onClick={
                    projectType === "professional"
                      ? () => handleProjectClick(project)
                      : undefined
                  }
                  role={projectType === "professional" ? "link" : undefined}
                  aria-label={
                    projectType === "professional"
                      ? `Visit ${project.title} website`
                      : undefined
                  }
                  style={{
                    cursor:
                      projectType === "professional" ? "pointer" : "default",
                  }}
                >
                  <div className="project-image-container">
                    {project.images.length > 0 ? (
                      project.images.length > 1 ? (
                        <ProjectSlider
                          images={project.images}
                          title={project.title}
                          onProjectClick={
                            projectType === "professional"
                              ? () => handleProjectClick(project)
                              : undefined
                          }
                        />
                      ) : (
                        <div className="project-image-container">
                          <ProjectImage
                            src={project.images[0]}
                            alt={project.title}
                            placeholder={
                              project.images[0].webp
                                ? project.images[0].webp.replace(
                                    /\.(jpg|png|webp)$/,
                                    "-thumb.$1"
                                  )
                                : null
                            }
                          />
                        </div>
                      )
                    ) : (
                      <div className="project-image-placeholder">
                        <span>Image à venir</span>
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>

      {previewImage && (
        <div className="fullscreen-preview active" onClick={handleClosePreview}>
          <button className="fullscreen-close" onClick={handleClosePreview}>
            <AiOutlineClose />
          </button>
          <img src={previewImage} alt="Preview" className="fullscreen-image" />
          {currentImages.length > 1 && (
            <>
              <button
                className="fullscreen-nav fullscreen-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex =
                    (currentImageIndex - 1 + currentImages.length) %
                    currentImages.length;
                  setCurrentImageIndex(newIndex);
                  setPreviewImage(currentImages[newIndex]);
                }}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="fullscreen-nav fullscreen-next"
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex =
                    (currentImageIndex + 1) % currentImages.length;
                  setCurrentImageIndex(newIndex);
                  setPreviewImage(currentImages[newIndex]);
                }}
              >
                <IoIosArrowForward />
              </button>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default Projects;
