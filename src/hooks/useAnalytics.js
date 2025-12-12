import { useCallback, useEffect, useRef } from "react";

// Singleton flag to prevent multiple listener registrations
let listenersRegistered = false;
let pageLoadTime = Date.now();

const sendEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }
  window.gtag("event", eventName, eventParams);
};

// Throttle function to limit high-frequency events
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const useAnalytics = () => {
  const isInitialized = useRef(false);

  // Set up global listeners only ONCE
  useEffect(() => {
    if (listenersRegistered || isInitialized.current) {
      return;
    }

    isInitialized.current = true;
    listenersRegistered = true;

    // Track time spent on page when leaving
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = (Date.now() - pageLoadTime) / 1000;
        sendEvent("page_exit", {
          page_path: window.location.pathname,
          time_spent: timeSpent,
          timestamp: new Date().toISOString(),
        });
      } else {
        pageLoadTime = Date.now();
      }
    };

    // Throttled engagement handler (fires max once per 30 seconds)
    let lastEngagement = Date.now();
    const engagementInterval = 30000;

    const handleEngagement = throttle(() => {
      const now = Date.now();
      if (now - lastEngagement >= engagementInterval) {
        sendEvent("user_engagement", {
          page_path: window.location.pathname,
          engagement_time: engagementInterval / 1000,
          timestamp: new Date().toISOString(),
        });
        lastEngagement = now;
      }
    }, 5000); // Throttle to max once per 5 seconds

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Only add scroll listener (most useful for engagement), throttled
    window.addEventListener("scroll", handleEngagement, { passive: true });

    // Cleanup on unmount (though this should rarely happen for the singleton)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleEngagement);
      listenersRegistered = false;
    };
  }, []);

  // Track page view
  const trackPageView = useCallback((pageName) => {
    sendEvent("page_view", {
      page_name: pageName,
      page_path: window.location.pathname,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Specific tracking functions
  const trackProjectView = useCallback((projectName, projectType) => {
    sendEvent("project_view", {
      project_name: projectName,
      project_type: projectType,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackCVDownload = useCallback((language) => {
    sendEvent("cv_download", {
      language: language,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackSocialClick = useCallback((platform, linkType) => {
    sendEvent("social_click", {
      platform: platform,
      link_type: linkType,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackLanguageChange = useCallback((fromLanguage, toLanguage) => {
    sendEvent("language_change", {
      from_language: fromLanguage,
      to_language: toLanguage,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackScrollDepth = useCallback((depth) => {
    sendEvent("scroll_depth", {
      depth: depth,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackNavigation = useCallback((destination) => {
    sendEvent("navigation_click", {
      destination: destination,
      from_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackProjectLink = useCallback((projectName, linkType) => {
    sendEvent("project_link_click", {
      project_name: projectName,
      link_type: linkType,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return {
    trackPageView,
    trackProjectView,
    trackCVDownload,
    trackSocialClick,
    trackLanguageChange,
    trackScrollDepth,
    trackNavigation,
    trackProjectLink,
  };
};
