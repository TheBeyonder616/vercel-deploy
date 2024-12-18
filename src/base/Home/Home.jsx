import {
  schedule,
  sliderFooter,
  sliderHeader,
  celeb,
} from "../../component/Assets";
import Config from "../../component/Config";
import HomeMainSlider from "./HomeMainSlider";
import BrandDeals from "./BrandDeals";
import CardSlider from "./CardSlider";
import useLazyLoadImages from "../../hooks/useLazyLoadImages";

const Home = () => {
  const cardSchedule = Object.entries(schedule);
  const cardCeleb = Object.entries(celeb);
  useLazyLoadImages();

  return (
    <main className="main main--home">
      <h1 className="visually-hidden">
        Welcome to Pidgin Radio - Your entertainment hub
      </h1>
      <HomeMainSlider
        srcSet={sliderHeader}
        altSet={Config.ALT_SLIDER_1}
        autoChange={true}
      />
      <BrandDeals />
      <article className="home-body">
        <section className="home__card">
          <h2 className="heading-secondary heading--card">Gallery</h2>
          <CardSlider srcSet={cardCeleb} altSet={Config.ALT_CARD_2} />
        </section>
        <HomeMainSlider srcSet={sliderFooter} altSet={Config.ALT_SLIDER_2} />
        <section className="home__card">
          <h2 className="heading-secondary heading--card">Schedule</h2>
          <CardSlider
            srcSet={cardSchedule}
            altSet={Config.ALT_CARD_1}
            schedule={true}
          />
        </section>
      </article>
    </main>
  );
};

export default Home;
