// import Svg from "../../component/Svg";
// import Config from "../../component/Config";
// import { useRef } from "react";
// import Script from "../../component/Script";

// const Radio = () => {
//   const id = Config.IconsId;
//   const API_URL = Config.Radio.url;
//   const DELAY = Config.Radio.delay;
//   const videoRef = useRef(null);
//   const musicRef = useRef(null);
//   const loadingRef = useRef(false);

//   const toggleId = (videoElement, error, loading) => {
//     const player = document.querySelector(".play--svg");
//     const [svg] = player.childNodes;
//     const [use] = svg.childNodes;
//     const href = use.getAttribute("href");
//     const newHref = href.split("#")[0] + "#";
//     const setId = (id) => use.setAttribute("href", id);
//     if (error) {
//       player.classList.remove("spin--svg");
//       setId(newHref.trim() + id.error);
//       return;
//     }

//     if (loading) {
//       setId(newHref.trim() + id.spinner);
//       player.classList.add("spin--svg");
//       return;
//     }
//     player.classList.remove("spin--svg");
//     videoElement.paused
//       ? setId(newHref.trim() + id.play)
//       : setId(newHref.trim() + id.paused);
//   };

//   const playAudio = (videoElement, music, error) => {
//     if (error) return;
//     if (!videoElement.paused) return;
//     videoElement.play();
//     music.classList.add("active");
//   };

//   const pauseAudio = (videoElement, music) => {
//     if (videoElement.paused) return;
//     videoElement.pause();
//     music.classList.remove("active");
//   };

//   const handleVideoPlay = async () => {
//     const videoElement = videoRef.current;
//     const music = musicRef.current;

//     try {
//       if (!videoElement.paused) {
//         videoElement.src = "";
//         pauseAudio(videoElement, music);
//         toggleId(videoElement);
//         music.classList.remove("active");
//         return;
//       }

//       loadingRef.current = true;
//       if (loadingRef.current) {
//         toggleId(videoElement, false, true);
//       }

//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error("failed to load audio");
//       videoElement.src = res.url;

//       playAudio(videoElement, music, false);
//       loadingRef.current = false;
//       toggleId(videoElement, false);
//     } catch (error) {
//       loadingRef.current = false;
//       videoElement.src = "";
//       toggleId(videoElement, true);
//     }
//   };

//   const Video = () => (
//     <video ref={videoRef} controls className="hide">
//       <source type="audio/mpeg" />
//       Your browser does not support the audio element.
//     </video>
//   );

//   const debouncedHandleVideoPlay = Script.debounce(handleVideoPlay, DELAY);
//   return (
//     <div className="radio">
//       {/*==============================Music================  */}
//       <div className="radio__music">
//         <span className="icon__music" data-display="music" ref={musicRef} />
//       </div>
//       {/*===============================Title================  */}
//       <div className="radio__title">
//         <div className="tile-wrapper">
//           <div className="container">
//             <span className="span heading--radio">on air</span>
//           </div>
//           <div className="container">
//             <span className="dot"></span>
//           </div>
//         </div>
//       </div>

//       {/*===============================Play================  */}
//       <div className="radio__play">
//         <div className="radio__container">
//           <Video />
//           <Svg
//             id={id.play}
//             alt={"Play music"}
//             cClass={"play--svg"}
//             method={debouncedHandleVideoPlay}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Radio;
