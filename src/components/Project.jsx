import { easeIn, motion } from "framer-motion";
import useMediaQuery from "./../hooks/useMediaQuery";
import { FaGithub, FaEye } from "react-icons/fa";
import expense from "../assets/projects/expense-tracker.png";
import todo from "../assets/projects/todo-app.png";
import movies from "../assets/projects/top-250-movies.png";
import blog from "../assets/projects/django-blog.png";

const projectD = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1 },
};

const images = {
  expense,
  todo,
  "top-250-movies": movies,
  "django-blog": blog,
};

const Project = ({ project, language }) => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {desktop ? (
        <motion.div variants={projectD} className="relative">
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
                {project.technologies.map((tech, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-pink-two text-white rounded-md px-2 py-1"
                    >
                      {tech}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4">
                {project.git && (
                  <motion.a
                    whileHover={{ scale: 1.1 }} // Scale up on hover
                    whileTap={{ scale: 0.9 }} // Scale down on click
                    transition={{ duration: 0.2 }} // Smooth transition
                    href={project.git}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple text-white rounded-md px-2 py-1 flex items-center gap-1"
                  >
                    <FaGithub />
                    GitHub
                  </motion.a>
                )}
                {project.path && (
                  <motion.a
                    whileHover={{ scale: 1.1 }} // Scale up on hover
                    whileTap={{ scale: 0.9 }} // Scale down on click
                    transition={{ duration: 0.2 }} // Smooth transition
                    href={project.path}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple text-white rounded-md px-2 py-1 flex items-center gap-1"
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
        <div className="bg-white text-black rounded-md">
          <img src={images[project.img]} alt={project.title} />
          <div className="flex flex-col items-start p-4 gap-4">
            <p className="font-source-code font-semibold text-2xl">
              {project.title}
            </p>
            <div className="flex flex-wrap justify-between mt-5">
              {project.subtitle[language]}
            </div>
            <div className="flex flex-wrap gap-4">
              {project.technologies.map((tech, index) => {
                return (
                  <div
                    key={index}
                    className="bg-pink-two text-white rounded-md px-2 py-1"
                  >
                    {tech}
                  </div>
                );
              })}
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
        </div>
      )}
    </>
  );
};

export default Project;
