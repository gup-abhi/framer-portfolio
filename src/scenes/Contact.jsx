import LineGradient from "../components/LineGradient";
import useMediaQuery from "../hooks/useMediaQuery";
import { useForm } from "react-hook-form";
import { motion, useScroll, useTransform } from "framer-motion";
import { texts } from "../utils/texts";
import { useState, useRef } from "react";
import Loading from "../components/Loading";
import Alert from "./../components/Alert";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const headingVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
  },
};

const formVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.8, staggerChildren: 0.2, ease: "easeOut" },
  },
};

const floatingVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = ({ language }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    text: "",
    type: "",
    status: false,
  });

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    setLoading(true);
    setAlert((prev) => ({
      ...prev,
      status: false,
    }));

    const valid = await trigger();

    if (!valid) {
      setLoading(false);
      setAlert((prev) => ({
        ...prev,
        title: language === "pt" ? "Erro" : "Error",
        text:
          language === "pt"
            ? "Algo deu errado. Tente novamente mais tarde"
            : "Something went wrong. Try again later",
        type: "error",
        status: true,
      }));
      return false;
    }

    const { name, email, message } = e.target.elements;
    const data = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    const response = await fetch(
      "https://formsubmit.co/agabhishek20121998@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    if (response.status === 200) {
      setAlert((prev) => ({
        ...prev,
        title: language === "pt" ? "Sucesso" : "Success",
        text:
          language === "pt"
            ? "Email enviado com sucesso!"
            : "Email sent successfully!",
        type: "success",
        status: true,
      }));
      e.target.reset();
    } else {
      setAlert((prev) => ({
        ...prev,
        title: language === "pt" ? "Erro" : "Error",
        text:
          language === "pt"
            ? "Algo deu errado. Tente novamente mais tarde"
            : "Something went wrong. Try again later",
        type: "error",
        status: true,
      }));
    }

    setLoading(false);
  };

  const largeScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {alert.status && (
        <Alert title={alert.title} text={alert.text} type={alert.type} />
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-purple/20 to-pink-two/20 rounded-full blur-xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue/20 to-purple/20 rounded-full blur-xl"
          animate={{
            y: [0, 25, 0],
            x: [0, 15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingVariant}
          className="text-center mb-16"
        >
          <h2 className="font-poppins font-bold text-5xl lg:text-6xl mb-6 text-gradient-animated">
            {texts[language].contact.title}
          </h2>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-1 bg-gradient-to-r from-purple via-pink-two to-blue rounded-full w-32"></div>
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple via-pink-two to-blue rounded-full w-32 animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Form Section - Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariant}
            className="order-1 lg:order-1"
          >
            {/* Modern glassmorphism form card */}
            <div className="glass-card rounded-3xl p-8 lg:p-10 backdrop-blur-xl border border-white/10 shadow-2xl">
              <form onSubmit={onSubmit} className="space-y-6">
                {loading && <Loading />}
                
                {/* Name Input */}
                <motion.div variants={floatingVariant} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                    {language === "pt" ? "Nome" : "Name"}
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/20 rounded-xl font-medium placeholder-gray-400 text-white p-4 focus:outline-none focus:border-purple focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    type="text"
                    placeholder={language === "pt" ? "Seu nome completo" : "Your full name"}
                    {...register("name", {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.name.type === "required" &&
                        (language === "pt"
                          ? "Este campo é obrigatório"
                          : "This field is required.")}
                      {errors.name.type === "maxLength" && "Max length is 100 char."}
                    </p>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div variants={floatingVariant} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/20 rounded-xl font-medium placeholder-gray-400 text-white p-4 focus:outline-none focus:border-purple focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                    type="email"
                    placeholder="seu@email.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.type === "required" &&
                        (language === "pt"
                          ? "Este campo é obrigatório"
                          : "This field is required.")}
                      {errors.email.type === "pattern" &&
                        (language === "pt"
                          ? "Endereço de email inválido"
                          : "Invalid email address.")}
                    </p>
                  )}
                </motion.div>

                {/* Message Input */}
                <motion.div variants={floatingVariant} className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                    {language === "pt" ? "Mensagem" : "Message"}
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/20 rounded-xl font-medium placeholder-gray-400 text-white p-4 focus:outline-none focus:border-purple focus:bg-white/10 transition-all duration-300 resize-none backdrop-blur-sm"
                    name="message"
                    placeholder={language === "pt" ? "Conte-me sobre seu projeto..." : "Tell me about your project..."}
                    rows="5"
                    {...register("message", {
                      required: true,
                      maxLength: 2000,
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message.type === "required" && language === "pt"
                        ? "Este campo é obrigatório"
                        : "This field is required."}
                      {errors.message.type === "maxLength" &&
                        "Max length is 2000 char."}
                    </p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={floatingVariant}>
                  <motion.button
                    className="w-full p-5 bg-gradient-to-r from-purple via-pink-two to-blue font-semibold text-white rounded-xl shadow-2xl hover:shadow-purple/25 transition-all duration-300 relative overflow-hidden group"
                    type="submit"
                    whileHover={{ 
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, type: "easeIn" }}
                    onClick={() =>
                      handleEventAnalytics("Contact Me Form", `Clicked submit button`)
                    }
                  >
                    <span className="relative z-10 uppercase tracking-wider">
                      {texts[language].contact.btn}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-two via-purple to-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Image Section - Right Side */}
          <motion.div
            ref={ref}
            style={{ scale: scale, opacity: opacity, y: y }}
            initial={{ scale: 0.95, opacity: 0.8, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-2 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Modern glassmorphism container */}
              <div className="relative p-8 glass-card rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple to-pink-two rounded-full opacity-60"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue to-purple rounded-full opacity-60"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -180, -360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                
                {/* Profile image with modern styling */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    alt="Abhishek Gupta - Contact"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                    src={require("../assets/profile3.jpg")}
                    loading="lazy"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
