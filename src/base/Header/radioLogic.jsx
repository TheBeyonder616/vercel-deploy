export default class Radio {
  static #API_TIMEOUT = 9000;

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

  static pauseAudio(videoElement) {
    if (videoElement.paused) return;
    videoElement.pause();
  }

  static async handleVideoPlay(
    API_URL,
    player,
    videoElement,
    loading,
    timeout,
    id
  ) {
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

      if (videoElement.src === API_URL) {
        await Radio.retryPlay(player, videoElement, timeout, id);
        return;
      }

      const res = await fetch(API_URL, {
        signal: AbortSignal.timeout(Radio.#API_TIMEOUT),
      });
      if (!res.ok) throw new Error("failed to load audio");
      videoElement.src = res.url;
      videoElement.load();

      videoElement.onloadeddata = async () => {
        loading = false;
        videoElement.play();
        Radio.toggleId(player, id, videoElement, false, false);
      };
    } catch (error) {
      loading = false;
      videoElement.removeAttribute("src");
      Radio.toggleId(player, id, videoElement, true);
      console.error("Error playing audio:", error);
    }
  }
}
