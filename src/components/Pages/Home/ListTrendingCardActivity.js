import TrendingCard from "./TrendingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ListTrendingCardActivity() {
  return (
    <Container>
      <Row>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Tokyo Activity" img="/a1.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="London Activity" img="/a2.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Dubai Activity" img="/a3.jpeg" />
        </Col>
      </Row>
      <Row>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Istanbul Activity" img="/a4.jpeg" />
        </Col>

        <Col class="col-4">
          {" "}
          <TrendingCard title="Paris Activity" img="/a5.jpeg" />
        </Col>
        <Col class="col-4">
          {" "}
          <TrendingCard title="Delhi Activity" img="/a6.jpeg" />
        </Col>
      </Row>
    </Container>
  );
}
