import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card2 from "./Card2";
import { getTours } from "../../../../api/Services/TourAndPackageServices";
import {
  getReviews,
  getTourDetail,
  getTourPackagesById,
  getTourStars,
} from "../../../../api/Services/TourAndPackageServices";
import { useParams, useNavigate } from "react-router-dom";

export default function ListCard2() {
  const [tours, setTours] = useState([]);
//slider
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
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [packages, setPackages] = useState([]);
  const [tourstars, setTourStars] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Get info tour
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourDetail(tourId);
        setTour(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Get info Tourpackage
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourPackagesById(tourId);
        setPackages(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Get info TourStar
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourStars(tourId);
        setTourStars(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  //Get info Review
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getReviews(tourId);
        setReviews(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await getTours(); // Gọi API không phân trang
        if (res && Array.isArray(res.tours)) {
          setTours(res.tours); // Cập nhật danh sách tours
        } else {
          console.error("Dữ liệu tours không hợp lệ");
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []); // Chỉ gọi một lần khi component mount

  return (
    <div style={{ width: "90%", margin: "18px auto" }}>
      <Slider {...settings}>
        {Array.isArray(tours) &&
          tours.map((tour) => {
            console.log("Card2 item:", tour); // Đặt console.log bên ngoài JSX
            return (
              <div key={tour.id}>
                <Card2
                  item={tour}
                  packages={packages}
                  rating={tourstars}
                  reviews={reviews}
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
  
}
