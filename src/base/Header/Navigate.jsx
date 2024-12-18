import NavMenu from "./Menu";
import Svg from "../../component/Svg";
import Config from "../../component/Config";
import Script from "../../component/Script";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Radio2 from "./Radio2";

const Navigate = () => {
  const id = Config.IconsId;
  const navigate = useNavigate();
  const handleOpenMenu = () => {
    Script.menuAnimation(true);
  };

  const radioComponent = useMemo(() => <Radio2 />, []);
  return (
    <nav className="nav" aria-label="Main Navigation">
      <div className="nav__wrapper">
        <section className="nav__section navigate-pages--section">
          <div className="logo__wrapper" onClick={() => navigate("/")}>
            <Svg
              id={id.brandLogo}
              alt={"Icon Brand logo Pidgin Radio"}
              cClass={"logo--svg"}
            />
          </div>
          <Svg
            id={id.menu}
            alt={"Icon menu"}
            cClass={"menu--svg"}
            method={handleOpenMenu}
          />
          <NavMenu.Desktop />
          <NavMenu.Mobile />
        </section>
      </div>
      {radioComponent}
    </nav>
  );
};

export default Navigate;
