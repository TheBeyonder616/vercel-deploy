export default class Radio {
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

  static timeout(duration) {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Loading timed out")), duration)
    );
  }

  static async tryPlay(videoElement, retries) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await videoElement.play();
        return;
      } catch (err) {
        console.warn(`Retry ${attempt + 1}: Failed to play`, err);
      }
    }
    throw new Error("Failed to play after retries");
  }

  static async retryPlay(player, videoElement, timeout, id, retries = 1) {
    try {
      await Promise.race([
        Radio.tryPlay(videoElement, retries),
        Radio.timeout(timeout),
      ]);
    } catch (err) {
      console.error(err);
      videoElement.pause();
      Radio.toggleId(player, id, videoElement, true);
      throw err;
    }
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

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("failed to load audio");
      videoElement.src = res.url;
      videoElement.load();

      videoElement.onloadeddata = async () => {
        await Radio.retryPlay(player, videoElement, timeout, id);

        loading = false;
        Radio.toggleId(player, id, videoElement, false);
      };
    } catch (error) {
      loading = false;
      videoElement.removeAttribute("src");
      Radio.toggleId(player, id, videoElement, true);
      console.error("Error playing audio:", error);
    }
  }
}
