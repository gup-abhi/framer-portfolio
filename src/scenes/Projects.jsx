import { motion } from "framer-motion";
import LineGradient from "../components/LineGradient";
import Project from "../components/Project";
import { projects } from "../utils/projects";
import { texts } from "../utils/texts";

const projectHeadingVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.5, type: "easeIn" },
  },
};

const Projects = ({ language }) => {
  return (
    <section id="projects" className="py-48 min-h-screen">
      <motion.div
        className="md:w-2/5 mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={projectHeadingVariant}
      >
        <div>
          <p className="font-poppins font-semibold text-4xl">
            {texts[language].projects.title}
          </p>
          <div className="flex justify-center mt-5">
            <LineGradient width="w-2/3" />
          </div>
        </div>
        <p className="mt-10 mb-10">{texts[language].projects.text}</p>
      </motion.div>

      <div className="flex justify-center gap-2 w-full">
        <div className="flex flex-col gap-5 w-full items-center justify-center">
          {/* idk why foreach/map is not working */}
          {projects.map((project, index) => (
            <Project
              key={index}
              project={project}
              language={language}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
