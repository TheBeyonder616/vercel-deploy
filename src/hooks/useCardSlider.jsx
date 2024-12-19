import { useState, useEffect, useRef, useCallback } from "react";
import Config from "../component/Config";
import Script from "../component/Script";

/**
 * ?A custom hook to manage a horizontally scrollable card slider with navigation controls.
 *
 * @param {Object} options - The options for configuring the card slider.
 * @param {Array<string>} [options.srcSet=[]] - A set of image sources (optional).
 * @param {boolean} [options.schedule=false] - A boolean flag for schedule-related functionality (optional).
 *
 * @returns {Object} The hook returns an object containing necessary references and functions.
 * @returns {React.RefObject} sliderRef - The reference to the slider container element.
 * @returns {React.RefObject} buttonsRef - The reference to the left and right navigation buttons.
 * @returns {Function} handleControls - Function to handle the scroll action when the user clicks the left or right buttons.
 * @returns {Function} handleScroll - Debounced function to update the button states based on scroll position.
 * @returns {Function} checkIfScrollable - Function to check if the slider is scrollable and update the right button's state.
 * @returns {number} stepSize - The width of each card (used for scroll steps).
 */
const useCardSlider = ({ srcSet = [] }) => {
  const [stepSize, setStepSize] = useState(0);
  const sliderRef = useRef(null);
  const buttonsRef = useRef({ left: null, right: null });
  const timeoutRef = useRef(null);

  const getStepScroll = useCallback(() => {
    const maxScroll =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    return Math.min(stepSize * 2, maxScroll);
  }, [stepSize]);

  const scrollDirection = useCallback(
    (step = 0, isLeft = true) => ({
      left: isLeft ? -step : step,
      behavior: "smooth",
    }),
    []
  );

  const updateButtonState = useCallback(() => {
    const { left, right } = buttonsRef.current;
    const maxScroll =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    const currentScroll = Math.round(sliderRef.current.scrollLeft);
    const threshold = 5;

    if (currentScroll <= threshold) {
      left.classList.remove("active");
      right.classList.add("active");
    } else if (currentScroll >= maxScroll - threshold) {
      right.classList.remove("active");
      left.classList.add("active");
    } else {
      left.classList.add("active");
      right.classList.add("active");
    }
  }, []);

  const checkIfScrollable = useCallback(() => {
    const { right } = buttonsRef.current;
    if (sliderRef.current.scrollWidth <= sliderRef.current.clientWidth) {
      right.classList.remove("active");
    } else {
      right.classList.add("active");
    }
  }, []);

  const handleControls = useCallback(
    (left = true) => {
      const stepScroll = getStepScroll();
      sliderRef.current.scrollBy(scrollDirection(stepScroll, left));

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(updateButtonState, 300);
    },
    [getStepScroll, scrollDirection, updateButtonState]
  );

  const handleResize = useRef(
    Script.debounce(() => {
      updateButtonState();
      checkIfScrollable();
    }, Config.CARD_RESIZE_DELAY)
  ).current;

  const handleScroll = Script.debounce(
    () => updateButtonState(),
    Config.SCROLL_CARD_DELAY
  );

  useEffect(() => {
    const firstCard = sliderRef.current.querySelector(
      ".card-slider__container"
    );

    setStepSize(firstCard?.clientWidth || 0);
    updateButtonState();
    checkIfScrollable();
    window.addEventListener("resize", handleResize);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, updateButtonState, checkIfScrollable, srcSet]);

  return {
    sliderRef,
    buttonsRef,
    handleControls,
    handleScroll,
    checkIfScrollable,
    stepSize,
  };
};

export default useCardSlider;
