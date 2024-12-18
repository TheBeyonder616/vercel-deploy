import Config from "../component/Config";
import Svg from "../component/Svg";

const Footer = () => {
  const id = Config.IconsId;
  const media = Config.MediaHandle;
  const date = new Date();
  return (
    <footer className="footer">
      <section className="footer__media-links">
        <a
          href={media.facebook}
          className="link link--facebook"
          aria-label="Visit my facebook page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Svg
            id={id.facebook}
            alt={"Facebook Logo"}
            cClass={"facebook--svg"}
          />
        </a>

        <a
          href={media.twitter}
          className="link link--twitter"
          aria-label="Visit my twitter page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Svg id={id.twitter} alt={"Twitter Logo"} cClass={"twitter--svg"} />
        </a>
        <a
          href={media.instagram}
          className="link link--instagram"
          aria-label="Visit my instagram page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Svg
            id={id.instagram}
            alt={"Instagram Logo"}
            cClass={"instagram--svg"}
          />
        </a>
      </section>
      {/*===========================Navigate========================  */}

      {/*===========================CopyWite========================  */}
      <section className="footer__copyright">
        <p className="heading-p heading-copyright">
          &copy; {date.getFullYear()}{" "}
          <span className="span">pidgin radio limited</span> All Rights
          Reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
