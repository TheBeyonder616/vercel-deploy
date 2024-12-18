export class LazyLoadImages {
  static #defaultOptions() {
    return {
      root: null,
      threshold: 0.1,
    };
  }

  static #handleLazyLoad(media, loadListener) {
    const parent = media.parentNode;
    media.classList.remove("lazy--img");
    parent.classList.remove("lazy--img-container");
    media.removeAttribute("data-src");
    media.tagName === "VIDEO"
      ? media.removeEventListener("canplaythrough", loadListener)
      : media.removeEventListener("load", loadListener);
  }

  static #lazyLoadMedia(entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const media = entry.target;
      const src = media.dataset.src;
      switch (media.tagName) {
        case "IMG":
          media.src = src;
          break;
        case "VIDEO":
          const source = document.createElement("source");
          media.src = src;
          source.src = src;
          source.type = "video/mp4";
          media.appendChild(source);
          media.load();
          break;
        default:
          console.warn(`${media.tagName} is not supported`);
      }
      const loadListener = () =>
        LazyLoadImages.#handleLazyLoad(media, loadListener);

      media.tagName === "VIDEO"
        ? media.addEventListener("canplaythrough", loadListener)
        : media.addEventListener("load", loadListener);

      observer.unobserve(media);
    });
  }

  static initLazyLoad(options = LazyLoadImages.#defaultOptions()) {
    const mediaElements = document.querySelectorAll("[data-src]");
    //prettier-ignore
    const observer = new IntersectionObserver(LazyLoadImages.#lazyLoadMedia, options);
    mediaElements.forEach((media) => observer.observe(media));

    return () => observer.disconnect();
  }
}

export class CretePopUp {
  static #defaultOptions() {
    return {
      root: null,
      threshold: 0.1,
    };
  }

  static #isIntersecting(element = null) {
    if (!element) throw new Error(`${element} should be the target  element`);
    element.classList.remove("show");
    element.tabIndex = -1;
    element.setAttribute("aria-hidden", "true");
  }

  static #isNotIntersecting(element = null) {
    if (!element) throw new Error(`${element} should be the target  element`);
    element.classList.add("show");
    element.tabIndex = 0;
    element.setAttribute("aria-hidden", "false");
  }

  static #handleIntersection(entries, observer, element) {
    const [entry] = entries;
    entry.isIntersecting
      ? CretePopUp.#isIntersecting(element)
      : CretePopUp.#isNotIntersecting(element);
  }

  static #handleError(targetAndRoot) {
    if (!Array.isArray(targetAndRoot))
      throw new Error(`Expected an array, but received: ${targetAndRoot}`);
    if (targetAndRoot.length !== 2)
      throw new Error(
        "targetAndRoot should be an array with two elements: [observedElement, target]"
      );
  }

  static initIntersection(
    targetAndRoot = [],
    options = CretePopUp.#defaultOptions()
  ) {
    CretePopUp.#handleError(targetAndRoot);
    const [observedElement, target] = targetAndRoot;

    const observer = new IntersectionObserver(
      (entries, observer) =>
        CretePopUp.#handleIntersection(entries, observer, target),
      options
    );
    if (observedElement) observer.observe(observedElement);

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }
}
