import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { LanguageContext } from "../../LanguageContext";
import { useAnalytics } from "../../hooks/useAnalytics";
import Particle from "../Particle";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);
  const { t, i18n } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { trackCVDownload } = useAnalytics();
  const currentLanguage = i18n.language;
  const pdfPath =
    currentLanguage === "fr"
      ? "/pdf/Kevin-Lemniai-CV-FR.pdf"
      : "/pdf/Kevin-Lemniai-CV-EN.pdf";

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = () => {
    trackCVDownload(language);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const getScale = () => {
    if (width > 1200) return 1.2;
    if (width > 786) return 1;
    if (width > 576) return 0.8;
    return 0.6;
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[rgba(17,16,16,0.582)] to-[rgba(12,8,24,0.904)] relative">
      <div className="container mx-auto px-4 md:px-14 py-8 md:py-12 relative z-10">
        <Particle />
        <h1 className="text-4xl font-[500] text-white text-center mb-8 my-10">
          Mon <span className="text-[#cd5ff8]">CV</span>
        </h1>
        <div className="flex justify-center mb-5">
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownload}
            className="px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#c770f0] to-[#8e44ad] text-white shadow-lg shadow-[#c770f0]/30 w-fit mx-auto inline-flex items-center hover:shadow-xl hover:scale-105"
          >
            <AiOutlineDownload className="mr-2" />
            {t("downloadResume")}
          </a>
        </div>

        <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
          <Document
            file={pdfPath}
            className="w-full max-w-[800px]"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-center">Loading PDF...</div>}
            error={
              <div className="text-center text-red-500">
                Error loading PDF. Please try downloading instead.
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={getScale()}
                className="pdf-page"
                loading={<div className="text-center">Loading page...</div>}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default ResumeNew;
