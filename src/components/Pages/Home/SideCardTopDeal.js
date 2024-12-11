import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TopDealCard from "./TopDealCard";
import {
  getTourPackages,
  getTours,
} from "../../../api/Services/TourAndPackageServices";

const TopDealSlider = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTourPackages();
        setTours(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTours();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const toursToShow = tours.slice(0, 9);

  return (
    <Slider {...settings}>
      {toursToShow.map((deal, index) => (
        <TopDealCard key={index} item={deal} />
      ))}
    </Slider>
  );
};

export default TopDealSlider;
