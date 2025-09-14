import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const InitialLoading = ({ setIsLoading }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    const loadingTexts = [
      "Loading...",
      "Preparing...",
      "Almost ready..."
    ];

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        // Smooth progress curve
        const increment = prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [setIsLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const progressVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-deep-purple min-h-screen overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-purple via-purple/10 to-pink/5"></div>
      
      {/* Minimal floating elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple/5 to-pink/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue/5 to-purple/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Clean Logo */}
        <motion.div
          className="relative"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-pink/20 rounded-full blur-xl scale-125"></div>
            
            {/* Main logo */}
            <div className="relative w-full h-full bg-gradient-to-br from-purple to-pink rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                className="text-white text-xl md:text-2xl font-bold font-poppins"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                AG
              </motion.div>
            </div>
            
            {/* Smooth rotating ring */}
            <motion.div
              className="absolute inset-0 border border-purple/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-center space-y-6"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-xl md:text-2xl font-poppins font-semibold text-white"
            key={loadingText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {loadingText}
          </motion.h1>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-72 md:w-80 space-y-3"
          variants={progressVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple to-pink rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ 
                duration: 0.2, 
                ease: "easeOut" 
              }}
            />
          </div>
          
          {/* Progress percentage */}
          <motion.div
            className="text-center text-sm text-gray-400 font-source-code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>

        {/* Minimal loading indicator */}
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 bg-purple/60 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InitialLoading;
