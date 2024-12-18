import { useEffect } from "react";
import ResizeBackGround from "../component/Resizer";

/**
 * ? Custom hook for dynamically resizing background images based on element width.
 * @param {React.RefObject} ref - The React ref pointing to the target element.
 * @param {Array} images - An array containing mobile, tablet, and desktop image URLs.
 * @param {string} rgb - The RGB overlay color (default: "rgb(var(--Black) / 0.2)").
 */
const useResizeBackground = (ref, images, rgb = "rgb(var(--Black) / 0.2)") => {
  useEffect(() => {
    if (!Array.isArray(images) || images.length !== 3) {
      console.error(
        "Invalid images array. Provide exactly three image URLs (mobile, tablet, desktop)."
      );
      return;
    }
    const element = ref.current;
    if (!element) {
      console.error(
        "Element reference is not set. Please provide a valid ref."
      );
      return;
    }

    const cleanup = ResizeBackGround.activate(element, images, rgb);

    return () => {
      cleanup();
    };
  }, [ref, images, rgb]);
};

export default useResizeBackground;
