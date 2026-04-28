import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { texts } from "../utils/texts";
import ProfileImage from "../assets/profile2.png";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const STATS = (language) => [
  { value: "4+", label: texts[language].about.stats.years, color: "from-purple to-purple/60" },
  { value: "5+", label: texts[language].about.stats.clients, color: "from-pink to-pink/60" },
  { value: "80%", label: texts[language].about.stats.crash, color: "from-blue to-blue/60" },
  { value: "70%", label: texts[language].about.stats.automation, color: "from-light-purple to-light-purple/60" },
];

const ExperienceCard = ({ exp, isActive }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
    className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-br from-purple/20 to-pink/10 border-purple/40"
        : "bg-white/5 border-white/10"
    }`}
  >
    {isActive && (
      <span className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-green-400 font-medium">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        Current
      </span>
    )}
    <h4 className="font-poppins font-bold text-white text-lg mb-0.5">{exp.title}</h4>
    <p className="text-purple font-medium text-sm mb-1">{exp.company}</p>
    <p className="text-gray-500 text-xs mb-4">{exp.period}</p>
    <ul className="space-y-2">
      {exp.highlights.map((h, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
          <span className="w-1 h-1 bg-purple rounded-full mt-2 flex-shrink-0" />
          {h}
        </li>
      ))}
    </ul>
  </motion.div>
);

const AboutMe = ({ language }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY    = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const t = texts[language].about;
  const stats = STATS(language);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #9067c6, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #f574b9, transparent)" }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
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
            {t.title}
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #9067c6, #f574b9, #5961df)" }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Bio + Stats */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
          >
            {/* Bio card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <p className="text-gray-300 text-lg leading-relaxed">
                {t.text}
                <motion.a
                  href={t.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold mx-1 inline-block"
                  style={{
                    background: "linear-gradient(135deg, #9067c6, #f574b9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleEventAnalytics("Company Link", "Clicked TCS Link")}
                >
                  {t.empresa}
                </motion.a>
                {t.text2}
              </p>

              {/* Available indicator */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-400 text-sm">Available for full-time opportunities</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm group hover:border-purple/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <p
                    className={`font-poppins font-bold text-3xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Profile image + Experience */}
          <div className="space-y-8">
            {/* Profile image with parallax */}
            <motion.div
              style={{ y: imageY }}
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="relative group">
                <div
                  className="absolute -inset-1 rounded-3xl blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, #9067c6, #f574b9, #5961df)" }}
                />
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden">
                  <img
                    src={ProfileImage}
                    alt="Abhishek Gupta"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top, rgba(144,103,198,0.3), transparent)" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Experience timeline */}
            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px ml-3 bg-gradient-to-b from-purple via-pink to-blue opacity-30" />
              <div className="pl-8 space-y-4">
                <ExperienceCard exp={t.experience.freelance} isActive={true} />
                <ExperienceCard exp={t.experience.tcs} isActive={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
