import { Link, useLocation } from "react-router-dom";
import Config from "../../component/Config";
import Script from "../../component/Script";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const NavLink = ({ className = "" }) => {
  const path = Config.Path;
  const location = useLocation();
  const linksRef = useRef(new Map());

  useEffect(() => {
    const handleLocation = () => {
      linksRef.current.forEach((link) => {
        if (!link) return;

        const linkPath = link.getAttribute("href");
        if (linkPath === location.pathname) {
          link.classList.add("active--link");
          link.setAttribute("aria-current", "Page");
        } else {
          link.classList.remove("active--link");
          link.removeAttribute("aria-current");
        }
        Script.menuAnimation(false);
      });
    };
    handleLocation();
  }, [location]);

  return (
    <ul className={className}>
      <li className="nav__item">
        <Link
          className="a a--link"
          ref={(el) => el && linksRef.current.set(0, el)}
          to="/"
        >
          Home
        </Link>
      </li>
      <li className="nav__item">
        <Link
          className="a a--link"
          ref={(el) => el && linksRef.current.set(1, el)}
          to={path.about}
        >
          About Us
        </Link>
      </li>
      <li className="nav__item">
        <Link
          className="a a--link"
          ref={(el) => el && linksRef.current.set(2, el)}
          to={path.schedule}
        >
          Schedule
        </Link>
      </li>
      <li className="nav__item">
        <Link
          className="a a--link"
          to={path.advert}
          ref={(el) => el && linksRef.current.set(3, el)}
        >
          Advert Rate Card
        </Link>
      </li>
      <li className="nav__item">
        <Link
          className="a a--link"
          to={path.podcast}
          ref={(el) => el && linksRef.current.set(4, el)}
        >
          PodCast
        </Link>
      </li>
      <li className="nav__item">
        <Link
          className="a a--link"
          to={path.donation}
          ref={(el) => el && linksRef.current.set(5, el)}
        >
          Donation
        </Link>
      </li>
      <li className="nav__item">
        <Link
          className="a a--link"
          ref={(el) => el && linksRef.current.set(6, el)}
          to={path.contact}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

NavLink.propTypes = {
  className: PropTypes.string,
};

export default NavLink;
