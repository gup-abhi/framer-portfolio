import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Project from "../components/Project";
import { projects } from "../utils/projects";
import { texts } from "../utils/texts";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = ({ language }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #f574b9, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #9067c6, transparent)" }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl"
            style={{
              background: "linear-gradient(135deg, #9067c6, #f574b9, #5961df)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {texts[language].projects.title}
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #9067c6, #f574b9, #5961df)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {texts[language].projects.text}
          </p>
        </motion.div>

        {/* Featured: 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 80 }}
            >
              <Project project={project} language={language} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <motion.p
              className="text-center text-gray-500 text-xs uppercase tracking-widest mb-8 font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              More Projects
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {rest.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                >
                  <Project project={project} language={language} index={featured.length + index} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="https://github.com/gup-abhi"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full font-semibold text-base shadow-lg transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #9067c6, #f574b9)" }}
          >
            <FaGithub size={20} />
            {language === "en" ? "View More on GitHub" : "Voir Plus sur GitHub"}
            <FaExternalLinkAlt size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
