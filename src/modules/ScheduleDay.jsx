import useLazyLoadImages from "../hooks/useLazyLoadImages";

const ScheduleDay = ({ imageDay }) => {
  useLazyLoadImages();

  return imageDay.map(([key, value], index) => (
    <div
      key={index}
      className="img-container lazy--img-container schedule--img"
    >
      <img className="img lazy--img" data-src={value} alt={key} />
    </div>
  ));
};

export default ScheduleDay;
