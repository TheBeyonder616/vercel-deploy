const Btn = ({ content = "" }) => {
  return (
    <>
      <div className="button__top">{content}</div>
      <div className="button__bottom"></div>
      <div className="button__base"></div>
    </>
  );
};

export default Btn;
