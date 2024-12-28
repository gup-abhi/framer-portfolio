import { motion } from "framer-motion";
import useMediaQuery from "./../hooks/useMediaQuery";
import { FaGithub, FaEye } from "react-icons/fa";
import expense from "../assets/projects/expense-tracker.png";
import todo from "../assets/projects/todo-app.png";
import movies from "../assets/projects/top-250-movies.png";
import blog from "../assets/projects/django-blog.png";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const images = {
  expense,
  todo,
  "top-250-movies": movies,
  "django-blog": blog,
};

const Project = ({ project, language, index }) => {
  const projectVariant = {
    hidden: { opacity: 0, scale: index % 2 == 0 ? 0.8 : 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
    },
  };
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {desktop ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={projectVariant}
          viewport={{ once: true, amount: 0.75 }} // Trigger animation only when fully in view
          className="relative"
        >
          <div className="flex bg-light-pink text-deep-purple rounded-md">
            <div className="w-1/2">
              <img src={images[project.img]} alt={project.title} />
            </div>
            <div className="flex flex-col items-start p-4 gap-4 w-1/2">
              <p className="font-source-code font-semibold text-2xl">
                {project.title}
              </p>
              <div className="flex flex-wrap justify-between mt-5">
                {project.subtitle[language]}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-pink-two text-white rounded-md px-2 py-1"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {project.git && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    href={project.git}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple text-white rounded-md px-2 py-1 flex items-center gap-1"
                    onClick={() =>
                      handleEventAnalytics(
                        "Project GitHub",
                        `Clicked GitHub button for ${project.title}`
                      )
                    }
                  >
                    <FaGithub />
                    GitHub
                  </motion.a>
                )}
                {project.path && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    href={project.path}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple text-white rounded-md px-2 py-1 flex items-center gap-1"
                    onClick={() =>
                      handleEventAnalytics(
                        "Project Link",
                        `Clicked project link for ${project.title}`
                      )
                    }
                  >
                    <FaEye />
                    Deploy
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={projectVariant}
          viewport={{ once: true, amount: 0.5 }} // Trigger animation only when fully in view
          className="bg-white text-black rounded-md"
        >
          <img src={images[project.img]} alt={project.title} />
          <div className="flex flex-col items-start p-4 gap-4">
            <p className="font-source-code font-semibold text-2xl">
              {project.title}
            </p>
            <div className="flex flex-wrap justify-between mt-5">
              {project.subtitle[language]}
            </div>
            <div className="flex flex-wrap gap-4">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-pink-two text-white rounded-md px-2 py-1"
                >
                  {tech}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {project.git && (
                <a
                  href={project.git}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-purple hover:bg-deep-purple transition duration-200 text-white rounded-md px-2 py-1 flex items-center gap-1"
                >
                  <FaGithub />
                  GitHub
                </a>
              )}
              {project.path && (
                <a
                  href={project.path}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-purple hover:bg-deep-purple transition duration-200 text-white rounded-md px-2 py-1 flex items-center gap-1"
                >
                  <FaEye />
                  Deploy
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Project;
