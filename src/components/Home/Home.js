import React from "react";
import TopDestination from "./TopDestination";
import CitiesSlider from "../Slideshow/CitiesSlider";
import slides from "../Slideshow/CitiesSlider-infoList";
import TrendingSection from "./TrendingSection";
import styles from "../../styles/styles.module.css";
import TipSection from "./TipSection";
import WhyChooseSection from "./WhyChooseSection";
import TopDeal from "./TopDealSection";
import ParallaxSection from "./ParallaxSection";

const Home = () => {
  return (
    <div>
      <div style={{}}>
        <CitiesSlider slides={slides} />
      </div>
      <TopDestination />
      <ParallaxSection />
      <TrendingSection />
      <TipSection />
      <WhyChooseSection />
      <TopDeal />
    </div>
  );
};

export default Home;
