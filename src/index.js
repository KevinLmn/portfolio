import i18next from "i18next";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Disable console.log in production
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

const rootElement = document.getElementById("root");
const render = rootElement.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;

render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  rootElement
);

// Report web vitals
reportWebVitals((metric) => {
  // Log metrics to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }

  // You can also send metrics to your analytics service here
  // Example: sendToAnalytics(metric);
});
