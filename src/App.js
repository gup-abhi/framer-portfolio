import Navbar from "./scenes/Navbar";
import DotGroup from "./scenes/DotGroup";
import Landing from "./scenes/Landing";
import Skills from "./scenes/Skills";
import AboutMe from "./scenes/AboutMe";
import Projects from "./scenes/Projects";
import Contact from "./scenes/Contact";
import Footer from "./scenes/Footer";

import LineGradient from "./components/LineGradient";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import useMediaQuery from "./hooks/useMediaQuery";
import { 
  useGoogleAnalytics, 
  initializeGA, 
  trackDeviceInfo, 
  trackTimeOnPage,
  trackScrollDepth,
  trackPerformance 
} from "./hooks/useGoogleAnalytics";
import { useErrorTracking, usePerformanceMonitoring, useNetworkMonitoring } from "./hooks/useErrorTracking";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import InitialLoading from "./components/InitialLoading";
import AnalyticsDebugger from "./components/AnalyticsDebugger";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [topOfPage, setTopOfPage] = useState(true);
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);
  const mediumScreens = useMediaQuery("(min-width: 1060px)");
  
  // Refs for tracking
  const pageStartTime = useRef(Date.now());
  const scrollDepthTracked = useRef(new Set());
  
  // Initialize Google Analytics
  useEffect(() => {
    initializeGA();
    trackDeviceInfo();
  }, []);
  
  // Initialize tracking hooks
  useGoogleAnalytics({ selectedPage });
  useErrorTracking();
  usePerformanceMonitoring();
  useNetworkMonitoring();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY === 0) {
            setTopOfPage(true);
          } else {
            setTopOfPage(false);
          }
          
          // Track scroll depth
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          
          // Track scroll milestones (25%, 50%, 75%, 100%)
          const milestones = [25, 50, 75, 100];
          milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !scrollDepthTracked.current.has(milestone)) {
              trackScrollDepth(milestone);
              scrollDepthTracked.current.add(milestone);
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    const trackTime = () => {
      const timeSpent = (Date.now() - pageStartTime.current) / 1000;
      trackTimeOnPage(timeSpent);
    };

    // Track time when component unmounts or page changes
    return () => {
      trackTime();
    };
  }, [selectedPage]);

  // Track performance metrics
  useEffect(() => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      
      trackPerformance("Page Load Time", loadTime);
      trackPerformance("DOM Content Loaded", domContentLoaded);
    }
  }, []);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      {!isLoading ? (
        <div className="app bg-deep-purple">
          <ScrollProgress />
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            topOfPage={topOfPage}
            language={language}
            setLanguage={setLanguage}
          />

          <div className="w-5/6 mx-auto">
            {mediumScreens && (
              <DotGroup
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            )}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              margin="0 0 -200px 0"
              amount="all"
              onViewportEnter={() => setSelectedPage("home")}
            >
              <Landing setSelectedPage={setSelectedPage} language={language} />
            </motion.div>
          </div>

          <LineGradient />

          <div className="w-5/6 mx-auto">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              margin="0 0 -200px 0"
              amount="all"
              onViewportEnter={() => setSelectedPage("about")}
            >
              <AboutMe language={language} />
            </motion.div>
          </div>

          <LineGradient />

          <div className="w-5/6 mx-auto">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              margin="0 0 -200px 0"
              amount="all"
              onViewportEnter={() => setSelectedPage("skills")}
            >
              <Skills language={language} />
            </motion.div>
          </div>

          <LineGradient />

          <div className="w-5/6 mx-auto">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              margin="0 0 -200px 0"
              amount="all"
              onViewportEnter={() => setSelectedPage("projects")}
            >
              <Projects language={language} />
            </motion.div>
          </div>

          <LineGradient />

          <div className="w-5/6 mx-auto">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              margin="0 0 -200px 0"
              amount="all"
              onViewportEnter={() => setSelectedPage("contact")}
            >
              <Contact language={language} />
            </motion.div>
          </div>

          <Footer />
          <BackToTop />
          <AnalyticsDebugger />
        </div>
      ) : (
        <>
          <InitialLoading setIsLoading={setIsLoading} />
        </>
      )}
    </>
  );
}

export default App;
