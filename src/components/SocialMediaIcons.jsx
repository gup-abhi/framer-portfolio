import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";
import React from "react";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const SocialMediaIcons = () => {
  const socialMediaIconsArray = [
    {
      href: "https://www.linkedin.com/in/gup-abhi/",
      icon: <BsLinkedin />,
      type: "linkedIn",
    },
    {
      href: "https://github.com/gup-abhi/",
      icon: <BsGithub />,
      type: "GitHub",
    },
    {
      href: "https://www.instagram.com/zang_abhi/",
      icon: <BsInstagram />,
      type: "Instagram",
    },
  ];
  return (
    <div className="flex justify-center md:justify-start my-10 gap-7">
      {socialMediaIconsArray.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{
            scale: 1.2, // Enlarge on hover
          }}
          whileTap={{ scale: 0.8 }} // Shrink slightly on click
          onClick={() =>
            handleEventAnalytics(
              "Social Media",
              `Clicked social media button for ${item.type}`
            )
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 * index }}
          >
            {React.cloneElement(item.icon, { size: 25 })}
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
