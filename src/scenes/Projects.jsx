import { motion } from "framer-motion";
import LineGradient from "../components/LineGradient";
import Project from "../components/Project";
import { projects } from "../utils/projects";
import { texts } from "../utils/texts";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";


const projectHeadingVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 },
  },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const Projects = ({ language }) => {

  return (
    <section id="projects" className="py-20 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-two opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="visible"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={projectHeadingVariant}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block"
          >
            <h2 className="font-poppins font-bold text-5xl md:text-6xl bg-gradient-to-r from-purple via-pink-two to-blue bg-clip-text text-transparent">
              {texts[language].projects.title}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-purple via-pink-two to-blue mx-auto mt-6 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {texts[language].projects.text}
          </motion.p>
        </motion.div>


        {/* Projects Grid */}
        <motion.div
          initial="visible"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariant}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Project
                project={project}
                language={language}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.a
            href="https://github.com/gup-abhi"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple to-pink-two text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple/25 hover:shadow-xl hover:shadow-purple/40 transition-all duration-300"
          >
            <FaGithub size={20} />
            {language === "en" ? "View More on GitHub" : "Ver Mais no GitHub"}
            <FaExternalLinkAlt size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
