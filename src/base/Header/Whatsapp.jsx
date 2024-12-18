import Config from "../../component/Config";
import Svg from "../../component/Svg";
import { useRef, useEffect } from "react";

const Whatsapp = () => {
  const id = Config.IconsId;
  const media = Config.MediaHandle;
  const whatsappPopupRef = useRef(null);
  const whatsappRef = useRef(null);

  const openPopup = () => {
    whatsappRef.current.classList.add("hide");
    whatsappPopupRef.current.classList.remove("hide");
  };

  const keyOpenPopup = (e) => {
    if (e.key !== "Enter") return;
    openPopup();
  };

  const closePopup = () => {
    whatsappRef.current.classList.remove("hide");
    whatsappPopupRef.current.classList.add("hide");
  };

  const keyClosePopup = (e) => {
    if (e.key !== "Enter") return;
    closePopup();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (
        e.key !== "Escape" ||
        whatsappPopupRef.current.classList.contains("hide")
      )
        return;
      closePopup();
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <section className="whatsapp">
      <div
        className="whatsapp__container"
        ref={whatsappRef}
        tabIndex="0"
        onClick={openPopup}
        onKeyDown={keyOpenPopup}
        role="button"
        aria-label="Open whatsapp popup"
      >
        <Svg
          id={id.whatsapp}
          alt={"Icon whatsapp"}
          cClass={"whatsapp--container"}
        />
      </div>

      <section className="whatsapp__popup hide" ref={whatsappPopupRef}>
        <div className="close-popup">
          <div className="wrapper-whatsapp">
            <Svg
              id={id.whatsapp}
              alt={"Icon Whatsapp"}
              cClass={"text-whatsapp--container"}
            />
            <h2 className="heading-secondary whatsapp--heading">Whatsapp</h2>
          </div>

          <div className="wrapper-close-icon">
            <div
              className="close__whatsapp-container"
              onClick={closePopup}
              onKeyDown={keyClosePopup}
              tabIndex="0"
              role="button"
              aria-label="close whatsapp popup"
            >
              <Svg
                id={id.closeMenu}
                alt={"Icon close Whatsapp Popup"}
                cClass={"whatsapp-close--container"}
              />
            </div>
          </div>
        </div>

        <div className="contact">
          {/* <div className="comment-wrapper">
            <h2 className="heading-secondary comment--heading">
              Contact Pidgin Radio
            </h2>
          </div> */}
          {/*=================================[link]========================  */}
          <div className="link-wrapper">
            <div className="link-container">
              <a
                className="btn-send"
                href={media.whatsapp}
                target="_blank"
                aria-label="Chat with me on Whatsapp"
                rel="noopener noreferrer"
              >
                <div className="link__container">
                  <Svg
                    id={id.message}
                    alt={"Icon message"}
                    cClass={"message--svg send-icon"}
                  />
                </div>
                Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Whatsapp;
