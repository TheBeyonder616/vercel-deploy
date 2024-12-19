export default class Config {
  static IconsId = Object.freeze({
    arrow: "arrow",
    mic: "mic",
    playPause: "play-pause",
    calendar: "calendar",
    chat: "chat",
    menu: "menu",
    closeMenu: "close-menu",
    time: "time",
    whatsapp: "whatsapp",
    play: "play",
    paused: "paused",
    error: "error",
    send: "send",
    spinner: "spinner",
    twitter: "twitter",
    instagram: "instagram",
    facebook: "facebook",
    mtn: "mtn-logo",
    kellogg: "kellogg-logo",
    huawei: "huawei-logo",
    logosChops: "lagos-chops-logo",
    brandLogo: "brand-logo",
    message: "message",
    glob: "glob",
  });

  static Path = Object.freeze({
    about: "/about-us",
    advert: "/advert-rate",
    contact: "/contact",
    donation: "/donation",
    podcast: "/podcast",
    schedule: "/schedule",
  });

  static MediaHandle = Object.freeze({
    whatsapp: "https://wa.me/2348111356509",
    twitter: "https://twitter.com/PidginRadio",
    instagram: "https://instagram.com/PidginRadio01",
    facebook: "https://facebook.com/PidginRadio",
  });

  static Radio = Object.freeze({
    url: "https://c26.radioboss.fm:8285/stream",
    delay: 900,
  });

  static PAYMENT = Object.freeze({
    script: "https://sdk.monnify.com/plugin/monnify.js",
    apiKey: "MK_TEST_X4C1GZ1K76",
    contractCode: "3278343564",
    delay: 900,
  });

  static PAYMENT_ELEMENT = Object.freeze({
    script: `script[data-identifier="mony-script"]`,
    style: "style#MonnifyStyles",
    element: "div#MonnifyPreLoader",
  });

  static SliderImagesId = Object.freeze({
    header: "header",
  });

  static MAILTO(name = "", email = "", message = "") {
    return `mailto:pidginradio1@gmail.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  }
  static CARD_RESIZE_DELAY = 500;
  static VIEWS_DELAY = 1000 * (60 * 0.5);
  static VIEWS_ANIMATION_DURATION = 1000 * 5;
  static TIMEOUT_DURATION = 1000 * 2;
  static INPUT_DELAY = 500;
  static AUTO_SLIDE_DELAY = 1000 * 6.5;
  static SCROLL_CARD_DELAY = 200;

  //![MUTATED]
  static SCHEDULE = " ";

  static DAYS_OF_THE_WEEK = Object.freeze([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  static ALT_SLIDER_1 = Object.freeze([
    "A gif of Dj Neptune a Nigerian artist on pidgin radio studio",
    "A gif of Skales a Nigerian artist on pidgin radio studio",
    "A gif of Oladips a Nigerian artist on pidgin radio studio",
  ]);

  static ALT_SLIDER_2 = Object.freeze([
    "A gif of OjBrain a Nigerian artist",
    "A gif of Dj Bran upcoming event on december 1st",
    "A img of December giveaway",
  ]);

  static formatViews(views = 0) {
    const million = 1_000_000;
    const thousand = 1_000;

    if (views >= million) return `${(views / million).toFixed(1)}m`;
    if (views >= thousand) return `${(views / thousand).toFixed(1)}k`;
    return views.toString();
  }
}
