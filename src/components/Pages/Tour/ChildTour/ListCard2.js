import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card2 from "./Card2";

export default function ListCard2() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const allTours = [
    {
      id: 1,
      title: "Mountain Adventure",
      description: "Explore the majestic mountains.",
      image: "america.jpg",
      price: "120.99",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Beach Paradise",
      description: "Relax on sunny beaches.",
      image: "bangkokCity.jpeg",
      price: "150.00",
      rating: 5,
    },
    {
      id: 3,
      title: "City Lights",
      description: "Experience vibrant city life.",
      image: "delhiCity.jpeg",
      price: "90.00",
      rating: 4,
    },
    {
      id: 4,
      title: "Desert Safari",
      description: "A thrilling experience in the desert.",
      image: "dubaiCity.jpeg",
      price: "200.00",
      rating: 4.8,
    },
    {
      id: 5,
      title: "Forest Retreat",
      description: "Connect with nature.",
      image: "hongkongCity.jpeg",
      price: "99.99",
      rating: 4.2,
    },
  ];

  return (
    <div style={{ width: "90%", margin: "18px auto" }}>
      <Slider {...settings}>
        {allTours.map((tour) => (
          <div key={tour.id}>
            <Card2 item={tour} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
