import useMediaQuery from "../hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SocialMediaIcons from "../components/SocialMediaIcons";
import Typewriter from "../components/Typewriter";
import { texts } from "../utils/texts";
import ProfileImage from "../assets/profile.jpg";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      duration: 0.8
    }
  }
};

const floatingVariants = {
  floating: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Landing = ({ setSelectedPage, language }) => {
  const largeScreens = useMediaQuery("(min-width: 1060px)");
  
  // Parallax scroll setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -200]);
  const y4 = useTransform(scrollY, [0, 500], [0, -50]);
  const y5 = useTransform(scrollY, [0, 500], [0, -75]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const typewriterTexts = [
    texts[language].landing.subtitle,
    "Full Stack Developer",
    "React Specialist",
    "Problem Solver",
    "Tech Enthusiast"
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-purple via-purple/20 to-pink/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple/30 via-transparent to-transparent"></div>
      
      {/* Floating Orbs with parallax effect */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple/20 to-pink/20 rounded-full blur-xl float-animation"
        style={{ y: y1 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue/20 to-purple/20 rounded-full blur-xl float-animation delay-1000"
        style={{ y: y2 }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-pink/20 to-purple/20 rounded-full blur-lg float-animation delay-500"
        style={{ y: y3 }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-blue/15 to-purple/15 rounded-full blur-lg float-animation delay-2000"
        style={{ y: y4 }}
      ></motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] hero-grid">
          
          {/* Content Section */}
          <motion.div
            className="hero-content space-y-8 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ y: y5, opacity, scale }}
          >
            {/* Greeting */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full glass-card glow-on-hover"
              variants={itemVariants}
            >
              <span className="text-sm font-source-code text-purple/90">
                👋 {language === 'en' ? 'Hello, I\'m' : 'Olá, eu sou'}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="block text-white glow-on-hover">
                {`<Abhisek`}
              </span>
              <span className="block text-gradient-animated glow-on-hover">
                {`Gupta/>`}
              </span>
            </motion.h1>

            {/* Typewriter Section */}
            <motion.div 
              className="min-h-[3rem] flex items-center"
              variants={itemVariants}
            >
              <div className="text-xl sm:text-2xl font-source-code text-gray-300">
                <Typewriter texts={typewriterTexts} speed={100} pauseTime={2000} />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-300 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              {language === 'en' 
                ? "Passionate about creating innovative digital experiences and solving complex problems through clean, efficient code."
                : "Apaixonada por criar experiências digitais inovadoras e resolver problemas complexos através de código limpo e eficiente."
              }
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <AnchorLink
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple/25 transition-all duration-300 transform hover:scale-105 modern-button glow-on-hover"
                onClick={() => {
                  setSelectedPage("contact");
                  handleEventAnalytics("Contact", "Clicked contact me button");
                }}
                href="#contact"
              >
                <span className="relative z-10">{texts[language].landing.contact}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple to-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </AnchorLink>
              
              <AnchorLink
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-purple/50 text-purple font-semibold rounded-full hover:bg-purple/10 hover:border-purple transition-all duration-300 backdrop-blur-sm modern-button glow-on-hover"
                onClick={() => {
                  setSelectedPage("contact");
                  handleEventAnalytics("Contact", "Clicked Let's Talk button");
                }}
                href="#contact"
              >
                <span>{texts[language].landing.talk}</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </AnchorLink>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="flex"
              variants={itemVariants}
            >
              <SocialMediaIcons />
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="relative flex justify-center lg:justify-end lg:order-2 w-full"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ y: y2, scale }}
          >
            <div className="relative">
              {/* Decorative Elements with parallax */}
              <motion.div 
                className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple/20 to-pink/20 rounded-full blur-xl"
                style={{ y: y1 }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue/20 to-purple/20 rounded-full blur-xl"
                style={{ y: y3 }}
              ></motion.div>
              
              {/* Main Image Container */}
              <motion.div 
                className="relative z-10"
                variants={floatingVariants}
                animate="floating"
              >
                {largeScreens ? (
                  <div className="relative">
                    {/* Glassmorphism Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-pink/20 rounded-3xl blur-xl scale-110"></div>
                    
                    {/* Image with modern styling */}
                    <div className="relative glass-card rounded-3xl p-4 glow-on-hover">
                      <img
                        alt="Abhishek Gupta - Full Stack Developer"
                        className="w-full max-w-sm rounded-2xl shadow-2xl"
                        src={ProfileImage}
                        loading="eager"
                      />
                    </div>
                    
                    {/* Floating Tech Icons with parallax */}
                    <motion.div 
                      className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple to-pink rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{ y: y4 }}
                    >
                      💻
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-r from-blue to-purple rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{ y: y5 }}
                    >
                      ⚡
                    </motion.div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-pink/20 rounded-2xl blur-lg scale-105"></div>
                    <img
                      alt="Abhishek Gupta - Full Stack Developer"
                      className="relative z-10 w-full max-w-sm rounded-2xl shadow-2xl"
                      src={ProfileImage}
                      loading="eager"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
