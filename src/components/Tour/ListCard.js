import TourCard from "./Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getTours } from "../../api/services";

export default function ListCard() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data); // tours = data
      } catch (err) {
        console.log(err);
      }
    };
    fetchTours();
  }, []);
  return (
    <Container>
      <Row>
        {tours.map((item) => {
          return (
            <Col className="col-3">
              <div style={{ margin: "10px" }}>
                <TourCard item={item} />
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
