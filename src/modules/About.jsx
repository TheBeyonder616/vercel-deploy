import { backgroundAbout } from "../component/Assets";
import { useRef } from "react";
import useResizeBackground from "../hooks/useResizeBackGround";

const About = () => {
  const parentRef = useRef(null);
  const rgb = "rgb(var(--Black) / 0.6)";
  useResizeBackground(parentRef, backgroundAbout, rgb);

  return (
    <main ref={parentRef} className="main main--about">
      <section className="about-us">
        <h1 className="heading-secondary heading--about">About us</h1>
        <div className="about-us__container">
          <h3 className="heading-third heading--about">Pidgin Radio Limited</h3>
          <p className="heading-p heading--about">
            Welcome to Pidgin Radio, Nigeria&apos;s pioneering digital radio
            station, proudly broadcasting 100% Nigerian music,
            <span className="span">
              We&apos;re dedicated to showcasing the rich cultural heritage of
              Nigeria to the world, while connecting Nigerians in the diaspora
              back to their roots.
            </span>
            <span className="span">
              As the first digital Pidgin radio station in Nigeria, we&apos;re
              passionate about promoting Nigerian music, arts, and culture. Our
              mission is to provide a platform where Nigerians and lovers of
              Nigerian music can come together, celebrate our diversity, and
              enjoy the best of Nigerian entertainment.
            </span>
            At Pidgin Radio, we believe in the power of music and culture to
            unite people and inspire positive change. That&apos;s why we&apos;re
            committed to sharing the beauty and richness of Nigerian Pidgin
            English with the world.
            <span className="span">
              &quot;100% Naija Music... You Go Feel Am!&quot;
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
