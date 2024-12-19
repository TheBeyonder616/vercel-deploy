//?============================================= [Schedule]
import monday4 from "../assets/Schedule/monday-4.jpg";
import monday7 from "../assets/Schedule/monday-7.jpg";
import monday8 from "../assets/Schedule/monday-8.jpg";
import monday6 from "../assets/Schedule/monday-6.jpg";
import monday10 from "../assets/Schedule/monday-10.jpg";
import monday11 from "../assets/Schedule/monday-11.jpg";
import monday12 from "../assets/Schedule/monday-12.jpg";
import monday9 from "../assets/Schedule/monday-9.jpg";
import monday2 from "../assets/Schedule/monday-2.jpg";
import monday3 from "../assets/Schedule/monday-3.jpg";
import monday5 from "../assets/Schedule/monday-5.jpg";
import corrected from "../assets/Schedule/corrected.png";
import img13 from "../assets/Schedule/img-13.png";
import img14 from "../assets/Schedule/img-14.png";
import img15 from "../assets/Schedule/img-15.png";
import img16 from "../assets/Schedule/img-16.png";
import img17 from "../assets/Schedule/img-17.png";
import weekendGbedu from "../assets/Schedule/weekendGbedu.png";
import weekendGbedu1 from "../assets/Schedule/weekednGbedu1.png";
import weekendGbedu2 from "../assets/Schedule/weekendGbedu2.png";
import discoverNaija from "../assets/Schedule/discoverNaija.png";
import hotPlayWeekend from "../assets/Schedule/hotPlayWeekend.png";
import weekendTearRubber from "../assets/Schedule/weekendTearRubber.png";
import weekendTearRubber2 from "../assets/Schedule/weekendTearRubber2.png";
import sunday5 from "../assets/Schedule/sunday5.png";
import img18 from "../assets/Schedule/img-18.png";
//?==============================================[Card Schedule]
import scheduleMonday from "../assets/Card_Schedule/scheduleMonday.png";
import scheduleTuesday from "../assets/Card_Schedule/scheduleTuesday.png";
import scheduleWednesday from "../assets/Card_Schedule/scheduleWednesday.png";
import scheduleThursday from "../assets/Card_Schedule/scheduleThursday.png";
import scheduleFriday from "../assets/Card_Schedule/scheduleFriday.png";
import scheduleSaturday from "../assets/Card_Schedule/scheduleSaturday.png";
import scheduleSunday from "../assets/Card_Schedule/scheduleSunday.png";
//?==============================================[Card Celebrity]
import celebrityMagxixx from "../assets/Card_Celebrity/magxixx_com.jpg";
import celebrityMi from "../assets/Card_Celebrity/mi_com.jpg";
import celebrityMizzkiss from "../assets/Card_Celebrity/mizzkiss_com.jpg";
import celebritySkales from "../assets/Card_Celebrity/skales_com.jpg";
import celebrityVictor from "../assets/Card_Celebrity/victhor_com.jpg";
//?==============================================[Slider]
import djNeptune from "../assets/Slider/IMG_3_MP4.mp4";
import oladips from "../assets/Slider/IMG_1_MP4.mp4";
import skales from "../assets/Slider/IMG_2_MP4.mp4";
import ojBrain from "../assets/Slider/IMG_5_MP4.mp4";
import djBran from "../assets/Slider/IMG_4_MP4.mp4";
import giveAway from "../assets/Slider/give-away.png";
//?==============================================[Background-images]
import scheduleMobile from "../assets/BackgroundImage/sh-mobile.jpg";
import scheduleTab from "../assets/BackgroundImage/sh-tab.jpg";
import scheduleDesktop from "../assets/BackgroundImage/sh-desktop.jpg";

import podcastMobile from "../assets/BackgroundImage/guy-bg-mobile.jpg";
import podcastTab from "../assets/BackgroundImage/guy-bg-tab.jpg";
import podcastDesktop from "../assets/BackgroundImage/guy-bg-desktop.jpg";

import donationMobile from "../assets/BackgroundImage/donation-mobllie.jpg";
import donationTab from "../assets/BackgroundImage/donatiion-tab.jpg";
import donationDesktop from "../assets/BackgroundImage/donation-desktop.jpg";

import contactMobile from "../assets/BackgroundImage/contact-mobile.jpg";
import contactTab from "../assets/BackgroundImage/contact-tab.jpg";
import contactDesktop from "../assets/BackgroundImage/contact-desk.jpg";

import advertMobile from "../assets/BackgroundImage/lady-yellow-bg-mobile.jpg";
import advertTab from "../assets/BackgroundImage/lady-yellow-bg-tab.jpg";
import advertDesktop from "../assets/BackgroundImage/lady-yellow-bg-desktop.jpg";

import aboutMobile from "../assets/BackgroundImage/lady-bg-mobile.jpg";
import aboutTab from "../assets/BackgroundImage/lady-bg-tab.jpg";
import aboutDesktop from "../assets/BackgroundImage/lady-bg-desktop.jpg";

//!==========================================[PDF]
import Rate from "../assets/AdvertRate2025.pdf";
//prettier-ignore
const ASSETS = Object.freeze({
  monday4,
  monday7,
  monday8,
  monday6,
  monday10,
  monday11,
  monday12,
  monday9,
  monday2,
  monday3,
  monday5,
  corrected,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  weekendGbedu,
  weekendGbedu1,
  weekendGbedu2,
  discoverNaija,
  hotPlayWeekend,
  weekendTearRubber,
  weekendTearRubber2,
  sunday5,
  //!Card_Schedule
  scheduleMonday, scheduleTuesday, scheduleWednesday, scheduleThursday, scheduleFriday, scheduleSaturday, scheduleSunday,
  //!Card_Celebrity
   celebrityMagxixx, celebrityMi, celebrityMizzkiss, celebritySkales, celebrityVictor,
   //!Slider
  djNeptune, oladips, skales, ojBrain, djBran, giveAway,
//!Schedule Page
scheduleMobile, scheduleTab, scheduleDesktop, 
//!about Page
aboutMobile, aboutTab, aboutDesktop, 
//!Podcast Page
podcastMobile, podcastTab, podcastDesktop, 
//!Advert Page
advertMobile, advertTab, advertDesktop, 
//!Donation Page
donationMobile, donationTab, donationDesktop, 
//!ContactPage
contactMobile, contactTab, contactDesktop, 
});

// Creating schedules
const defaultDay = {
  "Early morning gospel 6am - 8am": ASSETS.monday4,
  "Morning waka 8am - 12pm": ASSETS.monday7,
  "Area gbedu 12pm - 12:30pm": ASSETS.monday8,
  "Naija fresh talent 12:30pm - 1pm": ASSETS.monday6,
  "Kampe afternoon 1pm - 3pm": ASSETS.monday10,
};

const defaultNight = {
  "midnight madness 12am - 4am": ASSETS.monday3,
  "Wake up naija 4am - 6am": ASSETS.monday5,
};

const defaultNightWeekend = {
  "Sally Beta/Dj mix 9pm - 4am": ASSETS.img17,
  "Wake up naija 4am - 6am": ASSETS.monday5,
};

const monday = {
  ...defaultDay,
  "Tear rubber 3pm - 4pm": ASSETS.monday11,
  "Sempe evening 4pm - 5pm": ASSETS.monday12,
  "Discover naija 6pm - 8pm": ASSETS.corrected,
  "naija Fresh Talent 5pm - 6pm": ASSETS.monday9,
  "Discover naija 6pm - 12am": ASSETS.monday2,
  ...defaultNight,
};

const tuesday = monday;
const wednesday = monday;

const thursday = {
  ...defaultDay,
  "Gbedu from way back 3pm - 4pm": ASSETS.img15,
  "Sempe evening 4pm -5pm": ASSETS.monday12,
  "Discover Naija": ASSETS.corrected,
  "Gbedu from way back 8pm - 9pm": ASSETS.img13,
  "Discover Naija 6pm -12 am": ASSETS.monday2,
  ...defaultNight,
};

const friday = {
  ...defaultDay,
  "Tear rubber 3pm - 4pm": ASSETS.monday11,
  "sempe Evening 4pm - 5pm": ASSETS.monday12,
  "Discover naija 6pm - 8pm": ASSETS.corrected,
  "Hype Time 8pm - 9pm": ASSETS.img14,
  ...defaultNightWeekend,
};

const saturday = {
  "Early morning gospel 6am - 8am": ASSETS.monday4,
  "Weekend gbedu 8am - 12pm": ASSETS.weekendGbedu,
  "Wedding gbedu 12pm - 12:30pm": ASSETS.weekendGbedu1,
  "Naija fresh talent 12:30pm - 1pm": ASSETS.monday6,
  "Weekend gbedu 1pm - 2pm": ASSETS.weekendGbedu2,
  "Weekend tear rubber 2pm -3pm": ASSETS.weekendTearRubber,
  "Hot play weekend 3pm - 5pm": ASSETS.hotPlayWeekend,
  "Discover naija 6pm -7pm": ASSETS.discoverNaija,
  "Weekend tear rubber 7pm - 8pm": ASSETS.weekendTearRubber2,
  "Hype Time 8pm - 9pm": ASSETS.img14,
  ...defaultNightWeekend,
};

const sunday = {
  "Early morning gospel 6am - 8am": ASSETS.monday4,
  "Weekend gbedu 8am - 12pm": ASSETS.weekendGbedu,
  "Gospel praise 12pm - 12:30pm": ASSETS.sunday5,
  "Naija fresh talent 12:30pm - 1pm": ASSETS.monday6,
  "Hot play weekend 1pm - 5pm": ASSETS.img18,
  "Naija Fresh Talent 5pm - 6pm": ASSETS.monday9,
  "Discover naija 6pm -7pm": ASSETS.discoverNaija,
  "Weekend tear rubber 7pm - 8pm": ASSETS.weekendTearRubber2,
  "Hype Time 8pm - 9pm": ASSETS.img14,
  ...defaultNightWeekend,
};

//!===============================[Cards]
export const schedule = Object.freeze({
  "Schedule Monday": ASSETS.scheduleMonday,
  "Schedule Tuesday": ASSETS.scheduleTuesday,
  "Schedule Wednesday": ASSETS.scheduleWednesday,
  "Schedule Thursday": ASSETS.scheduleThursday,
  "Schedule Friday": ASSETS.scheduleFriday,
  "Schedule Saturday": ASSETS.scheduleSaturday,
  "Schedule Sunday": ASSETS.scheduleSunday,
});

export const celeb = Object.freeze({
  "Celeb magexixx on pidgin radio": ASSETS.celebrityMagxixx,
  "Celeb mi on pidgin radio": ASSETS.celebrityMi,
  "Celeb mizzkiss on pidgin radio": ASSETS.celebrityMizzkiss,
  "Celeb skales on pidgin radio": ASSETS.celebritySkales,
  "Celeb victor on pidgin radio": ASSETS.celebrityVictor,
});

//!===============================[Slider]
export const sliderHeader = Object.freeze([
  ASSETS.djNeptune,
  ASSETS.skales,
  ASSETS.oladips,
]);
export const sliderFooter = Object.freeze([
  ASSETS.ojBrain,
  ASSETS.djBran,
  ASSETS.giveAway,
]);

//!================================[Background Images]
export const backgroundSchedule = Object.freeze([
  ASSETS.scheduleMobile,
  ASSETS.scheduleTab,
  ASSETS.scheduleDesktop,
]);

export const backgroundAbout = Object.freeze([
  ASSETS.aboutMobile,
  ASSETS.aboutTab,
  ASSETS.aboutDesktop,
]);

export const backgroundAdvert = Object.freeze([
  ASSETS.advertMobile,
  ASSETS.advertTab,
  ASSETS.advertDesktop,
]);

export const backgroundPodcast = Object.freeze([
  ASSETS.podcastMobile,
  ASSETS.podcastTab,
  ASSETS.podcastDesktop,
]);

export const backgroundContact = Object.freeze([
  ASSETS.contactMobile,
  ASSETS.contactTab,
  ASSETS.contactDesktop,
]);

export const backgroundDonation = Object.freeze([
  ASSETS.donationMobile,
  ASSETS.donationTab,
  ASSETS.donationDesktop,
]);

const assets = Object.freeze({
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
});

export const AdvertRate = Rate;
export default assets;
