import Svg from "../../component/Svg";
import Config from "../../component/Config";

const BrandDeals = () => {
  const id = Config.IconsId;
  return (
    <section className="brand-deals">
      <div className="brand-deals__container">
        <Svg id={id.mtn} alt={"Icon Mtn Logo"} cClass={"mtn--svg"} />
      </div>

      <div className="brand-deals__container img--brand">
        <Svg id={id.huawei} alt={"Icon Huawei logo"} cClass={"huawei--svg"} />
      </div>

      <div className="brand-deals__container">
        <Svg
          id={id.kellogg}
          alt={"Icon kellogg logo"}
          cClass={"kellogg--svg"}
        />
      </div>

      <div className="brand-deals__container">
        <Svg
          id={id.logosChops}
          alt={"Icon Lagos Chops Logo"}
          cClass={"lagos-chops--svg"}
        />
      </div>
    </section>
  );
};

export default BrandDeals;
