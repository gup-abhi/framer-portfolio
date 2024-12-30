// import AnchorLink from "react-anchor-link-smooth-scroll";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import { motion } from "framer-motion";

const dotVariant = (delay) => ({
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        delay: 0.5 * delay,
        duration: 0.5,
        type: "spring",
        stiffness: 75,
        weight: 50,
      },
      opacity: {
        delay: 0.5 * delay,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
});

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
      transition={{
        staggerChildren: 0.2,
      }}
      className="flex flex-col gap-6 fixed top-[60%] right-7"
    >
      {links.map((link, index) => (
        <motion.a
          initial="hidden"
          animate="visible"
          variants={dotVariant(5 - 1 - index)}
          key={link.label}
          href={link.href}
          viewport={{ once: true, amout: 1 }}
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
