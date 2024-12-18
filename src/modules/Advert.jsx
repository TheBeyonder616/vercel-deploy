import { backgroundAdvert } from "../component/Assets";
import Btn from "../component/Btn";
import { AdvertRate } from "../component/Assets";
import { useRef } from "react";
import useResizeBackground from "../hooks/useResizeBackGround";

const Advert = () => {
  const parentRef = useRef(null);
  const rgb = "rgb(var(--Black) / 0.7)";
  useResizeBackground(parentRef, backgroundAdvert, rgb);

  const handleDownload = () => {
    window.location.href = AdvertRate;
  };

  return (
    <main ref={parentRef} className="main main--advert-rate">
      <section className="advert-wrapper">
        <div className="advert-wrapper__container">
          <h1 className="heading-secondary heading--advert">
            Pidgin Radio Limited Rate Card
          </h1>
          <div className="advert-container">
            <button
              type="button"
              className="button"
              onClick={handleDownload}
              aria-label="download pidgin radio rate card"
            >
              <Btn content={"Download"} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Advert;
