import { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import { motion } from "framer-motion";

const headingVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const translations = {
  en: {
    home: "home",
    about: "about",
    skills: "skills",
    projects: "projects",
    contact: "contact",
  },
  fr: {
    home: "accueil",
    about: "à propos",
    skills: "compétences",
    projects: "projets",
    contact: "contact",
  },
};

const Navbar = ({ selectedPage, setSelectedPage, language, setLanguage }) => {
  const [menuToggled, setMenuToggled] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const desktop = useMediaQuery("(min-width: 768px)");

  const handleLinkClick = (page) => {
    const lowerPage = page.toLowerCase();
    setSelectedPage(lowerPage);
    handleEventAnalytics("NavBar", `Clicked ${lowerPage} anchor`);
    setTimeout(() => setMenuToggled(false), 300);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
    handleEventAnalytics("Language", `Switched to ${newLanguage}`);
  };

  const Link = ({ page, label }) => {
    const lowerPage = page.toLowerCase();
    const isActive = selectedPage === lowerPage;
    
    return (
      <AnchorLink
        className={`relative group px-3 py-2 rounded-lg transition-all duration-200 block w-full text-left z-30 ${
          isActive
            ? "text-white bg-gradient-to-r from-purple to-pink shadow-lg shadow-purple/25"
            : hasShadow
            ? "text-deep-purple hover:text-purple hover:bg-purple/10"
            : "text-white hover:text-pink hover:bg-white/10 shadow-sm"
        }`}
        href={`#${lowerPage}`}
        onClick={() => handleLinkClick(page)}
      >
        <span className="relative z-10 font-medium text-white">{label}</span>
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-pink/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
        )}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple to-pink rounded-lg opacity-90 -z-10"></div>
        )}
      </AnchorLink>
    );
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setHasShadow(window.scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleClickOutside = (event) => {
      if (showLanguageMenu && !event.target.closest('.language-menu')) {
        setShowLanguageMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguageMenu]);

  const navBarClasses = hasShadow
    ? "bg-white/95 backdrop-blur-md text-deep-purple border-b border-white/30 shadow-lg"
    : "bg-deep-purple/95 backdrop-blur-md text-white border-b border-purple/30";

  return (
    <nav
      className={`fixed w-full z-40 top-0 py-4 transition-all duration-500 ${navBarClasses}`}
      style={
        hasShadow 
          ? { 
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)"
            } 
          : { 
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)"
            }
      }
    >
      <div className="flex items-center justify-between mx-auto w-5/6">
        <motion.h3
          variants={headingVariant}
          initial="hidden"
          animate="visible"
          className="font-poppins text-3xl font-bold relative group cursor-pointer"
        >
          <span className="relative z-10 bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent hover:from-pink hover:to-purple transition-all duration-200">
            {"<AG/>"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-pink/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
        </motion.h3>

        {desktop ? (
          <div className="flex justify-between items-center gap-8 font-source-code font-semibold text-md">
            {Object.keys(translations[language]).map((key, index) => (
              <motion.span
                key={index}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
              >
                <Link
                  key={key}
                  page={key}
                  label={translations[language][key]}
                />
              </motion.span>
            ))}
            
            {/* Language Switcher */}
            <div className="relative language-menu">
              <motion.button
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.1 * 5,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple/80 to-pink/80 hover:from-purple hover:to-pink transition-all duration-200 shadow-lg hover:shadow-purple/25 backdrop-blur-sm border border-white/20"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                aria-label="Change language"
              >
                <FaGlobe className="group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-sm font-semibold text-white">{language.toUpperCase()}</span>
              </motion.button>
              
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-50 border border-white/20 min-w-[120px]"
                >
                  <button
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-2 ${
                      language === 'en' ? 'bg-gradient-to-r from-purple to-pink text-white' : 'text-gray-700 hover:text-white'
                    }`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    <span className="text-sm">🇺🇸</span>
                    <span className="font-medium">English</span>
                  </button>
                  <button
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-2 ${
                      language === 'fr' ? 'bg-gradient-to-r from-purple to-pink text-white' : 'text-gray-700 hover:text-white'
                    }`}
                    onClick={() => handleLanguageChange('fr')}
                  >
                    <span className="text-sm">🇫🇷</span>
                    <span className="font-medium">Français</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Language Switcher for Mobile */}
            <div className="relative language-menu">
              <button
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple/80 to-pink/80 hover:from-purple hover:to-pink transition-all duration-200 shadow-lg hover:shadow-purple/25 backdrop-blur-sm border border-white/20"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                aria-label="Change language"
              >
                <FaGlobe className="group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-sm font-semibold text-white">{language.toUpperCase()}</span>
              </button>
              
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-50 border border-white/20 min-w-[120px]"
                >
                  <button
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-2 ${
                      language === 'en' ? 'bg-gradient-to-r from-purple to-pink text-white' : 'text-gray-700 hover:text-white'
                    }`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    <span className="text-sm">🇺🇸</span>
                    <span className="font-medium">English</span>
                  </button>
                  <button
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-2 ${
                      language === 'fr' ? 'bg-gradient-to-r from-purple to-pink text-white' : 'text-gray-700 hover:text-white'
                    }`}
                    onClick={() => handleLanguageChange('fr')}
                  >
                    <span className="text-sm">🇫🇷</span>
                    <span className="font-medium">Français</span>
                  </button>
                </motion.div>
              )}
            </div>
            
            <button
              className={`group rounded-full bg-gradient-to-r from-purple to-pink p-3 hover:from-pink hover:to-purple transition-all duration-200 shadow-lg hover:shadow-purple/25 backdrop-blur-sm border border-white/20`}
              onClick={() => setMenuToggled(!menuToggled)}
              aria-label="Toggle menu"
            >
              <AiOutlineMenu className="text-white group-hover:scale-110 transition-transform duration-200" size={20} />
            </button>
          </div>
        )}

        {!desktop && menuToggled && (
          <motion.div
            initial={{ opacity: 0, x: 350, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 350, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed right-0 top-0 h-full w-[280px] sm:w-[320px] md:w-[350px] bg-gradient-to-br from-deep-purple via-purple/90 to-pink/80 backdrop-blur-xl shadow-2xl z-50 border-l border-purple/40 flex flex-col`}
          >
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-white/20 bg-gradient-to-r from-purple/20 to-pink/20">
              <h3 className="font-poppins text-2xl font-bold text-white drop-shadow-lg">Menu</h3>
              <button 
                onClick={() => setMenuToggled(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 group"
                aria-label="Close menu"
              >
                <AiOutlineCloseCircle size={24} className="text-white group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>

            <div className="flex flex-col p-3 sm:p-4 relative flex-1 min-h-0">
              {/* Decorative background elements */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple/20 to-pink/20 rounded-full blur-2xl -translate-y-16 translate-x-16 z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue/20 to-purple/20 rounded-full blur-xl translate-y-8 -translate-x-8 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>
              
              {/* Navigation Links - Vertical Stack */}
              <div className="relative z-20 flex flex-col space-y-2 mt-4 flex-1 justify-center bg-black/10 rounded-lg p-2">
                {Object.keys(translations[language]).map((key) => (
                  <div key={key} className="w-full flex flex-col">
                    <Link
                      page={key}
                      label={translations[language][key]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Mobile Menu Overlay */}
        {!desktop && menuToggled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-purple/20 to-pink/20 backdrop-blur-sm z-40"
            onClick={() => setMenuToggled(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
