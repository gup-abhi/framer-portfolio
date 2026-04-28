import { motion } from "framer-motion";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => (
  <footer className="relative py-10 border-t border-white/10 overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to top, rgba(232,160,32,0.05), transparent)" }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span
          className="font-semibold"
          style={{
            background: "linear-gradient(135deg, #E8A020, #FF5E3A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            backgroundClip: "text",
          }}
        >
          Abhishek Gupta
        </span>
        . All rights reserved.
      </p>
      <div className="flex items-center gap-5">
        {[
          { href: "https://www.linkedin.com/in/gup-abhi/", icon: <BsLinkedin size={18} /> },
          { href: "https://github.com/gup-abhi/", icon: <BsGithub size={18} /> },
          { href: "https://www.instagram.com/zang_abhi/", icon: <BsInstagram size={18} /> },
        ].map(({ href, icon }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-purple transition-colors duration-200"
          >
            {icon}
          </motion.a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
