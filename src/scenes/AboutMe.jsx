import useMediaQuery from "../hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "framer-motion";
import LineGradient from "../components/LineGradient";
import { texts } from "./../utils/texts";
import ProfileImage from "../assets/profile2.png";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import { useRef } from "react";

const aboutVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.2, ease: "easeOut" },
  },
};

const floatingVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AboutMe = ({ language }) => {
  const mediumScreens = useMediaQuery("(min-width: 1060px)");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <section className="relative py-24 overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple/20 to-pink-two/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-blue/20 to-purple/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={aboutVariant}
            className="order-1 lg:order-1 space-y-8"
          >
            {/* Modern glassmorphism content card */}
            <div className="glass-card rounded-3xl p-8 lg:p-10 backdrop-blur-xl border border-white/10 shadow-2xl">
              {/* Title with gradient text */}
              <motion.h2 
                variants={floatingVariant}
                className="font-poppins font-bold text-5xl lg:text-6xl mb-6 text-gradient-animated"
              >
                {texts[language].about.title}
              </motion.h2>
              
              {/* Modern gradient line */}
              <motion.div 
                variants={floatingVariant}
                className="relative mb-8"
              >
                <div className="h-1 bg-gradient-to-r from-purple via-pink-two to-blue rounded-full w-24"></div>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple via-pink-two to-blue rounded-full w-24 animate-pulse"></div>
              </motion.div>

              {/* Content with modern typography */}
              <motion.div 
                variants={floatingVariant}
                className="space-y-6"
              >
                <p className="text-lg lg:text-xl leading-relaxed text-gray-300 font-light">
                  {texts[language].about.text}
                  <motion.a
                    className="text-gradient-animated font-semibold hover:scale-105 transition-transform duration-300 inline-block mx-1"
                    href={texts[language].about.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() =>
                      handleEventAnalytics(
                        "Company Link",
                        `Clicked Tata Consultancy Services Link`
                      )
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {texts[language].about.empresa}
                  </motion.a>
                  {texts[language].about.text2}
                </p>
              </motion.div>

              {/* Modern floating action indicators */}
              <motion.div 
                variants={floatingVariant}
                className="flex items-center space-x-4 mt-8"
              >
                <motion.div
                  className="flex items-center space-x-2 text-sm text-gray-400"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple to-pink-two rounded-full"></div>
                  <span>Available for opportunities</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            ref={ref}
            style={{ scale: scale, opacity: opacity, y: y }}
            initial={{ scale: 0.95, opacity: 0.8, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-2 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Modern glassmorphism container */}
              <div className="relative p-8 glass-card rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple to-pink-two rounded-full opacity-60"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue to-purple rounded-full opacity-60"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -180, -360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                
                {/* Profile image with modern styling */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    alt="Abhishek Gupta - About Me"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                    src={ProfileImage}
                    loading="lazy"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
