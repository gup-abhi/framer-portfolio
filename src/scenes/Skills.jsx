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
          initial="visible"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            },
          }}
          className="space-y-8"
        >
          <h3 className="font-poppins font-semibold text-3xl md:text-4xl text-white mb-6">
            Technologies & Tools
          </h3>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(144, 103, 198, 0.1)",
                  transition: { duration: 0.2 }
                }}
                className="bg-gradient-to-r from-purple/20 to-pink-two/20 border border-purple/30 rounded-xl px-4 py-3 text-center text-sm font-medium hover:border-purple/50 hover:from-purple/30 hover:to-pink-two/30 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Skill Categories */}
        <motion.div
          initial="visible"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            },
          }}
          className="space-y-8"
        >
          <h3 className="font-poppins font-semibold text-3xl md:text-4xl text-white mb-6">
            Core Competencies
          </h3>
          
          {[1, 2, 3].map((skillIndex, index) => (
            <motion.div
              key={skillIndex}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple to-pink-two rounded-xl flex items-center justify-center">
                    <span className="font-source-code font-bold text-2xl text-white">
                      {skillIndex.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-source-code font-bold text-xl md:text-2xl text-white mb-3">
                    {texts[language].skills[skillIndex].title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {texts[language].skills[skillIndex].text}
                  </p>
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
