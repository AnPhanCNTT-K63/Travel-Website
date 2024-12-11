import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import {
  getTourPackages,
  getTours,
} from "../../../api/Services/TourAndPackageServices";
import { Link } from "react-router-dom";


export default function ListTrendingCardTour() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours(1, 9, null, "");
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

  // Hiển thị chỉ 9 tour đầu tiên
  const toursToShow = tours.slice(0, 9);

  return (
    <Container>
      <Row>
        {toursToShow.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Link to={`/detail/${item.Id}`}>
              <TrendingCard item={item} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
