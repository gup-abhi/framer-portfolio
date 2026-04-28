import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SocialMediaIcons from "../components/SocialMediaIcons";
import Typewriter from "../components/Typewriter";
import { texts } from "../utils/texts";
import ProfileImage from "../assets/profile.jpg";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import useMediaQuery from "../hooks/useMediaQuery";

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 8 + 4,
  delay: Math.random() * 4,
}));

const Landing = ({ setSelectedPage, language }) => {
  const heroRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1060px)");
  const { scrollY } = useScroll();

  const bgY    = useTransform(scrollY, [0, 700], [0, -60]);
  const orbY   = useTransform(scrollY, [0, 700], [0, -120]);
  const textY  = useTransform(scrollY, [0, 700], [0, -180]);
  const imageY = useTransform(scrollY, [0, 700], [0, -100]);
  const badgeY = useTransform(scrollY, [0, 700], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const typewriterTexts = [
    texts[language].landing.subtitle,
    "Automation Engineer.",
    "AI Enthusiast.",
    "Open to Work.",
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 0: Starfield */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.15 + Math.random() * 0.35,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,160,32,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Layer 1: Ambient orbs */}
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(232,160,32,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,94,58,0.2) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-64 h-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(43,191,180,0.2) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* Layer 2: Hero content */}
      <motion.div
        style={{ y: textY, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`flex ${
            isDesktop ? "flex-row items-center gap-16" : "flex-col items-center text-center gap-12"
          }`}
        >
          {/* Text block */}
          <motion.div
            className={`flex-1 ${isDesktop ? "text-left" : "text-center"}`}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
            }}
          >
            {/* Status badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
              style={{ background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.35)" }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">
                {texts[language].landing.available}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
              }}
              className="font-poppins font-bold leading-tight mb-4"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
                Abhishek
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                style={{
                  background: "linear-gradient(135deg, #E8A020 0%, #FF5E3A 50%, #2BBFB4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  backgroundClip: "text",
                }}
              >
                Gupta
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-200 mb-6 h-12 flex items-center"
              style={isDesktop ? {} : { justifyContent: "center" }}
            >
              <Typewriter texts={typewriterTexts} />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
              style={isDesktop ? {} : { margin: "0 auto 2.5rem" }}
            >
              Building scalable web apps, REST APIs & AI-powered automation systems.
              4+ years across the full stack — React, Node.js, Python, PostgreSQL.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap gap-4 mb-10"
              style={isDesktop ? {} : { justifyContent: "center" }}
            >
              <AnchorLink href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedPage("contact");
                    handleEventAnalytics("Hero CTA", "Clicked Contact Me");
                  }}
                  className="relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #E8A020, #FF5E3A)" }}
                >
                  <span className="relative z-10">{texts[language].landing.contact}</span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #FF5E3A, #2BBFB4)" }}
                  />
                </motion.button>
              </AnchorLink>

              <AnchorLink href="#projects">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPage("projects")}
                  className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-purple/50 transition-all duration-300"
                >
                  View Projects
                </motion.button>
              </AnchorLink>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <SocialMediaIcons />
            </motion.div>
          </motion.div>

          {/* Profile image column — outer wrapper has NO transform (keeps layout stable) */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 70 }}
          >
            {/* Positioning context for both photo and badges */}
            <div className="relative">

              {/* Photo group — moves UP with scroll via imageY */}
              <motion.div style={{ y: imageY }}>
                <div className="relative">
                  <motion.div
                    className="absolute -inset-3 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, #E8A020, #FF5E3A, #2BBFB4, #E8A020)",
                      filter: "blur(2px)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <div
                    className="absolute -inset-6 rounded-full blur-3xl opacity-40"
                    style={{ background: "radial-gradient(circle, #E8A020, #FF5E3A)" }}
                  />
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white/10">
                    <img src={ProfileImage} alt="Abhishek Gupta" className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>

              {/* Badges — siblings of photo, no imageY parent → badgeY applies cleanly */}
              <motion.div style={{ y: badgeY }} className="absolute -top-4 -right-8">
                <motion.div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs font-semibold text-white flex items-center gap-1.5"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="w-2 h-2 bg-purple rounded-full" />
                  React
                </motion.div>
              </motion.div>

              <motion.div style={{ y: badgeY }} className="absolute -bottom-4 -left-8">
                <motion.div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs font-semibold text-white flex items-center gap-1.5"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="w-2 h-2 bg-pink rounded-full" />
                  Node.js
                </motion.div>
              </motion.div>

              <motion.div style={{ y: badgeY }} className="absolute top-1/2 -right-12">
                <motion.div
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs font-semibold text-white flex items-center gap-1.5"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="w-2 h-2 bg-blue rounded-full" />
                  Python
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 bg-purple rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Landing;
