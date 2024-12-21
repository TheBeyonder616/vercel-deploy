import { useEffect, useCallback } from "react";
import { Slider, SliderAuto } from "../component/Slider";
import Config from "../component/Config";

/**
 * ?Custom hook for managing the slider functionality.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} [params.autoChange=false] - Flag to enable auto-slide functionality.
 * @param {React.RefObject<HTMLElement>} params.sliderRef - Reference to the slider element.
 * @param {React.RefObject<HTMLElement>} params.dotRef - Reference to the dot navigation element.
 * @param {React.RefObject<HTMLElement>} params.parentRef - Reference to the parent element containing the slider.
 *
 * @returns {Object} - The hook returns an object containing various functions and identifiers for slider behavior.
 *
 * @returns {string} id - The ID for the icon configuration.
 * @returns {string} imageId - The ID for the slider image configuration.
 * @returns {function} initializesDot - Function to initialize a slider dot when clicked.
 * @returns {function} keyDownInitializeDot - Function to initialize a slider dot when the "Enter" key is pressed.
 * @returns {function} navigateSlider - Function to navigate the slider in a specific direction.
 * @returns {function} keyDownNavigateSlider - Function to navigate the slider when the "Enter" key is pressed.
 */
const useSlider = ({ autoChange = false, sliderRef, dotRef, parentRef }) => {
  const id = Config.IconsId;
  const imageId = Config.SliderImagesId;

  const sliderOptions = useCallback(
    (slider, dots, parent, translateY = false) => {
      return { slider, dots, parent, translateY };
    },
    []
  );

  const initializesDot = useCallback(
    (e) => {
      if (!e.target.classList.contains("slider__dot")) return;
      Slider.initDot(
        sliderOptions(sliderRef.current, dotRef.current, parentRef.current),
        e
      );
    },
    [sliderOptions, sliderRef, dotRef, parentRef]
  );

  const keyDownInitializeDot = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      initializesDot(e);
    },
    [initializesDot]
  );

  const navigateSlider = useCallback(
    (direction) => {
      Slider.navigateSlide(
        sliderOptions(
          sliderRef.current,
          dotRef.current,
          parentRef.current,
          false
        ),
        direction
      );
    },
    [sliderRef, dotRef, parentRef, sliderOptions]
  );

  const keyDownNavigateSlider = useCallback(
    (e, direction) => {
      if (e.key !== "Enter") return;
      navigateSlider(direction);
    },
    [navigateSlider]
  );

  useEffect(() => {
    const element = parentRef.current;
    Slider.handleUpdateSlide(sliderRef.current, parentRef.current, false);

    if (autoChange) {
      SliderAuto.initializeAutoSlider(
        () => navigateSlider("next"),
        parentRef.current,
        Config.AUTO_SLIDE_DELAY
      );
    }

    return () => {
      Slider.clearSlider();
      if (autoChange) SliderAuto.cleanup(element);
    };
  }, [autoChange, navigateSlider, sliderRef, parentRef]);

  return {
    id,
    imageId,
    initializesDot,
    keyDownInitializeDot,
    navigateSlider,
    keyDownNavigateSlider,
  };
};

export default useSlider;
