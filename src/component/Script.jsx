export default class Script {
  /**
   * ?Toggles the menu display by animating its elements.
   * @param {boolean} open - Determines whether to open (true) or close (false) the menu.
   * @param {Array} elements - An array of elements (e.g., overlay and list) that will have their opacity changed.
   * @param {HTMLElement} listContainer - The container that holds the menu items.
   * @param {HTMLElement} menu - The menu element itself.
   */
  static #menuType(open, elements, listContainer, menu) {
    if (open === true) {
      Array.from(elements).forEach((element) => (element.style.opacity = "0"));
      menu.classList.remove("hide");
      setTimeout(() => {
        listContainer.classList.add("active");
        //prettier-ignore
        Array.from(elements).forEach((element) => (element.style.opacity = "1"));
      }, 500);
    } else {
      listContainer.classList.remove("active");
      //prettier-ignore
      setTimeout(() => Array.from(elements).forEach((element) => (element.style.opacity = "0")), 300);
      setTimeout(() => menu.classList.add("hide"), 500);
    }
  }

  /**
   * ?Animates the opening/closing of the menu by calling menuType with the appropriate arguments.
   * @param {boolean} open - Whether to open (true) or close (false) the menu. Defaults to true (open).
   */
  static menuAnimation(open = true) {
    const menu = document.querySelector(`[data-display="open-menu"]`);
    const [overlay, listContainer] = menu.childNodes;
    const list = listContainer.childNodes[0];
    const elements = [overlay, list];
    Script.#menuType(open, elements, listContainer, menu);
  }

  /**
   * ?Creates a debounced version of a function that delays its execution.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The delay in milliseconds before the function is executed.
   * @return {Function} The debounced version of the function.
   */
  static debounce(func, delay) {
    let timeout;
    return (...argument) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...argument), delay);
    };
  }

  /**
   * !Returns a Promise that resolves after a delay, with optional recursive retries based on a condition.
   * @param {number} seconds - The delay in seconds before the promise resolves.
   * @param {boolean} condition - If true, resolves the promise, otherwise retries.
   * @param {number} retries - Optional parameter to limit the number of retries (default is 3).
   * @return {Promise} A promise that resolves after the specified delay or retries.
   */
  static promise(seconds = 0.5, condition = true, retries = 3) {
    return new Promise((res, reject) => {
      const attempt = (remainingRetries) => {
        setTimeout(() => {
          if (condition) res();
          else if (remainingRetries > 0) attempt(remainingRetries - 1);
          else reject("Maximum retries exceeded");
        }, seconds * 1000);
      };
      attempt(retries);
    });
  }
}
