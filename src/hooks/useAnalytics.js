import { useEffect, useRef } from "react";

export const useAnalytics = () => {
  const eventQueue = useRef([]);
  const isOnline = useRef(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const pageLoadTime = useRef(Date.now());

  useEffect(() => {
    const handleOnline = () => {
      isOnline.current = true;
      console.log("Browser is online, sending queued events");
      // Send queued events
      while (eventQueue.current.length > 0) {
        const { eventName, eventParams } = eventQueue.current.shift();
        sendEvent(eventName, eventParams);
      }
    };

    const handleOffline = () => {
      isOnline.current = false;
      console.log("Browser is offline, events will be queued");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const sendEvent = (eventName, eventParams = {}) => {
    if (typeof window === "undefined") {
      console.log("Window is undefined, queuing event:", eventName);
      eventQueue.current.push({ eventName, eventParams });
      return;
    }

    if (!window.gtag) {
      console.log("gtag is not available, queuing event:", eventName);
      eventQueue.current.push({ eventName, eventParams });
      return;
    }

    console.log("Attempting to send event:", eventName, eventParams);
    try {
      window.gtag("event", eventName, {
        ...eventParams,
        non_interaction: false,
        transport_type: "beacon",
      });
      console.log("Event sent successfully:", eventName);
    } catch (error) {
      console.error("Failed to send event:", eventName, error);
      eventQueue.current.push({ eventName, eventParams });
    }
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
