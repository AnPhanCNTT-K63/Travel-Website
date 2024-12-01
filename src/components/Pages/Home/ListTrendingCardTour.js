import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getTours } from "../../../api/Services/TourAndPackageServices";
import { Link } from "react-router-dom";

export default function ListTrendingCardTour() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data.tours);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, []);

  // Chỉ lấy tối đa 6 phần tử
  //const displayedTours = tours.slice(0, 6);

  return (
    <Container>
      <Row>
        {tours.map((item, index) => (
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
