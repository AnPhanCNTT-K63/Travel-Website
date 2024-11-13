import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getTours } from "../../../api/services";
import { Link } from "react-router-dom";

export default function ListTrendingCardTour() {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data);
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
            <Col className="col-4">
              <div style={{ margin: "10px" }}>
                <Link to={`/detail/${item.Id}`}>
                  <TrendingCard item={item} />
                </Link>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
    // <Container>
    //   <Row>
    //     <Col class="col-4">
    //       {" "}
    //       <TrendingCard title="Tokyo" img="/tokyoCity.jpeg" price="1000000" starRating="5" ratings="96" available={true} />
    //     </Col>
    //     <Col class="col-4">
    //       {" "}
    //       <TrendingCard title="London" img="/londonCity.jpeg" price="2000000" starRating="4.999999999" ratings="69" available={true} />
    //     </Col>
    //     <Col class="col-4">
    //       {" "}
    //       <TrendingCard title="Dubai" img="/dubaiCity.jpeg" star="0.1" ratings="1" />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col class="col-4">
    //       {" "}
    //       <TrendingCard title="Istanbul" img="/istabulCity.jpeg" />
    //     </Col>

    //     <Col class="col-4">
    //       {" "}
    //       <TrendingCard title="Paris" img="/parisCity.jpeg" />
    //     </Col>
    //     <Col class="col-4">
    //       {" "}
    //       <TrendingCard title="Delhi" img="/delhiCity.jpeg" />
    //     </Col>
    //   </Row>
    // </Container>
  );
}
