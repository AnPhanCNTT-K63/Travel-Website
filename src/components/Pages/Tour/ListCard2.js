import Card from "./Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ListCard2() {
  return (
    <Container style={{ marginLeft: "200px", marginTop: "80px" }}>
      <Row style={{ marginBottom: "20px" }}>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/des1.jpg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/des2.jpg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/des3.jpg"
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/des4.jpg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/des5.jpg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/des6.jpeg"
          />
        </Col>
      </Row>
      <Row>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/deal1.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/deal2.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/deal3.jpeg"
          />
        </Col>
      </Row>{" "}
    </Container>
  );
}
