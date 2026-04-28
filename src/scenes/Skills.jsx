import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { texts } from "../utils/texts";
import { techCategories } from "../utils/tech";

const ALL_TABS = ["All", ...Object.keys(techCategories)];
const ALL_TECHS = Object.values(techCategories).flat();

const TechChip = ({ tech, index }) => (
  <motion.div
    layout
    key={tech}
    initial={{ opacity: 0, scale: 0.75, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.75, y: -10 }}
    transition={{ duration: 0.25, delay: index * 0.025, type: "spring", stiffness: 200 }}
    whileHover={{ y: -4, scale: 1.06 }}
    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 cursor-default hover:bg-white/10 hover:border-purple/40 hover:text-white transition-colors duration-200 backdrop-blur-sm"
  >
    {tech}
  </motion.div>
);

const Skills = ({ language }) => {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const t = texts[language].skills;
  const displayedTechs = activeTab === "All" ? ALL_TECHS : techCategories[activeTab];

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #E8A020, transparent)" }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #2BBFB4, transparent)" }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl"
            style={{
              background: "linear-gradient(135deg, #E8A020, #FF5E3A, #2BBFB4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.title}
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #E8A020, #FF5E3A, #2BBFB4)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t.text}</p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {ALL_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 ${
                  isActive
                    ? "text-white border-transparent"
                    : "text-gray-400 border-white/10 bg-white/5 hover:border-purple/30 hover:text-white"
                }`}
                style={
                  isActive
                    ? { background: "linear-gradient(135deg, #E8A020, #FF5E3A)" }
                    : {}
                }
              >
                {tab}
                {isActive && (
                  <span className="ml-2 text-xs bg-white/20 rounded-full px-1.5 py-0.5">
                    {displayedTechs.length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tech chips */}
        <div className="min-h-[140px] mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {displayedTechs.map((tech, i) => (
                <TechChip key={tech} tech={tech} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Core competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-center text-2xl font-poppins font-bold text-white mb-10">
            Core Competencies
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((num, i) => (
              <motion.div
                key={num}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-purple/30 transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(232,160,32,0.3), rgba(255,94,58,0.3))" }}
                >
                  {num === 1 ? "🚀" : num === 2 ? "💬" : "🌐"}
                </div>
                <h4 className="font-poppins font-bold text-white text-lg mb-3 capitalize">
                  {t[num].title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t[num].text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
