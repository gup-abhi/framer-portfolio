import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  { text: "$ initializing portfolio...",                    color: "#E8A020" },
  { text: "$ loading  react · node.js · python · postgresql", color: "#2BBFB4" },
  { text: "$ wiring   n8n · openai · anthropic · gemini",   color: "#FF5E3A" },
  { text: "$ deploying abhishek-gupta.tech",               color: "#E8A020" },
  { text: "✓ all systems ready.",                          color: "#4ade80" },
];

const NAME   = "ABHISHEK GUPTA".split("");
const ROLE   = "Full Stack Developer  &  Automation Engineer";

// Line starts at: BASE + index * GAP
const LINE_BASE     = 0.55;
const LINE_GAP      = 0.42;
const LINE_DURATION = 0.55;
const NAME_START    = LINE_BASE + LINES.length * LINE_GAP + 0.15;
const NAME_STAGGER  = 0.055;
const ROLE_START    = NAME_START + NAME.length * NAME_STAGGER + 0.25;
const DISMISS_MS    = (ROLE_START + 0.8) * 1000 + 1200;

// Blinking cursor shown after the active line
const Cursor = () => (
  <motion.span
    className="inline-block w-[2px] h-[1em] ml-0.5 align-middle"
    style={{ background: "#E8A020" }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
  />
);

const TerminalLine = ({ text, color, startDelay }) => (
  <motion.div
    className="font-source-code text-sm sm:text-base flex items-center gap-0 overflow-hidden whitespace-nowrap"
    style={{ color }}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: startDelay, duration: 0.2 }}
  >
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ delay: startDelay, duration: LINE_DURATION, ease: "linear" }}
    >
      {text}
    </motion.span>
  </motion.div>
);

const InitialLoading = ({ setIsLoading }) => {
  const [activeLineIdx, setActiveLineIdx] = useState(-1);

  useEffect(() => {
    // Advance the "active" (cursor) line on each line's start time
    LINES.forEach((_, i) => {
      const t = (LINE_BASE + i * LINE_GAP) * 1000;
      setTimeout(() => setActiveLineIdx(i), t);
    });

    const dismissTimer = setTimeout(() => setIsLoading(false), DISMISS_MS);
    return () => clearTimeout(dismissTimer);
  }, [setIsLoading]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#0A0906" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45 } }}
    >
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,160,32,0.12), transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(43,191,180,0.10), transparent)" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-lg">

        {/* AG Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, duration: 0.6 }}
        >
          {/* Glow */}
          <div
            className="absolute -inset-4 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(circle, #E8A020, #FF5E3A)" }}
          />
          {/* Spinning conic ring */}
          <motion.div
            className="absolute -inset-2 rounded-2xl"
            style={{
              background: "conic-gradient(from 0deg, #E8A020, #FF5E3A, #2BBFB4, #E8A020)",
              filter: "blur(1.5px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Logo box */}
          <div
            className="relative w-20 h-20 rounded-xl flex items-center justify-center"
            style={{ background: "#0A0906" }}
          >
            <span
              className="font-poppins font-bold text-3xl"
              style={{
                background: "linear-gradient(135deg, #E8A020, #FF5E3A, #2BBFB4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AG
            </span>
          </div>
        </motion.div>

        {/* Terminal block */}
        <motion.div
          className="w-full rounded-xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(232,160,32,0.15)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ borderColor: "rgba(232,160,32,0.12)", background: "rgba(232,160,32,0.05)" }}
          >
            {["#FF5E3A", "#E8A020", "#4ade80"].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.8 }} />
            ))}
            <span className="ml-2 font-source-code text-xs" style={{ color: "rgba(232,160,32,0.5)" }}>
              ~/abhishek-gupta — portfolio.sh
            </span>
          </div>

          {/* Terminal lines */}
          <div className="px-5 py-4 space-y-1.5 min-h-[9rem]">
            {LINES.map((line, i) => (
              <div key={i} className="flex items-center gap-1">
                <TerminalLine
                  text={line.text}
                  color={line.color}
                  startDelay={LINE_BASE + i * LINE_GAP}
                />
                {activeLineIdx === i && i < LINES.length - 1 && <Cursor />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Name reveal */}
        <div className="flex items-center gap-[3px] flex-wrap justify-center">
          {NAME.map((char, i) => (
            <motion.span
              key={i}
              className="font-poppins font-bold text-3xl sm:text-4xl"
              style={{
                color: char === " " ? "transparent" : "white",
                display: "inline-block",
                minWidth: char === " " ? "0.6em" : undefined,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: NAME_START + i * NAME_STAGGER,
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Role */}
        <motion.p
          className="font-source-code text-xs sm:text-sm tracking-widest text-center"
          style={{ color: "#E8A020", letterSpacing: "0.15em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ROLE_START, duration: 0.6 }}
        >
          {ROLE}
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="w-full h-0.5 rounded-full overflow-hidden"
          style={{ background: "rgba(232,160,32,0.12)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: NAME_START, duration: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #E8A020, #FF5E3A, #2BBFB4)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              delay: NAME_START,
              duration: ROLE_START - NAME_START + 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InitialLoading;
