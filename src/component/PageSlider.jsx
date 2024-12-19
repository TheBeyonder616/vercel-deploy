import React from "react";
import PropTypes from "prop-types";

const PageSlider = ({ src = [], alt = [], dotRef, sliderRef }) => {
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  const fileType = (src = "", alt) => {
    switch (true) {
      case isVideo(src):
        return (
          <video
            className="video lazy--img"
            data-src={src}
            loop
            muted
            autoPlay
            alt={alt}
          >
            <source type="video/mp4" src="" />
            Your browser does not support the video tag.
          </video>
        );
      case isImage(src):
        return <img className="img lazy--img" data-src={src} alt={alt} />;
      default:
        throw new Error("Unsupported file type");
    }
  };

  const renderSlides = () => {
    return src.map((src, index) => (
      <div
        className="img-container lazy--img-container slider__slide"
        key={index}
        ref={(el) => (sliderRef.current[index] = el)}
      >
        {fileType(src, alt[index])}
      </div>
    ));
  };

  const renderDots = () => {
    return (
      <div className="slider__dot-container">
        {src.map((_, index) => (
          <div
            role="button"
            key={index}
            className={`slider__dot ${index === 0 ? "active" : ""}`}
            data-control={index}
            tabIndex="0"
            aria-label={`control slider ${index}`}
            ref={(el) => (dotRef.current[index] = el)}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderSlides()}
      {renderDots()}
    </>
  );
};

PageSlider.displayName = "PageSlider";

PageSlider.propTypes = {
  // id: PropTypes.string,
  src: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt: PropTypes.arrayOf(PropTypes.string).isRequired,
  dotRef: PropTypes.shape({ current: PropTypes.array }).isRequired,
  sliderRef: PropTypes.shape({ current: PropTypes.array }).isRequired,
};

export default React.memo(PageSlider);
