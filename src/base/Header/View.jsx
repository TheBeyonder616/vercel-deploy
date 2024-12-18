import useViews from "../../hooks/useViews";
import Config from "../../component/Config";
import Svg from "../../component/Svg";

const Views = () => {
  const { animate, formattedViews } = useViews();
  const id = Config.IconsId;

  return (
    <div className={`active-users ${animate ? "active--state" : ""}`}>
      <div className="views--title">
        <h3 className="heading-views text--heading">
          Active
          <span className="span">Listeners</span>
        </h3>
      </div>
      <div className="view">
        <Svg
          id={id.glob}
          alt={"Icon Glob"}
          cClass={`glob--svg ${animate ? "active-state" : " "}`}
        />
        <span className="heading-views">{formattedViews}</span>
      </div>
    </div>
  );
};

export default Views;
