import { backgroundPodcast } from "../component/Assets";
import { useRef } from "react";
import useResizeBackground from "../hooks/useResizeBackGround";

const Podcast = () => {
  const parentRef = useRef(null);
  const rgb = "rgb(var(--Black) / 0.5)";
  useResizeBackground(parentRef, backgroundPodcast, rgb);
  return (
    <main ref={parentRef} className="main main--podcast">
      <section className="podcast">
        <h1 className="heading-secondary heading--podcast"> Coming Soon!</h1>
      </section>
    </main>
  );
};

export default Podcast;
