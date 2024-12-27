import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";
import React from "react";

const SocialMediaIcons = () => {
  const socialMediaIconsArray = [
    { href: "https://www.linkedin.com/in/gup-abhi/", icon: <BsLinkedin /> },
    { href: "https://github.com/gup-abhi/", icon: <BsGithub /> },
    { href: "https://www.instagram.com/zang_abhi/", icon: <BsInstagram /> },
  ];
  return (
    <div className="flex justify-center md:justify-start my-10 gap-7">
      {socialMediaIconsArray.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-50 transition duration-500"
          whileHover={{
            scale: 1.2, // Enlarge on hover
          }}
          whileTap={{ scale: 0.9 }} // Shrink slightly on click
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {React.cloneElement(item.icon, { size: 25 })}
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
