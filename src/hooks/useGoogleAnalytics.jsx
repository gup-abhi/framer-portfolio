import { useEffect } from "react";
import ReactGA from "react-ga4";

// Google Analytics Configuration
const GA_CONFIG = {
  measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID || "G-LQB72FRTH9",
  debug: process.env.REACT_APP_GA_DEBUG === "true" || process.env.NODE_ENV === "development",
  testMode: process.env.REACT_APP_GA_TEST_MODE === "true" || process.env.NODE_ENV === "development",
  gtagOptions: {
    send_page_view: false, // We'll handle page views manually
  }
};

// Initialize Google Analytics
export const initializeGA = () => {
  if (typeof window !== "undefined") {
    ReactGA.initialize(GA_CONFIG.measurementId, {
      debug: GA_CONFIG.debug,
      testMode: GA_CONFIG.testMode,
      gtagOptions: GA_CONFIG.gtagOptions,
    });
  }
};

// Enhanced page view tracking
export const useGoogleAnalytics = ({ selectedPage }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && selectedPage) {
      const pageTitle = selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1);
      ReactGA.send({ 
        hitType: "pageview", 
        page: `/${selectedPage}`,
        title: `Portfolio - ${pageTitle}`
      });
    }
  }, [selectedPage]);
};

// Enhanced event tracking with more parameters
export const handleEventAnalytics = (category, action, label = null, value = null, customParameters = {}) => {
  if (typeof window !== "undefined") {
    const eventData = {
      category,
      action,
      ...(label && { label }),
      ...(value && { value }),
      ...customParameters
    };
    
    ReactGA.event(eventData);
    
    // Log in development
    if (GA_CONFIG.debug) {
      console.log("GA Event:", eventData);
    }
  }
};

// Track user interactions
export const trackUserInteraction = (interactionType, element, additionalData = {}) => {
  handleEventAnalytics(
    "User Interaction",
    interactionType,
    element,
    null,
    {
      timestamp: new Date().toISOString(),
      ...additionalData
    }
  );
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  handleEventAnalytics(
    "Engagement",
    "Scroll Depth",
    `${depth}%`,
    Math.round(depth)
  );
};

// Track time on page
export const trackTimeOnPage = (timeSpent) => {
  handleEventAnalytics(
    "Engagement",
    "Time on Page",
    "seconds",
    Math.round(timeSpent)
  );
};

// Track form interactions
export const trackFormInteraction = (formName, action, fieldName = null) => {
  handleEventAnalytics(
    "Form Interaction",
    action,
    fieldName ? `${formName} - ${fieldName}` : formName
  );
};

// Track project interactions
export const trackProjectInteraction = (projectName, action, additionalData = {}) => {
  handleEventAnalytics(
    "Project Interaction",
    action,
    projectName,
    null,
    {
      project_name: projectName,
      ...additionalData
    }
  );
};

// Track social media clicks
export const trackSocialClick = (platform, action = "click") => {
  handleEventAnalytics(
    "Social Media",
    action,
    platform
  );
};

// Track download events
export const trackDownload = (fileName, fileType) => {
  handleEventAnalytics(
    "Download",
    "File Download",
    fileName,
    null,
    {
      file_name: fileName,
      file_type: fileType
    }
  );
};

// Track external link clicks
export const trackExternalLink = (url, linkText) => {
  handleEventAnalytics(
    "External Link",
    "Click",
    linkText,
    null,
    {
      link_url: url,
      link_text: linkText
    }
  );
};

// Track errors
export const trackError = (errorType, errorMessage, errorLocation) => {
  handleEventAnalytics(
    "Error",
    errorType,
    errorLocation,
    null,
    {
      error_message: errorMessage,
      error_location: errorLocation
    }
  );
};

// Track performance metrics
export const trackPerformance = (metricName, value, unit = "ms") => {
  handleEventAnalytics(
    "Performance",
    metricName,
    unit,
    Math.round(value)
  );
};

// Track language changes
export const trackLanguageChange = (fromLanguage, toLanguage) => {
  handleEventAnalytics(
    "Language",
    "Language Change",
    `${fromLanguage} to ${toLanguage}`,
    null,
    {
      from_language: fromLanguage,
      to_language: toLanguage
    }
  );
};

// Track device and browser info
export const trackDeviceInfo = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
    
    handleEventAnalytics(
      "Device Info",
      "Page Load",
      "Device Details",
      null,
      {
        user_agent: userAgent,
        screen_resolution: screenResolution,
        viewport_size: viewportSize,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    );
  }
};
