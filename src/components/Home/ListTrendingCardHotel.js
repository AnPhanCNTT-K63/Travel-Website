import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ListTrendingCardHotel() {
  return (
    <Container>
      <Row>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Tokyo Hotel" img="/h1.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="London Hotel" img="/h2.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Dubai Hotel" img="/h3.jpeg" />
        </Col>
      </Row>
      <Row>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Istanbul Hotel" img="/h4.jpeg" />
        </Col>

        <Col class="col-4">
          {" "}
          <TrendingCard title="Paris Hotel" img="/h5.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Delhi Hotel" img="/h6.jpeg" />
        </Col>
      </Row>
    </Container>
  );
}
