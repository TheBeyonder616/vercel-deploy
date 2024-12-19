import { useRef } from "react";
import Config from "../../component/Config";
import Svg from "../../component/Svg";
import Script from "../../component/Script";
import Whatsapp from "./Whatsapp";
import Views from "./View";
import PropTypes from "prop-types";

const Video = ({ videoRef }) => (
  <video ref={videoRef} controls className="hide">
    <source type="audio/mpeg" />
    Your browser does not support the audio element.
  </video>
);

Video.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

const Radio2 = () => {
  //!=======================================[Constant]
  const id = Config.IconsId;
  const API_URL = Config.Radio.url;
  const DELAY = Config.Radio.delay;
  const TIMEOUT = Config.TIMEOUT_DURATION;
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const loadingRef = useRef(false);

  const debouncedHandleVideoPlay = useRef(
    Script.debounce(async () => {
      const RadioModule = await import("./radioLogic");
      const { handleVideoPlay } = RadioModule.default;
      await handleVideoPlay(
        API_URL,
        playerRef.current,
        videoRef.current,
        loadingRef.current,
        TIMEOUT,
        id
      );
    }, DELAY)
  ).current;

  return (
    <article className="radio-second">
      {/*================================[logo]====================  */}
      <section className="radio-second__logo">
        <Svg
          id={id.brandLogo}
          alt={"Logo of Pidgin radio"}
          cClass={"logo--svg"}
        />
      </section>
      {/*================================[player]====================  */}
      <section className="radio-second__player">
        <div className="radio__play">
          <div className="radio__container">
            <Video videoRef={videoRef} />
            {/* ==================Suspended=================== */}
            <div
              role="button"
              className="player__container"
              onClick={debouncedHandleVideoPlay}
              ref={playerRef}
              aria-label="pause / play music"
            >
              <Svg id={id.play} alt={"Play music"} cClass={"play--svg"} />
            </div>
          </div>
        </div>
      </section>
      {/*================================[count]====================  */}
      <section className="radio-second__count">
        <div className="container">
          <Views videoRef={videoRef} />
          <Whatsapp />
        </div>
      </section>
    </article>
  );
};

export default Radio2;
