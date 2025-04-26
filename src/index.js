import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AnalyticsProvider } from "./hooks/useAnalytics";
import { LanguageProvider } from "./LanguageContext";
import { i18n } from "./pages/_app";

// Disable console.log in production
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <AnalyticsProvider>
            <App />
          </AnalyticsProvider>
        </LanguageProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
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
