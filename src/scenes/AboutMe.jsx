import useMediaQuery from "../hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "framer-motion";
import LineGradient from "../components/LineGradient";
import { technologies } from "../utils/tech";
import { texts } from "./../utils/texts";
import ProfileImage from "../assets/profile2.png";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";
import { useRef } from "react";

const aboutVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const technologyVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 50 },
  },
};

const AboutMe = ({ language }) => {
  const mediumScreens = useMediaQuery("(min-width: 1060px)");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const x = useTransform(scrollYProgress, [0.1, 0.8], [-500, 0]); // Maps 0-1 progress to 0-100px

  return (
    <section className="md:pt-10 pb-24 min-h-screen" id="about">
      <div className="md:flex md:justify-between md:gap-16 mt-32 ">
        <motion.div
          ref={ref}
          style={{ scale: scale, opacity: opacity, x: x }}
          className="mt-16 md:mt-0"
        >
          {mediumScreens ? (
            <div
              className="relative z-0 mr-20 before:absolute before:-top-10 before:-right-10 before:rounded-3xl
            before:w-full before:max-w-[400] md:before:max-w-[400] before:h-full before:border-2 before:border-purple before:z-[-1]"
            >
              <img
                alt={"profile image"}
                className="z-10 max-w-sm rounded-3xl shadow-xl"
                src={ProfileImage}
              />
            </div>
          ) : (
            <></>
          )}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={aboutVariant}
          className="md:w-1/3"
        >
          <p className="font-poppins font-semibold text-4xl mb-5">
            {texts[language].about.title}
          </p>
          <LineGradient width="w-1/3" />
          <p className="mt-10 mb-7">
            {texts[language].about.text}
            <a
              className="text-pink-two font-bold"
              href={texts[language].about.link}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() =>
                handleEventAnalytics(
                  "Company Link",
                  `Clicked Tata Consultancy Services Link`
                )
              }
            >
              {texts[language].about.empresa}
            </a>{" "}
            {texts[language].about.text2}
          </p>
          <div className="flex gap-6 flex-wrap">
            {technologies.map((tech, index) => {
              return (
                <motion.div
                  viewport={{ once: true, amount: 1 }}
                  variants={technologyVariant}
                  className="flex justify-evenly"
                  key={index}
                >
                  <span className="text-purple mx-1">&#10148;</span>
                  <p>{tech}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
