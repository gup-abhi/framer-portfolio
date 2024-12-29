import useMediaQuery from "../hooks/useMediaQuery";
import { delay, motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SocialMediaIcons from "../components/SocialMediaIcons";
import { texts } from "../utils/texts";
import ProfileImage from "../assets/profile.jpg";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const headingVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "easeInOut", duration: 0.5 },
  },
};

const buttonVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "easeInOut", delay: 0.2, duration: 0.5 },
  },
};

const SocialMediaVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "easeInOut", delay: 0.4, duration: 0.5 },
  },
};

const imageDivVariant = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.6,
      duration: 0.5,
      type: "tween",
      staggerChildren: 0.5,
    },
  },
};

const imageDesktopVariant = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: {
        delay: 1, // Start the opacity animation after 0.6s
        duration: 1, // Opacity transition lasts 1 second
      },
      x: {
        delay: 0.6,
        duration: 1, // Same as opacity
        type: "tween",
      },
    },
  },
};

const imageMobileVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
    boxShadow: "0px 0px 0px 0px rgba(144, 103, 198, 1)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    boxShadow: "0px 0px 15px 25px rgba(144, 103, 198, 0.5)",
    transition: {
      opacity: {
        delay: 0.5, // Start the opacity animation after 0.6s
        duration: 1, // Opacity transition lasts 1 second
        type: "easeIn",
      },
      scale: {
        delay: 0.5,
        duration: 1, // Same as opacity
        type: "tween",
      },
      boxShadow: {
        type: "spring",
        stifness: 100,
        duration: 0.5,
        delay: 1.5,
      },
    },
  },
};

const Landing = ({ setSelectedPage, language }) => {
  const largeScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <section
      id="home"
      className="md:flex md:justify-between md:items-center gap-16 min-h-screen py-10 "
    >
      <div className="md:w-screen basis-3/5 z-10 mt-20 md:mt-32 flex justify-center md:order-2">
        {largeScreens ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageDivVariant}
            className="relative z-0 ml-20 before:absolute before:-top-20 before:-left-20 before:rounded-t-[150px]
                        before:w-full before:max-w-[300px] md:before:max-w-[400px] before:h-full before:border-2 before:border-purple before:z-[-1]"
          >
            <motion.img
              variants={imageDesktopVariant}
              alt="profile"
              className="z-10 w-full max-w-[300px] md:max-w-[350px] rounded-t-[150px] "
              src={ProfileImage}
            />
          </motion.div>
        ) : (
          <motion.img
            initial="hidden"
            animate="visible"
            variants={imageMobileVariant}
            alt="profile"
            className="z-10 w-full max-w-[300px] md:max-w-[600px] rounded-t-[50px] rounded-b-[50px]"
            src={ProfileImage}
          />
        )}
      </div>

      <div className="z-30 md:basis-2/5 mt-12 md:mt-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headingVariant}
        >
          <p className="text-6xl font-poppins text-purple z-10 text-center md:text-start">
            {`<Abhisek Gupta/>`}
          </p>

          <p className="mt-10 mb-7 font-source-code text-sm text-center md:text-start">
            {texts[language].landing.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="flex mt-5 justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={buttonVariant}
        >
          <AnchorLink
            className="bg-gradient-rainbow text-deep-blue rounded-sm py-3 px-7 font-semibold
               hover:text-deep-purple transition duration-500"
            onClick={() => {
              setSelectedPage("contact");
              handleEventAnalytics("Contact", "Clicked contact me button");
            }}
            href="#contact"
          >
            {texts[language].landing.contact}
          </AnchorLink>
          <AnchorLink
            className="rounded-r-sm bg-gradient-rainbow py-0.5 pr-0.5"
            onClick={() => {
              setSelectedPage("contact");
              handleEventAnalytics("Contact", "Clicked Let's Talk button");
            }}
            href="#contact"
          >
            <div className="bg-deep-purple hover:text-purple transition duration-500 w-full h-full flex items-center justify-center px-10 font-playfair">
              {texts[language].landing.talk}
            </div>
          </AnchorLink>
        </motion.div>

        <motion.div
          className="flex mt-5 justify-center md:justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={SocialMediaVariant}
        >
          <SocialMediaIcons />
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
