import Script from "./Script";

export default class ResizeBackGround {
  static setBackgroundImage = (
    width,
    element,
    [mbImg = "", tabImg = "", deskImg = ""],
    rgb = "rgb(var(--Black) / 0.2)"
  ) => {
    if (![mbImg, tabImg, deskImg].every(Boolean)) {
      throw new Error(
        "All image parameters (mobile, tablet, desktop) must be provided."
      );
    }
    const backgroundStyle = (img) =>
      `linear-gradient(${rgb}, ${rgb}), url(${img}) center center / cover no-repeat`;

    switch (true) {
      case width < 768:
        element.style.background = backgroundStyle(mbImg);
        break;
      case width >= 768 && width < 1024:
        element.style.background = backgroundStyle(tabImg);
        break;
      default:
        element.style.background = backgroundStyle(deskImg);
        break;
    }
  };

  static handleResize(
    [entry],
    [mbImg = "", tabImg = "", desktopImg = ""],
    rgb = "rgb(var(--Black) / 0.2)"
  ) {
    const { width } = entry.contentRect;
    const element = entry.target;
    //prettier-ignore
    ResizeBackGround.setBackgroundImage(width, element, [mbImg, tabImg, desktopImg,], rgb);
  }

  static activate(
    element,
    [mbImg = "", tabImg = "", deskImg = ""],
    rgb = "rgb(var(--Black) / 0.2)"
  ) {
    if (!element) throw new Error("Element must exist");

    const debouncedHandleResize = Script.debounce(
      (entries) =>
        ResizeBackGround.handleResize(entries, [mbImg, tabImg, deskImg], rgb),
      150
    );

    const resizeObserver = new ResizeObserver((entries) => {
      debouncedHandleResize(entries);
    });

    resizeObserver.observe(element);
    return () => {
      resizeObserver.unobserve(element);
    };
  }
}
