export default class Radio {
  static #API_TIMEOUT = 9000;

  /**
   * ?Updates the player icon based on the current state (error, loading, play, or paused).
   *
   * @param {HTMLElement} playerElement - The player element containing the SVG icon.
   * @param {Object} id - An object with state-specific icon IDs.
   * @param {HTMLMediaElement} videoElement - The video/audio element to check playback state.
   * @param {boolean} [error=false] - Indicates if an error occurred.
   * @param {boolean} [loading=false] - Indicates if the player is loading.
   * @return {void}
   */
  static toggleId(
    playerElement,
    id,
    videoElement,
    error = false,
    loading = false
  ) {
    const player = playerElement.childNodes[0];
    const [svg] = player.childNodes;
    const [use] = svg.childNodes;
    const href = use.getAttribute("href");
    const newHref = href.split("#")[0] + "#";
    const setId = (id) => use.setAttribute("href", id);
    if (error) {
      player.classList.remove("spin--svg");
      setId(newHref.trim() + id.error);
      return;
    }

    if (loading) {
      setId(newHref.trim() + id.spinner);
      player.classList.add("spin--svg");
      return;
    }

    player.classList.remove("spin--svg");
    videoElement.paused
      ? setId(newHref.trim() + id.play)
      : setId(newHref.trim() + id.paused);
  }

  /**
   * ?Pauses the video/audio if it is currently playing.
   *
   * @param {HTMLMediaElement} videoElement - The video/audio element to pause.
   * @return {void}
   */
  static pauseAudio(videoElement) {
    if (videoElement.paused) return;
    videoElement.pause();
  }

  /**
   * ?Handles playing or loading the video/audio from an API URL, while updating the player state.
   *
   * @param {string} API_URL - The URL of the video/audio to play.
   * @param {HTMLElement} player - The player element containing the SVG icon.
   * @param {HTMLMediaElement} videoElement - The video/audio element to play or load.
   * @param {boolean} loading - Indicates if the player is currently loading.
   * @param {Object} id - An object with state-specific icon IDs.
   * @return {Promise<void>}
   */
  static async handleVideoPlay(API_URL, player, videoElement, loading, id) {
    try {
      if (!videoElement.paused) {
        videoElement.removeAttribute("src");
        Radio.pauseAudio(videoElement);
        Radio.toggleId(player, id, videoElement);
        return;
      }

      if (loading) return;
      loading = true;
      if (loading) {
        Radio.toggleId(player, id, videoElement, false, true);
      }

      const res = await fetch(API_URL, {
        signal: AbortSignal.timeout(Radio.#API_TIMEOUT),
      });
      if (!res.ok) throw new Error("failed to load audio");
      videoElement.src = res.url;
      videoElement.load();

      videoElement.onloadeddata = async () => {
        videoElement.play();
        Radio.toggleId(player, id, videoElement, false, false);
        loading = false;
      };
    } catch (error) {
      loading = false;
      videoElement.removeAttribute("src");
      Radio.toggleId(player, id, videoElement, true);
      console.error("Error playing audio:", error);
    }
  }
}
