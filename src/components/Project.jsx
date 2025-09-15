import { motion } from "framer-motion";
import useMediaQuery from "./../hooks/useMediaQuery";
import { FaGithub, FaEye, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";
import { 
  handleEventAnalytics, 
  trackProjectInteraction, 
  trackExternalLink,
  trackUserInteraction 
} from "../hooks/useGoogleAnalytics";
import { projImg } from '../utils/projectsImg'

const Project = ({ project, language, index }) => {
  const desktop = useMediaQuery("(min-width: 768px)");

  if (!project) {
    return null;
  }

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple/30 transition-all duration-500"
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
            className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            <FaStar size={10} />
            Featured
          </motion.div>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={projImg[project.img]} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Overlay with Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.git && (
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.git}
              target="_blank"
              rel="noreferrer"
              className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-colors duration-300"
              onClick={() => {
                handleEventAnalytics(
                  "Project GitHub",
                  `Clicked GitHub button for ${project.title}`
                );
                trackProjectInteraction(project.title, "GitHub Click", {
                  project_category: project.category,
                  project_technologies: project.technologies.join(", ")
                });
                trackExternalLink(project.git, `GitHub - ${project.title}`);
                trackUserInteraction("Project GitHub Click", project.title, {
                  project: project.title,
                  action: "github_click"
                });
              }}
            >
              <FaGithub size={20} />
            </motion.a>
          )}
          {project.path && (
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.path}
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-purple to-pink-two text-white p-4 rounded-full hover:from-pink-two hover:to-purple transition-all duration-300"
              onClick={() => {
                handleEventAnalytics(
                  "Project Link",
                  `Clicked project link for ${project.title}`
                );
                trackProjectInteraction(project.title, "Live Demo Click", {
                  project_category: project.category,
                  project_technologies: project.technologies.join(", ")
                });
                trackExternalLink(project.path, `Live Demo - ${project.title}`);
                trackUserInteraction("Project Live Demo Click", project.title, {
                  project: project.title,
                  action: "live_demo_click"
                });
              }}
            >
              <FaExternalLinkAlt size={20} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Project Title and Category */}
        <div className="flex items-start justify-between mb-4">
          <motion.h3 
            className="font-poppins font-bold text-2xl text-white group-hover:text-purple transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          <div className="flex items-center gap-1 text-purple text-sm font-medium">
            <FaCode size={12} />
            <span className="capitalize">{project.category}</span>
          </div>
        </div>

        {/* Project Description */}
        <motion.p 
          className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {project.subtitle[language]}
        </motion.p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple/20 to-pink-two/20 text-purple px-3 py-1 rounded-full text-xs font-medium border border-purple/30 hover:border-purple/50 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-gray-400 text-xs px-2 py-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.git && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.git}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 border border-white/20 hover:border-purple/50"
              onClick={() => {
                handleEventAnalytics(
                  "Project GitHub",
                  `Clicked GitHub button for ${project.title}`
                );
                trackProjectInteraction(project.title, "GitHub Button Click", {
                  project_category: project.category,
                  project_technologies: project.technologies.join(", ")
                });
                trackExternalLink(project.git, `GitHub Button - ${project.title}`);
                trackUserInteraction("Project GitHub Button Click", project.title, {
                  project: project.title,
                  action: "github_button_click"
                });
              }}
            >
              <FaGithub size={16} />
              Code
            </motion.a>
          )}
          {project.path && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.path}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-gradient-to-r from-purple to-pink-two hover:from-pink-two hover:to-purple text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-lg hover:shadow-purple/25"
              onClick={() => {
                handleEventAnalytics(
                  "Project Link",
                  `Clicked project link for ${project.title}`
                );
                trackProjectInteraction(project.title, "Live Demo Button Click", {
                  project_category: project.category,
                  project_technologies: project.technologies.join(", ")
                });
                trackExternalLink(project.path, `Live Demo Button - ${project.title}`);
                trackUserInteraction("Project Live Demo Button Click", project.title, {
                  project: project.title,
                  action: "live_demo_button_click"
                });
              }}
            >
              <FaEye size={16} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple via-pink-two to-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default Project;
