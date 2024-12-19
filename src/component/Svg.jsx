import PropTypes from "prop-types";
import icons from "../assets/icons.svg";
import { useRef } from "react";
/**
 * !Svg component to render an SVG icon and handle a click event.
 *
 * @param {Object} props - The component's props.
 * @param {string} [props.id=""] - The id of the SVG icon to display.
 * @param {string} [props.alt=""] - The alt text for accessibility.
 * @param {string} [props.cClass=""] - Additional CSS class(es) to apply to the container.
 */
const Svg = ({ id, alt, cClass }) => {
  const svgRef = useRef(null);
  const containerClass = `svg-container ${cClass}`;
  const link = `${icons}#${id}`;

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
  // method: PropTypes.func,
};

export default Svg;
