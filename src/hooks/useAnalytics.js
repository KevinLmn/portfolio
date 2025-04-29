import { useEffect, useRef } from "react";

export const useAnalytics = () => {
  const eventQueue = useRef([]);
  const isOnline = useRef(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const pageLoadTime = useRef(Date.now());

  useEffect(() => {
    if (navigator.onLine) {
      // Browser is online, send any queued events
      sendQueuedEvents();
    } else {
      // Browser is offline, queue events
      window.addEventListener("online", sendQueuedEvents);
    }

    return () => {
      window.removeEventListener("online", sendQueuedEvents);
    };
  }, []);

  const sendEvent = (eventName, eventParams = {}) => {
    if (typeof window === "undefined") {
      // Queue event if window is not available
      queueEvent(eventName, eventParams);
      return;
    }

    if (!window.gtag) {
      // Queue event if gtag is not available
      queueEvent(eventName, eventParams);
      return;
    }

    // Send event to Google Analytics
    window.gtag("event", eventName, eventParams);
  };

  // Track page view
  const trackPageView = (pageName) => {
    sendEvent("page_view", {
      page_name: pageName,
      page_path: window.location.pathname,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  };

  // Specific tracking functions
  const trackProjectView = (projectName, projectType) => {
    sendEvent("project_view", {
      project_name: projectName,
      project_type: projectType,
      timestamp: new Date().toISOString(),
    });
  };

  const trackCVDownload = (language) => {
    sendEvent("cv_download", {
      language: language,
      timestamp: new Date().toISOString(),
    });
  };

  const trackSocialClick = (platform, linkType) => {
    sendEvent("social_click", {
      platform: platform,
      link_type: linkType,
      timestamp: new Date().toISOString(),
    });
  };

  const trackLanguageChange = (fromLanguage, toLanguage) => {
    sendEvent("language_change", {
      from_language: fromLanguage,
      to_language: toLanguage,
      timestamp: new Date().toISOString(),
    });
  };

  const trackScrollDepth = (depth) => {
    sendEvent("scroll_depth", {
      depth: depth,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackNavigation = (destination) => {
    sendEvent("navigation_click", {
      destination: destination,
      from_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProjectLink = (projectName, linkType) => {
    sendEvent("project_link_click", {
      project_name: projectName,
      link_type: linkType,
      timestamp: new Date().toISOString(),
    });
  };

  // Track time spent on page when leaving
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const timeSpent = (Date.now() - pageLoadTime.current) / 1000; // Convert to seconds
          sendEvent("page_exit", {
            page_path: window.location.pathname,
            time_spent: timeSpent,
            timestamp: new Date().toISOString(),
          });
        } else {
          pageLoadTime.current = Date.now();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, []);

  // Track user engagement
  useEffect(() => {
    if (typeof window !== "undefined") {
      let lastEngagement = Date.now();
      const engagementInterval = 30000; // 30 seconds

      const handleEngagement = () => {
        const now = Date.now();
        if (now - lastEngagement >= engagementInterval) {
          sendEvent("user_engagement", {
            page_path: window.location.pathname,
            engagement_time: engagementInterval / 1000,
            timestamp: new Date().toISOString(),
          });
          lastEngagement = now;
        }
      };

      const events = ["mousemove", "keydown", "scroll", "click"];
      events.forEach((event) => {
        window.addEventListener(event, handleEngagement);
      });

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, handleEngagement);
        });
      };
    }
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
