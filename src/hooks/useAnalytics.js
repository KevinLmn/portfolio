import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useAnalytics = () => {
  const location = useLocation();
  const eventQueue = useRef([]);
  const isOnline = useRef(navigator.onLine);
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

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
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

  useEffect(() => {
    // Track page views
    if (typeof window === "undefined") {
      console.log("Window is undefined, skipping page view");
      return;
    }

    if (!window.gtag) {
      console.log("gtag is not available, skipping page view");
      return;
    }

    const pageViewParams = {
      page_path: location.pathname + location.search,
      page_title: document.title,
      non_interaction: false,
      transport_type: "beacon",
    };

    console.log("Sending page view event:", pageViewParams);
    try {
      window.gtag("event", "page_view", pageViewParams);
      console.log("Page view sent successfully");
    } catch (error) {
      console.error("Failed to send page view:", error);
      eventQueue.current.push({
        eventName: "page_view",
        eventParams: pageViewParams,
      });
    }
  }, [location]);

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
      page: location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  // Track navigation menu clicks
  const trackNavigation = (destination) => {
    sendEvent("navigation_click", {
      destination: destination,
      from_path: location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  // Track project link clicks
  const trackProjectLink = (projectName, linkType) => {
    sendEvent("project_link_click", {
      project_name: projectName,
      link_type: linkType, // 'github' or 'demo'
      timestamp: new Date().toISOString(),
    });
  };

  // Track time spent on page when leaving
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = (Date.now() - pageLoadTime.current) / 1000; // Convert to seconds
        sendEvent("page_exit", {
          page_path: location.pathname,
          time_spent: timeSpent,
          timestamp: new Date().toISOString(),
        });
      } else {
        pageLoadTime.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location.pathname]);

  // Track user engagement
  useEffect(() => {
    let lastEngagement = Date.now();
    const engagementInterval = 30000; // 30 seconds

    const handleEngagement = () => {
      const now = Date.now();
      if (now - lastEngagement >= engagementInterval) {
        sendEvent("user_engagement", {
          page_path: location.pathname,
          engagement_time: engagementInterval / 1000, // Convert to seconds
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
  }, [location.pathname]);

  return {
    trackProjectView,
    trackCVDownload,
    trackSocialClick,
    trackLanguageChange,
    trackScrollDepth,
    trackNavigation,
    trackProjectLink,
  };
};
