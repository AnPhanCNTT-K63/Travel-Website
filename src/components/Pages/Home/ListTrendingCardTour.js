import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ListTrendingCardTour() {
  return (
    <Container>
      <Row>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Tokyo" img="/tokyoCity.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="London" img="/londonCity.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Dubai" img="/dubaiCity.jpeg" />
        </Col>
      </Row>
      <Row>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Istanbul" img="/istabulCity.jpeg" />
        </Col>

        <Col class="col-4">
          {" "}
          <TrendingCard title="Paris" img="/parisCity.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Delhi" img="/delhiCity.jpeg" />
        </Col>
      </Row>
    </Container>
  );
}
