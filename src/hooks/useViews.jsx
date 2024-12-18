import { useState, useCallback, useEffect } from "react";
import Config from "../component/Config";

const useViews = () => {
  const [views, setViews] = useState(0);
  const [animate, setAnimate] = useState(true);

  const hour = useCallback(() => {
    const currentTime = new Date();
    return currentTime.getHours();
  }, []);

  const generateViews = useCallback(() => {
    const TIME = hour();
    let minViews, maxViews;

    if (TIME >= 18 && TIME <= 21) {
      minViews = 500_000;
      maxViews = 700_000;
    } else {
      minViews = 900_000;
      maxViews = 1_000_000;
    }
    const randomViews =
      Math.floor(Math.random() * (maxViews - minViews + 1)) + minViews;
    setViews(randomViews);
  }, [hour]);

  useEffect(() => {
    generateViews();
    const intervalId = setInterval(generateViews, Config.VIEWS_DELAY);
    return () => clearInterval(intervalId);
  }, [generateViews]);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(
      () => setAnimate(false),
      Config.VIEWS_ANIMATION_DURATION
    );
    return () => clearTimeout(timeout);
  }, [views]);

  return {
    views,
    animate,
    formattedViews: Config.formatViews(views),
  };
};

export default useViews;
