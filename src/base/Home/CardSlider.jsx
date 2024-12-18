import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useCardSlider from "../../hooks/useCardSlider";
import Config from "../../component/Config";
import Svg from "../../component/Svg";

const CardSlider = ({ srcSet = [" "], schedule = false }) => {
  const navigate = useNavigate();
  const daysOfWeek = Config.DAYS_OF_THE_WEEK;
  const id = Config.IconsId;

  const { sliderRef, buttonsRef, handleControls, handleScroll } = useCardSlider(
    { srcSet, schedule }
  );

  const navigateToSchedule = useCallback(
    (e) => {
      const schedule = e.target
        .closest("[data-schedule]")
        .getAttribute("data-schedule");
      Config.SCHEDULE = schedule;
      navigate(Config.Path.schedule);
    },
    [navigate]
  );

  const KeyNavigateToSchedule = useCallback(
    (e) => {
      if (e.key === "Enter") navigateToSchedule(e);
    },
    [navigateToSchedule]
  );

  const Cards = useMemo(() => {
    return srcSet.map(([key, value], index) => (
      <div
        key={key}
        className={`card-slider__container ${schedule ? "schedule--card" : ""}`}
        role="button"
        onClick={schedule ? navigateToSchedule : undefined}
        onKeyDown={schedule ? KeyNavigateToSchedule : undefined}
        data-schedule={daysOfWeek[index]}
        tabIndex={schedule ? "0" : undefined}
        aria-label={`Navigate to ${daysOfWeek[index]} schedule`}
        title={daysOfWeek[index]}
      >
        <div className="img-container lazy--img-container card--container">
          <img data-src={value} alt={key} className="img lazy--img" />
        </div>
      </div>
    ));
  }, [srcSet, daysOfWeek, schedule, navigateToSchedule, KeyNavigateToSchedule]);

  return (
    <div className="card-wrapper">
      <section
        className={`card-slider ${srcSet.length <= 6 ? "slider--small" : ""}`}
        ref={sliderRef}
        onScroll={handleScroll}
      >
        <button
          className="card-slider__control-card control--right"
          onClick={() => handleControls(false)}
          ref={(el) => (buttonsRef.current.right = el)}
          aria-label="Next slide"
        >
          <Svg id={id.arrow} alt="Icon arrow right" cClass={"arrow--svg"} />
        </button>

        <button
          className="card-slider__control-card control--left"
          onClick={() => handleControls(true)}
          ref={(el) => (buttonsRef.current.left = el)}
          aria-label="Previous slide"
        >
          <Svg id={id.arrow} alt="Icon arrow left" cClass={"arrow--svg"} />
        </button>
        {Cards}
      </section>
    </div>
  );
};

export default CardSlider;
