import { backgroundAdvert } from "../component/Assets";
import Btn from "../component/Btn";
import { AdvertRate } from "../component/Assets";
import { useRef, useState } from "react";
import useResizeBackground from "../hooks/useResizeBackGround";
import Svg from "../component/Svg";
import Config from "../component/Config";

const Advert = () => {
  const id = Config.IconsId;
  const [loading, setIsLoading] = useState(false);
  const timeOutRef = useRef(null);
  const parentRef = useRef(null);
  const rgb = "rgb(var(--Black) / 0.7)";
  useResizeBackground(parentRef, backgroundAdvert, rgb);

  const handleDownload = () => {
    if (loading) return;
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    setIsLoading(true);
    timeOutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main ref={parentRef} className="main main--advert-rate">
      <section className="advert-wrapper">
        <div className="advert-wrapper__container">
          <h1 className="heading-secondary heading--advert">
            Pidgin Radio Limited Rate Card
          </h1>
          <div className="advert-container">
            <a
              onClick={handleDownload}
              className="button"
              href={AdvertRate}
              download={"Pidgin_Radio_Rate_Card.pdf"}
              aria-label="download pidgin radio rate card"
            >
              <Btn
                content={
                  <>
                    <span className={loading ? "hidden" : ""}>Download</span>

                    <Svg
                      id={id.spinner}
                      cClass={`download--spinner-container ${
                        !loading ? "hidden" : ""
                      }`}
                      alt={"Icon Loading"}
                    />
                  </>
                }
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Advert;
