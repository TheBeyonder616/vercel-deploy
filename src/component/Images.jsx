const Images = ({ src = "", alt = "", cClass = "" }) => {
  const classNames = `img-container lazy--img-container ${cClass}`;
  return (
    <div className={classNames}>
      <img className="img lazy--img" src={src} alt={alt} />
    </div>
  );
};

export default Images;
