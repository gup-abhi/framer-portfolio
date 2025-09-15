import { useEffect } from "react";
import { trackError, trackPerformance } from "./useGoogleAnalytics";

// Error tracking hook
export const useErrorTracking = () => {
  useEffect(() => {
    // Track JavaScript errors
    const handleError = (error) => {
      trackError(
        "JavaScript Error",
        error.message,
        `${error.filename}:${error.lineno}:${error.colno}`
      );
    };

    // Track unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      trackError(
        "Unhandled Promise Rejection",
        event.reason?.message || "Unknown error",
        "Promise Rejection"
      );
    };

    // Track resource loading errors
    const handleResourceError = (event) => {
      if (event.target !== event.currentTarget) {
        trackError(
          "Resource Loading Error",
          `Failed to load ${event.target.tagName}`,
          event.target.src || event.target.href || "Unknown resource"
        );
      }
    };

    // Add event listeners
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    document.addEventListener("error", handleResourceError, true);

    // Cleanup
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      document.removeEventListener("error", handleResourceError, true);
    };
  }, []);
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackCoreWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ("PerformanceObserver" in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          trackPerformance("LCP", lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            trackPerformance("FID", entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          trackPerformance("CLS", clsValue);
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            trackPerformance("FCP", entry.startTime);
          });
        });
        fcpObserver.observe({ entryTypes: ["paint"] });

        // Time to Interactive (TTI) - approximate
        const ttiObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === "first-input") {
              trackPerformance("TTI", entry.startTime);
            }
          });
        });
        ttiObserver.observe({ entryTypes: ["first-input"] });
      }
    };

    // Track page load performance
    const trackPageLoadPerformance = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        
        // DNS lookup time
        const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
        if (dnsTime > 0) trackPerformance("DNS Lookup", dnsTime);
        
        // TCP connection time
        const tcpTime = timing.connectEnd - timing.connectStart;
        if (tcpTime > 0) trackPerformance("TCP Connection", tcpTime);
        
        // Request time
        const requestTime = timing.responseEnd - timing.requestStart;
        if (requestTime > 0) trackPerformance("Request Time", requestTime);
        
        // Response time
        const responseTime = timing.responseEnd - timing.responseStart;
        if (responseTime > 0) trackPerformance("Response Time", responseTime);
        
        // DOM processing time
        const domProcessingTime = timing.domComplete - timing.domLoading;
        if (domProcessingTime > 0) trackPerformance("DOM Processing", domProcessingTime);
        
        // Total page load time
        const totalLoadTime = timing.loadEventEnd - navigationStart;
        if (totalLoadTime > 0) trackPerformance("Total Load Time", totalLoadTime);
      }
    };

    // Track memory usage (if available)
    const trackMemoryUsage = () => {
      if (performance.memory) {
        const memory = performance.memory;
        trackPerformance("Memory Used", memory.usedJSHeapSize / 1024 / 1024, "MB");
        trackPerformance("Memory Total", memory.totalJSHeapSize / 1024 / 1024, "MB");
        trackPerformance("Memory Limit", memory.jsHeapSizeLimit / 1024 / 1024, "MB");
      }
    };

    // Initialize tracking
    trackCoreWebVitals();
    trackPageLoadPerformance();
    trackMemoryUsage();

    // Track memory usage periodically
    const memoryInterval = setInterval(trackMemoryUsage, 30000); // Every 30 seconds

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);
};

// Network monitoring hook
export const useNetworkMonitoring = () => {
  useEffect(() => {
    const trackNetworkInfo = () => {
      if ("connection" in navigator) {
        const connection = navigator.connection;
        trackPerformance("Connection Type", connection.effectiveType, "type");
        trackPerformance("Connection Speed", connection.downlink, "Mbps");
        trackPerformance("Connection RTT", connection.rtt, "ms");
        trackPerformance("Connection Save Data", connection.saveData ? 1 : 0, "boolean");
      }
    };

    // Track initial network info
    trackNetworkInfo();

    // Track network changes
    if ("connection" in navigator) {
      navigator.connection.addEventListener("change", trackNetworkInfo);
      
      return () => {
        navigator.connection.removeEventListener("change", trackNetworkInfo);
      };
    }
  }, []);
};
