import { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import { delay, motion } from "framer-motion";

const headingVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1,
      type: "spring",
      stiffness: 100,
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
  pt: {
    home: "início",
    about: "sobre",
    skills: "habilidades",
    projects: "projetos",
    contact: "contato",
  },
};

const Navbar = ({ selectedPage, setSelectedPage, language, setLanguage }) => {
  const [menuToggled, setMenuToggled] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const desktop = useMediaQuery("(min-width: 768px)");

  const handleLinkClick = (page) => {
    const lowerPage = page.toLowerCase();
    setSelectedPage(lowerPage);
    handleEventAnalytics("NavBar", `Clicked ${lowerPage} anchor`);
    setTimeout(() => setMenuToggled(false), 300);
  };

  const Link = ({ page, label }) => {
    const lowerPage = page.toLowerCase();
    return (
      <AnchorLink
        className={`${
          selectedPage === lowerPage
            ? "text-pink-two"
            : hasShadow
            ? "text-deep-purple"
            : "text-pink"
        } hover:text-fuchsia-600 transition duration-500`}
        href={`#${lowerPage}`}
        onClick={() => handleLinkClick(page)}
      >
        {label}
      </AnchorLink>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBarClasses = hasShadow
    ? "bg-light-pink text-deep-purple"
    : "bg-deep-purple text-white";

  return (
    <nav
      className={`fixed w-full z-40 top-0 py-6 transition-all duration-500 ${navBarClasses}`}
      style={
        hasShadow ? { boxShadow: "0 5px 10px 2.5px rgba(23, 7, 43, 0.6)" } : {}
      }
    >
      <div className="flex items-center justify-between mx-auto w-5/6">
        <motion.h3
          variants={headingVariant}
          initial="hidden"
          animate="visible"
          className="font-poppins text-3xl font-bold"
        >
          {"<AG/>"}
        </motion.h3>

        {desktop ? (
          <div className="flex justify-between items-center gap-16 font-source-code font-bold text-md font-semibold">
            {Object.keys(translations[language]).map((key, index) => (
              <motion.span
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  type: "spring",
                  stiffness: 75,
                }}
              >
                <Link
                  key={key}
                  page={key}
                  label={translations[language][key]}
                />
              </motion.span>
            ))}
          </div>
        ) : (
          <button
            className={`rounded-full bg-purple p-2`}
            onClick={() => setMenuToggled(!menuToggled)}
          >
            <AiOutlineMenu />
          </button>
        )}

        {!desktop && menuToggled && (
          <div
            className={`fixed right-0 bottom-0 h-full w-[250px] opacity-85 ${navBarClasses}`}
          >
            <div className="flex justify-end p-12">
              <button onClick={() => setMenuToggled(!menuToggled)}>
                <AiOutlineCloseCircle />
              </button>
            </div>

            <div className="flex flex-col gap-10 ml-5 text-2xl font-medium text-deep-blue justify-center items-start">
              {Object.keys(translations[language]).map((key) => (
                <Link
                  key={key}
                  page={key}
                  label={translations[language][key]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
