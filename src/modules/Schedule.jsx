import { backgroundSchedule } from "../component/Assets";
import { useRef, useState, useEffect } from "react";
import scheduleImages from "../component/Assets";
import ScheduleDay from "./ScheduleDay";
import Config from "../component/Config";
import useResizeBackground from "../hooks/useResizeBackGround";

const DesktopHeader = ({
  handleDesktopClick,
  handDesktopKey,
  addActiveDay,
  daysOfWeek,
}) => (
  <ul className="schedule__list">
    {daysOfWeek.map((day) => (
      <li
        key={day}
        tabIndex="0"
        className={`schedule__item ${addActiveDay(day)}`}
        aria-label={day.toLowerCase()}
        onClick={() => handleDesktopClick(day)}
        onKeyDown={(e) => handDesktopKey(e, day)}
      >
        {day}
      </li>
    ))}
  </ul>
);

const MobileHeader = ({ handleMobileChange, activeDay, daysOfWeek }) => (
  <select
    className="schedule__dropdown"
    aria-label="Select a day"
    onChange={handleMobileChange}
    value={activeDay.toLowerCase()}
  >
    {daysOfWeek.map((day) => (
      <option key={day} className="schedule__option" value={day.toLowerCase()}>
        {day}
      </option>
    ))}
  </select>
);

const Schedule = () => {
  //!======================================
  const parentRef = useRef(null);
  const itemRef = useRef(new Map());
  const timeoutRef = useRef(null);
  const daysOfWeek = Config.DAYS_OF_THE_WEEK;

  const getFormattedDay = () => {
    const currentDayIndex = (new Date().getDay() + 6) % 7;
    return daysOfWeek[currentDayIndex];
  };

  const pickDay = () => {
    if (Config.SCHEDULE === " ") {
      const day = getFormattedDay();
      Config.SCHEDULE = " ";
      return day;
    }

    if (Config.SCHEDULE !== " ") {
      const day = Config.SCHEDULE;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      itemRef.current = setTimeout(() => {
        Config.SCHEDULE = " ";
        timeoutRef.current = null;
      }, 0);
      return day;
    }
  };

  const [imageDay, setImageDay] = useState(
    Object.entries(scheduleImages[pickDay().toLowerCase()])
  );
  const [activeDay, setActiveDay] = useState(pickDay());

  const updateImages = (day) => {
    if (day === activeDay) return;
    setActiveDay(day);
    setImageDay(Object.entries(scheduleImages[day.toLowerCase()]));
  };

  const handleDesktopClick = (clickedDay = "") => {
    updateImages(clickedDay);
  };

  const handDesktopKey = (e, day = "") => {
    if (e.key !== "Enter" || !e.target) return;
    handleDesktopClick(day);
  };

  const handleMobileChange = (e) => {
    const selectedDay = e.target.value;
    updateImages(selectedDay);
  };

  const addActiveDay = (day) => {
    return activeDay.toLowerCase() === day.toLowerCase() ? "active--day" : "";
  };

  const rgb = "rgb(var(--Black) / 0.42)";
  useResizeBackground(parentRef, backgroundSchedule, rgb);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  });
  return (
    <main ref={parentRef} className="main main--schedule">
      <h1 className="visually-hidden"> Pidgin Radio Schedule</h1>
      <article className="schedule">
        {/*======================Header=============================  */}
        <header className="schedule__heading">
          <section className="schedule__desktop">
            <DesktopHeader
              handleDesktopClick={handleDesktopClick}
              handDesktopKey={handDesktopKey}
              addActiveDay={addActiveDay}
              itemRef={itemRef}
              daysOfWeek={daysOfWeek}
            />
          </section>
          <section className="schedule__mobile">
            <MobileHeader
              handleMobileChange={handleMobileChange}
              activeDay={activeDay}
              daysOfWeek={daysOfWeek}
            />
          </section>
        </header>
        {/*========================Body=============================  */}
        <section className="schedule__cards">
          <ScheduleDay imageDay={imageDay} />
        </section>
      </article>
    </main>
  );
};

export default Schedule;
