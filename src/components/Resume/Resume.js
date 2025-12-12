import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useLanguage } from "../../LanguageContext";

// Set up PDF.js worker for v9
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const containerRef = useRef(null);

  const pdfUrl = useMemo(
    () => `/pdf/Kevin-Lemniai-CV-${currentLanguage.toUpperCase()}.pdf`,
    [currentLanguage]
  );

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const padding = window.innerWidth < 640 ? 8 : 32;
        setContainerWidth(
          Math.min(900, containerRef.current.offsetWidth - padding)
        );
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="relative flex flex-col items-center min-h-screen w-full px-2 sm:px-4 pt-20 sm:pt-24 pb-2"
      style={{ background: "#12001a" }}
    >
      <div
        ref={containerRef}
        className="w-full max-w-4xl flex flex-col items-center mx-auto z-10 px-2 sm:px-4"
      >
        <a
          href={pdfUrl}
          download
          className="mb-8 px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-[#c770f0] to-[#8e44ad] text-white shadow-lg shadow-[#c770f0]/30 hover:from-[#8e44ad] hover:to-[#c770f0] transition-all duration-300"
        >
          {t("downloadCV")}
        </a>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="text-white text-center p-4">Loading PDF...</div>
          }
          error={
            <div className="text-red-500 text-center p-4">
              {t("errorLoadingPDF")}
            </div>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="my-1 shadow-lg rounded"
            />
          ))}
        </Document>
        <div className="mt-10" />
      </div>
    </div>
  );
}

export default Resume;
