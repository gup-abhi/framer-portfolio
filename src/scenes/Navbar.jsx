import { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const Navbar = ({ selectedPage, setSelectedPage, language, setLanguage }) => {
  const [menuToggled, setMenuToggled] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const desktop = useMediaQuery("(min-width: 768px)");

  const Link = ({
    label,
    page,
    selectedPage,
    setSelectedPage,
    setMenuToggled,
  }) => {
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
        onClick={() => {
          setSelectedPage(lowerPage);
          handleEventAnalytics("NavBar", `Clicked ${lowerPage} anchor`);
          setTimeout(() => {
            setMenuToggled(false);
          }, 300);
        }}
      >
        {label}
      </AnchorLink>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-40 top-0 py-6 transition-all duration-500 bg-deep-purple ${
        hasShadow
          ? "bg-light-pink text-deep-purple"
          : "bg-deep-purple text-white"
      }`}
      style={
        hasShadow ? { boxShadow: "0 5px 10px 2.5px rgba(23, 7, 43, 0.6)" } : {}
      }
    >
      <div className="flex items-center justify-between mx-auto w-5/6 ">
        <h4 className="font-poppins text-3xl font-bold"> {`<AG/>`} </h4>

        {/* DESKTOP */}
        {desktop ? (
          <div className="flex justify-between items-center gap-16 font-source-code text-md font-semibold">
            <Link
              page="home"
              label={language === "pt" ? "início" : "home"}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              setMenuToggled={setMenuToggled}
            />
            <Link
              page="about"
              label={language === "pt" ? "sobre" : "about"}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              setMenuToggled={setMenuToggled}
            />
            <Link
              page="skills"
              label={language === "pt" ? "habilidades" : "skills"}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              setMenuToggled={setMenuToggled}
            />
            <Link
              page="projects"
              label={language === "pt" ? "projetos" : "projects"}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              setMenuToggled={setMenuToggled}
            />
            <Link
              page="contact"
              label={language === "pt" ? "contato" : "contact"}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              setMenuToggled={setMenuToggled}
            />
          </div>
        ) : (
          <button
            className="rounded-full bg-purple p-2"
            onClick={() => {
              setMenuToggled(!menuToggled);
            }}
          >
            <AiOutlineMenu />
          </button>
        )}

        {/* MOBILE */}
        {!desktop && menuToggled && (
          <div className="fixed right-0 bottom-0 h-full bg-light-purple w-[250px] opacity-85 ">
            <div className="flex justify-end p-12">
              <button onClick={() => setMenuToggled(!menuToggled)}>
                <AiOutlineCloseCircle />
              </button>
            </div>

            <div className="flex flex-col gap-10 ml-5 text-2xl text-deep-blue justify-center items-start ">
              <Link
                page="home"
                label={language === "pt" ? "início" : "home"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setMenuToggled={setMenuToggled}
              />
              <Link
                page="about"
                label={language === "pt" ? "sobre" : "about"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setMenuToggled={setMenuToggled}
              />
              <Link
                page="skills"
                label={language === "pt" ? "habilidades" : "skills"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setMenuToggled={setMenuToggled}
              />
              <Link
                page="projects"
                label={language === "pt" ? "projetos" : "projects"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setMenuToggled={setMenuToggled}
              />
              <Link
                page="contact"
                label={language === "pt" ? "contato" : "contact"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setMenuToggled={setMenuToggled}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
