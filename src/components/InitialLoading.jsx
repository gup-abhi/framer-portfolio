import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const InitialLoading = ({ setIsLoading }) => {
  const [isFirstAnimationComplete, setIsFirstAnimationComplete] =
    useState(false);
  const [isSecondAnimationComplete, setIsSecondAnimationComplete] =
    useState(false);

  useEffect(() => {
    if (isSecondAnimationComplete) {
      setIsLoading(false);
    }
  }, [isSecondAnimationComplete, setIsLoading]);

  const svgVariant = {
    hidden: {},
    visible: {
      transition: {},
    },
  };

  const pathVariants = (delay) => ({
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        weight: 0.3,
        delay: delay * 0.5,
      },
    },
  });

  const reversePathVariants = (delay) => ({
    hidden: {
      pathLength: 1,
      opacity: 1,
    },
    visible: {
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        weight: 0.3,
        stiffness: 200,
        delay: delay * 0.5,
      },
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-deep-purple min-h-screen">
      {!isFirstAnimationComplete && (
        <motion.svg
          className="w-64 h-64 md:w-96 md:h-96"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          initial="hidden"
          animate="visible"
          variants={svgVariant}
          onAnimationComplete={() => setIsFirstAnimationComplete(true)}
        >
          <g
            transform="translate(0,500) scale(0.1,-0.1)"
            fill="#fff"
            stroke="none"
          >
            <motion.path
              variants={pathVariants(0)}
              d="M765 2730 c-104 -43 -201 -83 -215 -89 -14 -5 -43 -17 -65 -24 -22 -8 -75 -29 -117 -47 l-78 -33 0 -91 0 -91 138 -54 c75 -29 151 -59 167 -67 59 -25 361 -144 368 -144 4 0 7 42 7 93 l0 92 -122 47 c-68 26 -136 52 -153 59 -16 7 -57 22 -89 33 -33 12 -61 26 -63 31 -3 11 -11 8 237 102 l185 71 3 96 c1 53 -1 95 -5 95 -4 -1 -93 -36 -198 -79z"
            />
            <motion.path
              variants={pathVariants(1)}
              d="M1450 2994 c-6 -14 -10 -31 -10 -39 0 -8 -4 -16 -9 -19 -5 -3 -11 -16 -14 -28 -3 -13 -30 -95 -60 -183 -216 -624 -277 -802 -277 -810 0 -3 49 -5 110 -5 l109 0 42 130 41 130 213 0 212 0 42 -130 42 -130 114 0 114 0 -49 143 c-27 78 -83 241 -125 362 -128 370 -165 477 -187 543 l-20 62 -139 0 -139 0 -10 -26z m190 -319 c66 -192 103 -315 98 -320 -3 -3 -70 -4 -150 -3 l-145 3 71 218 c38 119 75 216 80 214 5 -2 26 -52 46 -112z"
            />
            <motion.path
              variants={pathVariants(2)}
              d="M2615 3021 c-215 -43 -343 -191 -381 -439 -16 -105 -16 -121 -1 -235 9 -67 24 -142 34 -167 44 -116 133 -213 232 -252 84 -33 227 -37 303 -8 58 21 132 84 143 121 13 39 24 16 27 -53 l3 -73 103 -3 102 -3 0 306 0 305 -240 0 -241 0 3 -86 3 -86 125 -1 125 -2 3 -57 c4 -83 -22 -138 -84 -174 -44 -26 -57 -29 -139 -28 -105 0 -154 20 -205 82 -50 58 -70 123 -77 242 -12 216 37 347 152 408 41 21 192 28 251 12 48 -14 117 -73 129 -110 3 -11 10 -20 15 -20 12 0 158 89 165 101 4 5 -10 33 -30 63 -40 61 -111 113 -190 140 -56 20 -263 30 -330 17z"
            />
            <motion.path
              variants={pathVariants(3)}
              d="M3705 3068 c-2 -7 -17 -56 -33 -108 -27 -85 -82 -260 -146 -470 -13 -41 -42 -133 -64 -205 -22 -71 -59 -191 -82 -265 -23 -74 -51 -162 -61 -194 -10 -33 -19 -63 -19 -68 0 -5 43 -7 96 -6 l96 3 13 35 c7 19 20 58 28 85 16 53 50 162 173 555 42 135 81 261 86 280 5 19 18 60 28 90 10 30 28 89 40 130 12 41 25 85 31 98 20 50 16 52 -86 52 -68 0 -97 -4 -100 -12z"
            />
            <motion.path
              variants={pathVariants(4)}
              d="M4032 2714 l3 -96 185 -71 c248 -94 240 -91 237 -102 -2 -5 -30 -19 -63 -31 -32 -11 -72 -26 -89 -33 -42 -16 -117 -44 -202 -76 l-73 -27 0 -94 c0 -52 3 -94 8 -94 4 0 156 60 337 133 l330 133 3 90 3 89 -88 37 c-48 20 -158 64 -243 98 -85 33 -164 65 -175 70 -11 5 -45 19 -75 31 -30 11 -65 25 -78 30 l-23 9 3 -96z"
            />
          </g>
        </motion.svg>
      )}

      {isFirstAnimationComplete && (
        <motion.svg
          className="w-64 h-64 md:w-96 md:h-96"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          initial="hidden"
          animate="visible"
          variants={svgVariant}
          onAnimationComplete={() => setIsSecondAnimationComplete(true)}
        >
          <g
            transform="translate(0,500) scale(0.1,-0.1)"
            fill="#fff"
            stroke="none"
          >
            <motion.path
              variants={reversePathVariants(4)}
              d="M765 2730 c-104 -43 -201 -83 -215 -89 -14 -5 -43 -17 -65 -24 -22 -8 -75 -29 -117 -47 l-78 -33 0 -91 0 -91 138 -54 c75 -29 151 -59 167 -67 59 -25 361 -144 368 -144 4 0 7 42 7 93 l0 92 -122 47 c-68 26 -136 52 -153 59 -16 7 -57 22 -89 33 -33 12 -61 26 -63 31 -3 11 -11 8 237 102 l185 71 3 96 c1 53 -1 95 -5 95 -4 -1 -93 -36 -198 -79z"
            />
            <motion.path
              variants={reversePathVariants(3)}
              d="M1450 2994 c-6 -14 -10 -31 -10 -39 0 -8 -4 -16 -9 -19 -5 -3 -11 -16 -14 -28 -3 -13 -30 -95 -60 -183 -216 -624 -277 -802 -277 -810 0 -3 49 -5 110 -5 l109 0 42 130 41 130 213 0 212 0 42 -130 42 -130 114 0 114 0 -49 143 c-27 78 -83 241 -125 362 -128 370 -165 477 -187 543 l-20 62 -139 0 -139 0 -10 -26z m190 -319 c66 -192 103 -315 98 -320 -3 -3 -70 -4 -150 -3 l-145 3 71 218 c38 119 75 216 80 214 5 -2 26 -52 46 -112z"
            />
            <motion.path
              variants={reversePathVariants(2)}
              d="M2615 3021 c-215 -43 -343 -191 -381 -439 -16 -105 -16 -121 -1 -235 9 -67 24 -142 34 -167 44 -116 133 -213 232 -252 84 -33 227 -37 303 -8 58 21 132 84 143 121 13 39 24 16 27 -53 l3 -73 103 -3 102 -3 0 306 0 305 -240 0 -241 0 3 -86 3 -86 125 -1 125 -2 3 -57 c4 -83 -22 -138 -84 -174 -44 -26 -57 -29 -139 -28 -105 0 -154 20 -205 82 -50 58 -70 123 -77 242 -12 216 37 347 152 408 41 21 192 28 251 12 48 -14 117 -73 129 -110 3 -11 10 -20 15 -20 12 0 158 89 165 101 4 5 -10 33 -30 63 -40 61 -111 113 -190 140 -56 20 -263 30 -330 17z"
            />
            <motion.path
              variants={reversePathVariants(1)}
              d="M3705 3068 c-2 -7 -17 -56 -33 -108 -27 -85 -82 -260 -146 -470 -13 -41 -42 -133 -64 -205 -22 -71 -59 -191 -82 -265 -23 -74 -51 -162 -61 -194 -10 -33 -19 -63 -19 -68 0 -5 43 -7 96 -6 l96 3 13 35 c7 19 20 58 28 85 16 53 50 162 173 555 42 135 81 261 86 280 5 19 18 60 28 90 10 30 28 89 40 130 12 41 25 85 31 98 20 50 16 52 -86 52 -68 0 -97 -4 -100 -12z"
            />
            <motion.path
              variants={reversePathVariants(0)}
              d="M4032 2714 l3 -96 185 -71 c248 -94 240 -91 237 -102 -2 -5 -30 -19 -63 -31 -32 -11 -72 -26 -89 -33 -42 -16 -117 -44 -202 -76 l-73 -27 0 -94 c0 -52 3 -94 8 -94 4 0 156 60 337 133 l330 133 3 90 3 89 -88 37 c-48 20 -158 64 -243 98 -85 33 -164 65 -175 70 -11 5 -45 19 -75 31 -30 11 -65 25 -78 30 l-23 9 3 -96z"
            />
          </g>
        </motion.svg>
      )}
    </div>
  );
};

export default InitialLoading;
