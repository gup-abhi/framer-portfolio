import { useEffect } from "react";
import ReactGA from "react-ga4";

export const useGoogleAnalytics = ({ selectedPage }) => {
  ReactGA.initialize("G-LQB72FRTH9");

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: selectedPage });
  }, [selectedPage]);
};

export const handleEventAnalytics = (category, action) => {
  ReactGA.event({
    category,
    action,
  });
};
