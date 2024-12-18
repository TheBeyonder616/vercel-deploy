import { useEffect } from "react";
import { LazyLoadImages } from "../component/LazyLodAPop";

/**
 * ?Custom hook for initializing lazy load images functionality.
 * This hook sets up lazy loading for images and cleans up the observer on unmount.
 *
 * @param {Object} options - The options object for lazy loading.
 * @param {IntersectionObserverInit} options - IntersectionObserver options (e.g., root, threshold, etc.).
 *
 * @return {void}
 */
const useLazyLoadImages = (options) => {
  useEffect(() => {
    const disconnectObserver = LazyLoadImages.initLazyLoad(options);
    return () => {
      if (disconnectObserver) disconnectObserver();
    };
  });
};

export default useLazyLoadImages;
