import NavLink from "./NavLink";
import Svg from "../../component/Svg";
import Config from "../../component/Config";
import Script from "../../component/Script";
import { useEffect, useRef } from "react";

const Desktop = () => {
  return (
    <div className="nav__list list--desktop">
      <NavLink />
    </div>
  );
};

const Mobile = () => {
  const menuRef = useRef(null);
  const id = Config.IconsId;

  const closeMenu = (e) => {
    if (!e.target.closest(".nav-overlay") && !e.target.closest(".close--svg"))
      return;
    Script.menuAnimation(false);
  };

  const handleCloseMenu = (e) => {
    if (e.key !== "Escape" || menuRef.current.classList.contains("hide"))
      return;
    Script.menuAnimation(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCloseMenu);
    return () => document.removeEventListener("keydown", handleCloseMenu);
  }, []);

  return (
    <section
      ref={menuRef}
      className="nav__menu hide"
      data-display="open-menu"
      onClick={closeMenu}
    >
      <div className="nav-overlay" title="close menu"></div>
      <div className="mobile-container">
        <div className="mobile-wrapper" data-display="nav-list">
          <Svg
            id={id.closeMenu}
            alt={"Icon Close Menu"}
            cClass={"close--svg"}
          />
          <NavLink className={"nav__list list--mobile"} />
        </div>
      </div>
    </section>
  );
};

const NavMenu = { Mobile, Desktop };
export default NavMenu;
