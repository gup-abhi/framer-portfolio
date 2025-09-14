import { motion } from "framer-motion";
import LineGradient from "../components/LineGradient";
import { texts } from "../utils/texts";
import { technologies } from "../utils/tech";

const Skills = ({language}) => {
  return (
    <section id="skills" className="py-20 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial="visible"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-center mb-16"
      >
        <h2 className="font-poppins font-bold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple via-pink-two to-blue bg-clip-text text-transparent mb-6">
          {texts[language].skills.title}
        </h2>
        <div className="flex justify-center mb-8">
          <LineGradient width="w-1/3" />
        </div>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          {texts[language].skills.text}
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
        {/* Left Column - Technologies */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.08,
                delayChildren: 0.3
              }
            },
          }}
          className="space-y-8"
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="font-poppins font-semibold text-3xl md:text-4xl text-white mb-6"
          >
            Technologies & Tools
          </motion.h3>
          
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.4
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    scale: 0.3, 
                    y: 20,
                    rotateX: -90
                  },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.08,
                  y: -5,
                  rotateX: 5,
                  boxShadow: "0 20px 40px rgba(144, 103, 198, 0.3)",
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3 + index * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.05
                }}
                className="bg-gradient-to-br from-purple/20 via-purple/15 to-pink-two/20 border border-purple/30 rounded-xl px-4 py-3 text-center text-sm font-medium hover:border-purple/60 hover:from-purple/40 hover:via-purple/25 hover:to-pink-two/40 transition-all duration-300 cursor-default relative overflow-hidden group"
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple/0 via-purple/20 to-pink-two/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Tech name with subtle glow effect */}
                <span className="relative z-10 text-white group-hover:text-purple-200 transition-colors duration-300">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Skill Categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.4
              }
            },
          }}
          className="space-y-8"
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="font-poppins font-semibold text-3xl md:text-4xl text-white mb-6"
          >
            Core Competencies
          </motion.h3>
          
          {[1, 2, 3].map((skillIndex, index) => (
            <motion.div
              key={skillIndex}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 40,
                  x: 20,
                  scale: 0.9
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  x: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                  }
                }
              }}
              whileHover={{ 
                scale: 1.03,
                y: -5,
                boxShadow: "0 25px 50px rgba(144, 103, 198, 0.2)",
                borderColor: "rgba(144, 103, 198, 0.4)",
                transition: { 
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple/40 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple/5 via-transparent to-pink-two/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0 }}
              />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-purple to-pink-two rounded-xl flex items-center justify-center"
                    whileHover={{ 
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <motion.span 
                      className="font-source-code font-bold text-2xl text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.5 + index * 0.2,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      {skillIndex.toString().padStart(2, '0')}
                    </motion.span>
                  </motion.div>
                </div>
                <div className="flex-1">
                  <motion.h4 
                    className="font-source-code font-bold text-xl md:text-2xl text-white mb-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.6 + index * 0.2,
                      duration: 0.5
                    }}
                  >
                    {texts[language].skills[skillIndex].title}
                  </motion.h4>
                  <motion.p 
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.7 + index * 0.2,
                      duration: 0.5
                    }}
                  >
                    {texts[language].skills[skillIndex].text}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
