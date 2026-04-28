import { useForm } from "react-hook-form";
import { motion, useScroll, useTransform } from "framer-motion";
import { texts } from "../utils/texts";
import { useState, useRef } from "react";
import Loading from "../components/Loading";
import Alert from "./../components/Alert";
import {
  handleEventAnalytics,
  trackFormInteraction,
  trackUserInteraction,
} from "../hooks/useGoogleAnalytics";
import { BsEnvelope, BsGeoAlt, BsLinkedin } from "react-icons/bs";

const INFO_CARDS = [
  {
    icon: <BsEnvelope size={22} />,
    label: "Email",
    value: "gupabhi20@gmail.com",
    href: "mailto:gupabhi20@gmail.com",
  },
  {
    icon: <BsGeoAlt size={22} />,
    label: "Location",
    value: "Toronto, ON",
    href: null,
  },
  {
    icon: <BsLinkedin size={22} />,
    label: "LinkedIn",
    value: "linkedin.com/in/gup-abhi",
    href: "https://www.linkedin.com/in/gup-abhi/",
  },
];

const Contact = ({ language }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", text: "", type: "", status: false });
  const sectionRef = useRef(null);

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const t = texts[language].contact;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert((prev) => ({ ...prev, status: false }));
    const valid = await trigger();
    if (!valid) {
      setLoading(false);
      setAlert({
        title: language === "fr" ? "Erreur" : "Error",
        text:
          language === "fr"
            ? "Quelque chose s'est mal passé. Réessayez plus tard"
            : "Something went wrong. Try again later",
        type: "error",
        status: true,
      });
      return false;
    }
    const form = e.target;
    const formData = new FormData(form);
    const response = await fetch("https://formsubmit.co/ajax/gupabhi20@gmail.com", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    setLoading(false);
    if (response.ok) {
      setAlert({
        title: language === "fr" ? "Succès" : "Success",
        text:
          language === "fr"
            ? "Message envoyé ! Je vous répondrai bientôt."
            : "Message sent! I'll get back to you soon.",
        type: "success",
        status: true,
      });
      form.reset();
    } else {
      setAlert({
        title: language === "fr" ? "Erreur" : "Error",
        text:
          language === "fr"
            ? "Échec de l'envoi. Réessayez plus tard."
            : "Failed to send. Please try again later.",
        type: "error",
        status: true,
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
      {alert.status && <Alert title={alert.title} text={alert.text} type={alert.type} />}

      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #9067c6, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #f574b9, transparent)" }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
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
          <p className="mt-4 text-gray-400 text-lg">{t.subtitle}</p>
          <p className="mt-2 text-gray-500 text-sm max-w-xl mx-auto">{t.description}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact info + profile */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 70 }}
          >
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-purple/30 transition-all duration-300 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: 4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: "linear-gradient(135deg, rgba(144,103,198,0.4), rgba(245,116,185,0.4))" }}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{card.label}</p>
                  {card.href ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white font-medium hover:text-purple transition-colors duration-200"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{card.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Profile image */}
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative group w-48 sm:w-56">
                <div
                  className="absolute -inset-1 rounded-2xl blur-sm opacity-40"
                  style={{ background: "linear-gradient(135deg, #9067c6, #f574b9)" }}
                />
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={require("../assets/profile3.jpg")}
                    alt="Abhishek Gupta"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top, rgba(144,103,198,0.3), transparent)" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 70 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <form onSubmit={onSubmit} className="space-y-6">
                {loading && <Loading />}

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {language === "fr" ? "Nom" : "Name"}
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 placeholder-gray-500 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-all duration-200"
                    type="text"
                    placeholder={language === "fr" ? "Votre nom complet" : "Your full name"}
                    {...register("name", { required: true, maxLength: 100 })}
                    onFocus={() => trackFormInteraction("Contact Form", "Field Focus", "Name")}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.name.type === "required"
                        ? language === "fr"
                          ? "Ce champ est obligatoire"
                          : "This field is required."
                        : "Max 100 characters."}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 placeholder-gray-500 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-all duration-200"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    onFocus={() => trackFormInteraction("Contact Form", "Field Focus", "Email")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.type === "required"
                        ? language === "fr"
                          ? "Ce champ est obligatoire"
                          : "This field is required."
                        : language === "fr"
                        ? "Adresse email invalide"
                        : "Invalid email address."}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 placeholder-gray-500 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-all duration-200 resize-none"
                    placeholder={
                      language === "fr"
                        ? "Parlez-moi de votre projet..."
                        : "Tell me about your project..."
                    }
                    rows="5"
                    {...register("message", { required: true, maxLength: 2000 })}
                    onFocus={() => trackFormInteraction("Contact Form", "Field Focus", "Message")}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message.type === "required"
                        ? language === "fr"
                          ? "Ce champ est obligatoire"
                          : "This field is required."
                        : "Max 2000 characters."}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #9067c6, #f574b9)" }}
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleEventAnalytics("Contact Me Form", "Clicked submit button");
                    trackUserInteraction("Form Submit Click", "Contact Form", {
                      form_name: "contact_form",
                    });
                  }}
                >
                  <span className="relative z-10 uppercase tracking-wider">{t.btn}</span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #f574b9, #5961df)" }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
