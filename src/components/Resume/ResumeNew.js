import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdf_EN from "../../Assets/Kevin-Lemniai-CV-EN.pdf";
import pdf_FR from "../../Assets/Kevin-Lemniai-CV-FR.pdf";
import { LanguageContext } from "../../LanguageContext";
import { useAnalytics } from "../../hooks/useAnalytics";
import Particle from "../Particle";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { trackCVDownload } = useAnalytics();

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
    if (width > 1200) return 1.7;
    if (width > 786) return 1.3;
    if (width > 576) return 0.9;
    return 0.6;
  };

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row
          style={{
            justifyContent: "center",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="primary"
            href={language === "fr" ? pdf_FR : pdf_EN}
            target="_blank"
            style={{ maxWidth: "250px" }}
            onClick={handleDownload}
          >
            <AiOutlineDownload />
            &nbsp;{t("downloadResume")}
          </Button>
        </Row>

        <Row className="resume">
          <Document
            file={language === "fr" ? pdf_FR : pdf_EN}
            className="d-flex justify-content-center"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="loading">Loading PDF...</div>}
            error={
              <div className="error">
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
                loading={<div>Loading page...</div>}
              />
            ))}
          </Document>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
