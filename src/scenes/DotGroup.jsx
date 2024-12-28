import AnchorLink from "react-anchor-link-smooth-scroll";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import { motion } from "framer-motion";

const dotGroupVariant = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        delay: 1.5,
        duration: 0.5,
        type: "spring",
        stiffness: 75,
        weight: 50,
      },
      opacity: {
        delay: 1.5,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
};

const DotGroup = ({ selectedPage, setSelectedPage }) => {
  const links = [
    { href: "#home", label: "home" },
    { href: "#about", label: "about" },
    { href: "#skills", label: "skills" },
    { href: "#projects", label: "projects" },
    { href: "#contact", label: "contact" },
  ];

  const selectedClass = `relative bg-pink-two before:absolute before:w-6 before:h-6 before:rounded-full
    before:border-2 before:border-yellow before:left-[-50%] before:top-[-50%]`;

  return (
    <motion.div
      variants={dotGroupVariant}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 fixed top-[60%] right-7"
    >
      {links.map((link, index) => (
        <AnchorLink
          key={link.label}
          href={link.href}
          className={`${
            selectedPage === link.label ? selectedClass : "bg-purple"
          } w-3 h-3 rounded-full`}
          onClick={() => {
            setSelectedPage(link.label);
            handleEventAnalytics("Dot Group", `Clicked ${link.label} dot`);
          }}
        />
      ))}
    </motion.div>
  );
};

export default DotGroup;
