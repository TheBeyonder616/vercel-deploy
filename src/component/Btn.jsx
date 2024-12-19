import PropTypes from "prop-types";

const Btn = ({ content }) => {
  return (
    <>
      <div className="button__top">{content}</div>
      <div className="button__bottom"></div>
      <div className="button__base"></div>
    </>
  );
};

Btn.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Btn;
