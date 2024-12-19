import PropTypes from "prop-types";
const Images = ({ src = "", alt = "", cClass = "" }) => {
  const classNames = `img-container lazy--img-container ${cClass}`;
  return (
    <div className={classNames}>
      <img className="img lazy--img" src={src} alt={alt} />
    </div>
  );
};

Images.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  cClass: PropTypes.string,
};

Images.defaultProps = {
  cClass: "",
};
export default Images;
