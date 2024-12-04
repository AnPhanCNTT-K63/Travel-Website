import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TopDealCard from "./TopDealCard";
import { getTours } from "../../../api/Services/TourAndPackageServices";

const TopDealSlider = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours(); // Gọi API để lấy dữ liệu tours
        setTours(data.tours);
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

  return (
    <Slider {...settings}>
      {tours.map((deal, index) => (
        <TopDealCard key={index} item={deal} />
      ))}
    </Slider>
  );
};

export default TopDealSlider;
