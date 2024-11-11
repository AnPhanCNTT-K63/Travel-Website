import * as React from "react";
import Slider from "react-slick";
import TopDealCard from "./TopDealCard";

const deals = [
  {
    title: "One World Hotel",
    content:
      "Featuring direct access to 1 Utama Shopping Centre and Bandar Utama MRT station, One World Hotel offers elegant accommodation in Petaling Jaya.",
    source: "deal1.jpeg",
  },
  {
    title: "Avante Hotel",
    content:
      "Set in Petaling Jaya and with Federal Territory Mosque reachable within 8.8 km, Avante Hotel offers concierge services, non-smoking rooms, an outdoor swimming pool, free WiFi throughout the property...",
    source: "deal2.jpeg",
  },
  {
    title: "Hilton Petaling Jaya",
    content:
      "Hilton Petaling Jaya offers stylish accommodation located 650 metres from Taman Jaya LRT station. The property also houses 4 restaurants and a bar.",
    source: "deal3.jpeg",
  },
  {
    title: "Sheraton Petaling Jaya Hotel",
    content:
      "Situated in Petaling Jaya, Sheraton Petaling Jaya Hotel offers accommodations in Selangor. It features an infinity pool and guests can enjoy meals from 4 of the in-house dining options.",
    source: "deal4.jpeg",
  },
  {
    title: "Eastin Hotel Kuala Lumpur",
    content:
      "A 15-minute drive from Kuala Lumpur, Eastin Hotel Kuala Lumpur features 5 dining options and an outdoor pool. Offering a spa and a fitness centre, it provides rooms with free Wi-Fi access.",
    source: "deal5.jpeg",
  },
];

const TopDealSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {deals.map((deal, index) => (
        <TopDealCard
          key={index}
          title={deal.title}
          content={deal.content}
          source={deal.source}
        />
      ))}
    </Slider>
  );
};

export default TopDealSlider;
