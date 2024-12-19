import PropTypes from "prop-types";
import icons from "../assets/icons.svg";
import { useEffect, useRef } from "react";
/**
 * !Svg component to render an SVG icon and handle a click event.
 *
 * @param {Object} props - The component's props.
 * @param {string} [props.id=""] - The id of the SVG icon to display.
 * @param {string} [props.alt=""] - The alt text for accessibility.
 * @param {string} [props.cClass=""] - Additional CSS class(es) to apply to the container.
 * @param {function} [props.method] - A function to call when the SVG is clicked.
 * @param {function} [props.method] - The click event handler function that is called when the icon is clicked.
 */
const Svg = ({ id, alt, cClass, method }) => {
  const svgRef = useRef(null);
  const containerClass = `svg-container ${cClass}`;
  const link = `${icons}#${id}`;

  const handleFunCall = (method, ref) => {
    if (!method && !ref.current) return;
    ref.current.addEventListener("click", method);
    return () => {
      ref.current.removeEventListener("click", method);
    };
  };

  useEffect(() => {
    handleFunCall(method, svgRef);
  }, [method]);

  return (
    <div className={containerClass} ref={svgRef}>
      <svg className="svg" aria-label={alt}>
        <use href={link}></use>
      </svg>
    </div>
  );
};

Svg.propTypes = {
  id: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  cClass: PropTypes.string,
  method: PropTypes.func,
};

export default Svg;
