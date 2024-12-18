import PageSlider from "../../component/PageSlider";
import Svg from "../../component/Svg";
import { useRef } from "react";
import useSlider from "../../hooks/useSlider";

const HomeMainSlider = ({ srcSet = [], altSet = [], autoChange = false }) => {
  const parentRef = useRef(null);
  const sliderRef = useRef([]);
  const dotRef = useRef([]);

  const {
    id,
    imageId,
    initializesDot,
    keyDownInitializeDot,
    navigateSlider,
    keyDownNavigateSlider,
  } = useSlider({ autoChange, sliderRef, dotRef, parentRef });

  return (
    <section
      className="slider"
      ref={parentRef}
      onClick={initializesDot}
      onKeyDown={keyDownInitializeDot}
      aria-live="polite"
    >
      <PageSlider
        id={imageId.header}
        src={srcSet}
        alt={altSet}
        dotRef={dotRef}
        sliderRef={sliderRef}
      />
      <div
        className="slider__control control--left"
        tabIndex="0"
        onClick={() => navigateSlider("prev")}
        onKeyDown={(e) => keyDownNavigateSlider(e, "prev")}
        role="button"
        aria-label="Previous slide"
      >
        <Svg id={id.arrow} alt={"Icon Arrow"} cClass={"arrow--svg"} />
      </div>

      <div
        className="slider__control control--right"
        tabIndex="0"
        onClick={() => navigateSlider("next")}
        onKeyDown={(e) => keyDownNavigateSlider(e, "next")}
        role="button"
        aria-label="Next slide"
      >
        <Svg id={id.arrow} alt={"Icon Arrow"} cClass={"arrow--svg"} />
      </div>
    </section>
  );
};

export default HomeMainSlider;
