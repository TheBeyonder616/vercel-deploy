export class Slider {
  static #currentSlider = new Map();
  static #message = [0, 1, 2];

  //!====================================={Map index logic}
  static #setSliderId(parent = null) {
    if (parent.id) return +parent.id.split("-")[1];
    const newId = Slider.#currentSlider.size + 1;
    parent.setAttribute("data-slider-parent", `${newId}`);
    parent.id = `slider-${newId}`;
    return newId;
  }

  static #setInstance(sliderId) {
    const newInstance = {};
    const currentSliderEntry = Slider.#currentSlider.get(sliderId);
    return Slider.#currentSlider.set(sliderId, {
      instance: newInstance,
      currentIndex: currentSliderEntry ? currentSliderEntry.currentIndex : 0,
    });
  }

  static #initSlider(sliderId = 0, func = null) {
    return func === null
      ? Slider.#currentSlider.get(sliderId)
      : Slider.#currentSlider.set(sliderId, {
          instance: func,
          currentIndex: 0,
        });
  }

  static #updateIndex(sliderId, newCurrent) {
    const existingEntry = Slider.#currentSlider.get(sliderId);
    if (!existingEntry) return;
    Slider.#currentSlider.set(sliderId, {
      instance: existingEntry.instance,
      currentIndex: newCurrent,
    });
  }
  //!=============================================={Slider Logic}S
  static #direction(slider = [], current = 0, right = true) {
    const totalSlide = slider.length;
    //prettier-ignore
    return right 
          ? (current < totalSlide - 1 ? current + 1 : 0) 
          : (current > 0 ? current - 1 : totalSlide - 1);
  }

  //prettier-ignores
  static #handleLoop(slider, currentIndex, axis) {
    for (let index = 0; index < slider.length; index++) {
      slider[index].style.transform = `translate${axis}(${
        (index - currentIndex) * 100
      }%)`;
      slider[index].setAttribute(
        "aria-hidden",
        index === currentIndex ? "false" : "true"
      );
    }
  }

  /**
   *? Updates the position of slides in the slider based on the current index.
   * This method applies a CSS transform to each slide to create a sliding effect.
   *
   * @param {HTMLElement[]} slider - An array of slider elements to be updated.
   * @param {HTMLElement} parent - The parent element containing the slider.
   * @param {boolean} translateY - A flag indicating whether the translation should be vertical (true) or horizontal (false).
   * @param {number} currentIndex - The index of the currently active slide.
   *
   * @throws {Error} If the slider is not an array or the parent is not a valid DOM element.
   */
  static handleUpdateSlide(
    slider = [],
    parent = null,
    translateY = false,
    currentIndex = 0
  ) {
    Slider.#validateNode(slider);
    Slider.#validateElement(parent);

    const sliderId = Slider.#setSliderId(parent);
    Slider.#initSlider(sliderId, true);
    // prettier-ignore
    const axis = translateY ? "Y" : "X";
    Slider.#handleLoop(slider, currentIndex, axis);
  }

  /**
   * ?Navigates to the next or previous slide in the slider.
   * @param {Object} params - The parameters for the navigation.
   * @param {HTMLElement[]} params.slider - The array of slider elements.
   * @param {HTMLElement[]} params.dots - The array of dot elements.
   * @param {HTMLElement} params.parent - The parent element of the slider.
   * @param {boolean} params.translateY - Indicates if the translation should be vertical.
   * @param {string} direction - The direction to navigate, either "prev" or "next".
   */
  static navigateSlide(
    { slider = [], dots = [], parent = null, translateY = false },
    direction = ""
  ) {
    const invalidDot = dots.length <= 1;
    Slider.#validateNode(slider);
    if (!invalidDot) Slider.#validateNode(dots);

    const isPrev = direction === "prev";
    const sliderId = Slider.#setSliderId(parent);
    const currentSliderEntry = Slider.#initSlider(sliderId);

    if (!currentSliderEntry.instance) Slider.#setInstance(sliderId);

    const { currentIndex } = Slider.#currentSlider.get(sliderId);
    const newCurrent = Slider.#direction(slider, currentIndex, !isPrev);

    Slider.handleUpdateSlide(slider, parent, translateY, newCurrent);
    if (!invalidDot) Slider.#handleUpdateDot(dots, slider, parent, newCurrent);
    Slider.#updateIndex(sliderId, newCurrent);
  }

  //   !=================================={Dot}
  static #generateIdDot(dots = []) {
    if (Array.from(dots).every((dot) => dot.dataset.control)) return;
    dots.forEach((dot, index) => dot.setAttribute("data-control", index));
  }

  static #handleUpdateDot(dots = [], slider = [], parent = null, index) {
    if (dots.length <= 1 || slider.length <= 1) return;
    const sliderId = Slider.#setSliderId(parent);
    const currentSliderEntry = Slider.#currentSlider.get(sliderId);
    if (!currentSliderEntry) return;
    Slider.#updateIndex(sliderId, index);
    //prettier-ignore
    dots.forEach((dot, indx) =>{
      dot.setAttribute('aria-current', index === indx ?'true': 'false')
      index === indx ? dot.classList.add('active') : dot.classList.remove('active')
      if(dot.hasAttribute('tabindex'))return
      dot.setAttribute('tabindex','0')
    });
  }

  /**
   * ?Initializes the dot indicators for the slider and sets up the click event
   * for navigating to the corresponding slide when a dot is clicked.
   *
   * @param {Object} obj - An object containing the slider elements and related data.
   * @param {HTMLElement[]} obj.slider - An array of slider elements.
   * @param {HTMLElement[]} obj.dots - An array of dot elements that represent the slides.
   * @param {HTMLElement} obj.parent - The parent element of the slider.
   * @param {Event} e - The event object triggered by the dot click.
   *
   * @throws {Error} If the slider or dots are not valid arrays.
   */
  static initDot({ slider = [], dots = [], parent = null }, e) {
    Slider.#validateNode(slider);
    Slider.#validateNode(dots);
    Slider.#generateIdDot(dots);

    const sliderId = Slider.#setSliderId(parent);
    const id = e.target.dataset.control;
    Slider.#initSlider(sliderId, +id);
    const index = +id;

    Slider.handleUpdateSlide(slider, parent, false, index);
    Slider.#handleUpdateDot(dots, slider, parent, index);
    Slider.#updateIndex(sliderId, index);
  }

  static #testNode(param = null) {
    return (
      !(param instanceof NodeList) ||
      (Array.isArray(param) && param.length === 0)
    );
  }

  static #testElement(param = null) {
    return param instanceof Element;
  }

  static #errorMessage(message = 0, value) {
    switch (message) {
      case 0:
        return `${value} slider is not an Array`;
      case 1:
        return `${value} dots is not an Array`;
      case 2:
        return `${value} param is not an element`;
      default:
        break;
    }
  }

  /**
   * !Validates that the provided slider and dots are both non-empty arrays.
   * @param {HTMLElement[]} slider - The array of slider elements.
   * @param {HTMLElement[]} dots - The array of dot elements.
   * @throws {Error} If any of the arrays are invalid.
   */
  static #validateNode(param = [], dot = true) {
    const [errSlider, errDots] = Slider.#message;
    const errorM = dot ? errDots : errSlider;

    // Allow empty arrays
    if (Slider.#testNode(param) && !Array.isArray(param)) {
      throw new Error(Slider.#errorMessage(errorM, param));
    }
  }

  static #validateElement(param = null) {
    const [, , errorElem] = Slider.#message;
    if (!Slider.#testElement(param))
      throw new Error(Slider.#errorMessage(errorElem, param));
  }

  static clearSlider() {
    Slider.#currentSlider.clear();
  }
}

export class SliderAuto {
  //!===============================================[Control]
  static #observer = null;
  static #intervalId = null;
  static #parent = null;
  static #defaultOption = () => ({ root: null, threshold: 0.1 });
  static #defaultInterval = 5000;
  static #DELAY = 300;
  static #Intersecting = false;
  static #pauseHandler = null;
  static #resumeHandler = null;

  //!===============================================[Debounced]

  /**
   * ?Creates a debounced version of a function that delays its execution.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The delay in milliseconds before the function is executed.
   * @return {Function} The debounced version of the function.
   */
  static debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  static #debouncedPause = SliderAuto.debounce(
    SliderAuto.pauseAutoSlide,
    SliderAuto.#DELAY
  );

  static #debouncedResume = SliderAuto.debounce(
    SliderAuto.resumeAutoSlide,
    SliderAuto.#DELAY
  );

  //!===============================================[Event Handlers]
  /**
   * ? Called when the observed element intersects the viewport (i.e., becomes visible).
   * Starts auto-sliding by setting an interval to call the `navigateSlider` function periodically.
   * Attaches debounced event listeners to pause or resume auto-sliding when mouse or touch events occur.
   *
   * @param {HTMLElement} element - The DOM element that triggered the intersection event.
   * @param {Function} navigateSlider - The function that controls the slider navigation.
   * @param {number} interval - The interval (in milliseconds) for auto-sliding.
   */
  static isIntersecting(element, navigateSlider, interval) {
    if (SliderAuto.#intervalId) clearInterval(SliderAuto.#intervalId);
    SliderAuto.#intervalId = setInterval(() => navigateSlider(), interval);
    SliderAuto.#Intersecting = true;
    //? Attach debounced handlers
    SliderAuto.#pauseHandler = SliderAuto.#debouncedPause.bind(this);
    SliderAuto.#resumeHandler = () =>
      SliderAuto.#debouncedResume(navigateSlider, interval);

    element.addEventListener("mouseenter", SliderAuto.#pauseHandler);
    element.addEventListener("mouseleave", SliderAuto.#resumeHandler);
    element.addEventListener("touchstart", SliderAuto.#pauseHandler);
    element.addEventListener("touchend", SliderAuto.#resumeHandler);
  }

  /**
   * ? Called when the observed element is no longer intersecting the viewport.
   * Clears the auto-slide interval and removes event listeners.
   *
   * @param {HTMLElement} element - The DOM element that triggered the no-intersection event.
   */
  static isNotIntersecting(element) {
    clearInterval(SliderAuto.#intervalId);
    SliderAuto.#intervalId = null;
    SliderAuto.#Intersecting = false;
    //? Remove debounced handlers
    element.removeEventListener("mouseenter", SliderAuto.#pauseHandler);
    element.removeEventListener("mouseleave", SliderAuto.#resumeHandler);
    element.removeEventListener("touchstart", SliderAuto.#pauseHandler);
    element.removeEventListener("touchend", SliderAuto.#resumeHandler);
  }

  //!===============================================[Observer Handling]
  /**
   * ? Called when the IntersectionObserver detects a change in the visibility of the observed element.
   * Based on whether the element is intersecting or not, it triggers the corresponding functions
   * to start or stop auto-sliding.
   *
   * @param {IntersectionObserverEntry[]} entries - The entries returned by the IntersectionObserver.
   * @param {Function} navigateSlider - The function that controls the slider navigation.
   * @param {number} interval - The interval (in milliseconds) for auto-sliding.
   */
  static handleObserver([entry], navigateSlider, interval) {
    const element = entry.target;
    if (entry.isIntersecting) {
      SliderAuto.isIntersecting(element, navigateSlider, interval);
    } else {
      SliderAuto.isNotIntersecting(element);
    }
  }

  //!===============================================[Pause & Resume]
  /**
   * ? Pauses the auto-sliding by clearing the interval.
   */
  static pauseAutoSlide() {
    clearInterval(SliderAuto.#intervalId);
    SliderAuto.#intervalId = null;
  }

  /**
   * ? Resumes the auto-sliding by setting a new interval if one is not already active.
   *
   * @param {Function} navigateSlider - The function that controls the slider navigation.
   * @param {number} interval - The interval (in milliseconds) for auto-sliding.
   */
  static resumeAutoSlide(navigateSlider, interval) {
    if (!SliderAuto.#intervalId) {
      SliderAuto.#intervalId = setInterval(() => navigateSlider(), interval);
    }
  }

  //!===============================================[Initialize & Cleanup]
  /**
   * ? Initializes the auto-slider by setting up the IntersectionObserver to observe the parent element.
   * When the parent element intersects the viewport, auto-sliding starts. It also ensures that the
   * `navigateSlider` function is valid and the parent is a DOM element.
   *
   * @param {Function} navigateSlider - The function that controls the slider navigation.
   * @param {HTMLElement} parent - The DOM element to observe.
   * @param {number} interval - The interval (in milliseconds) for auto-sliding.
   * @param {Object} option - The options for the IntersectionObserver.
   */
  static initializeAutoSlider(
    navigateSlider = () => {},
    parent,
    interval = SliderAuto.#defaultInterval,
    option = SliderAuto.#defaultOption()
  ) {
    if (typeof navigateSlider !== "function") {
      throw new Error("navigateSlider must be a function");
    }
    if (!(parent instanceof HTMLElement)) {
      throw new Error("parent must be a valid DOM element");
    }

    SliderAuto.#observer = new IntersectionObserver(
      (entries) => SliderAuto.handleObserver(entries, navigateSlider, interval),
      option
    );

    SliderAuto.#parent = parent;
    SliderAuto.#observer.observe(SliderAuto.#parent);
  }
  /**
   * ? Cleans up the resources by clearing the auto-slide interval, disconnecting the IntersectionObserver,
   * and removing event listeners. Also nullifies handlers and resets static variables.
   */
  static cleanup() {
    SliderAuto.pauseAutoSlide();
    if (SliderAuto.#observer) SliderAuto.#observer.disconnect();

    if (SliderAuto.#parent) {
      if (SliderAuto.#Intersecting)
        SliderAuto.isNotIntersecting(SliderAuto.#parent);
      SliderAuto.#parent = null;
    }

    SliderAuto.#pauseHandler = null;
    SliderAuto.#resumeHandler = null;
  }
}
