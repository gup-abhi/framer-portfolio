import LineGradient from "../components/LineGradient";
import useMediaQuery from "../hooks/useMediaQuery";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { texts } from "../utils/texts";
import { useState } from "react";
import Loading from "../components/Loading";
import Alert from "./../components/Alert";
import { handleEventAnalytics } from "../hooks/useGoogleAnalytics";

const headingVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.5, type: "easeIn" },
  },
};

const imageVariant = {
  hidden: { opacity: 0, x: -50, y: -50 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, delay: 0.5 },
  },
};

const formVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.5, duration: 0.5, staggerChildren: 0.2 },
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
    <section id="contact" className="py-48">
      {alert.status && (
        <Alert title={alert.title} text={alert.text} type={alert.type} />
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.75 }}
        variants={headingVariant}
        className="flex justify-center w-full"
      >
        <div>
          <p className="font-playfair font-semibold text-4xl">
            {texts[language].contact.title}
          </p>
          <div className="flex md:justify-center my-5">
            <LineGradient width="w-2/3" />
          </div>
        </div>
      </motion.div>

      <div className="md:flex md:justify-between gap-16 mt-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          variants={imageVariant}
          className="basis-1/2 flex justify-center"
        >
          {largeScreens ? (
            <div
              className="relative z-0 ml-20 before:absolute before:-top-20 before:-left-20 before:rounded-[100px]
                        before:w-full before:max-w-[400px] md:before:max-w-[400px] before:h-full before:border-2 before:border-purple before:z-[-1]"
            >
              <img
                alt="profile"
                className="hover:filter hover:saturate-150 transition duration-500 z-10 w-full max-w-[400px] md:max-w-[500px]"
                style={{ width: "76%" }}
                src={require("../assets/profile3.jpg")}
              />
            </div>
          ) : (
            <img
              alt="profile"
              className="z-10 w-full max-w-[400px] md:max-w-[600px]"
              src={require("../assets/profile3.jpg")}
            />
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.75 }}
          variants={formVariant}
          className="basis-1/2 mt-10 md:mt-0"
        >
          <form onSubmit={onSubmit}>
            {loading && <Loading />}
            <input
              className="w-full bg-purple font-semibold placeholder-opaque-black p-3"
              type="text"
              placeholder={language === "pt" ? "NOME" : "NAME"}
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && (
              <p className="text-red mt-1">
                {errors.name.type === "required" &&
                  (language === "pt"
                    ? "Este campo é obrigatório"
                    : "This field is required.")}
                {errors.name.type === "maxLength" && "Max length is 100 char."}
              </p>
            )}

            <input
              className="w-full bg-purple font-semibold placeholder-opaque-black p-3 mt-5"
              type="text"
              placeholder="EMAIL"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className="text-red mt-1">
                {errors.email.type === "required" &&
                  (language === "pt"
                    ? "Este campo é obrigatório"
                    : "This field is required.")}
                {errors.email.type === "pattern" &&
                  (language === "pt"
                    ? "Endereço de email inválido. "
                    : "Invalid email address.")}
              </p>
            )}

            <textarea
              className="w-full bg-purple font-semibold placeholder-opaque-black p-3 mt-5"
              name="message"
              placeholder={language === "pt" ? "MENSAGEM" : "MESSAGE"}
              rows="4"
              cols="50"
              {...register("message", {
                required: true,
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <p className="text-red mt-1">
                {errors.message.type === "required" && language === "pt"
                  ? "Este campo é obrigatório"
                  : "This field is required."}
                {errors.message.type === "maxLength" &&
                  "Max length is 2000 char."}
              </p>
            )}

            <motion.button
              className="p-5 bg-gradient-rainbow font-semibold mt-5 uppercase rounded-md"
              type="submit"
              whileHover={{ scale: 1.05 }} // Scale up on hover
              whileTap={{ scale: 0.95 }} // Scale down on tap
              transition={{ duration: 0.2, type: "easeIn" }} // Smooth transition for both effects
              onClick={() =>
                handleEventAnalytics("Contact Me Form", `Clicked submit button`)
              }
            >
              {texts[language].contact.btn}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
