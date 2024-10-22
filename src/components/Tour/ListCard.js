import Card from "./Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ListCard() {
  return (
    <Container style={{ marginLeft: "200px", marginTop: "80px" }}>
      <Row style={{ marginBottom: "20px" }}>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/tokyoCity.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/hongkongCity.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/istabulCity.jpeg"
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/parisCity.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/dubaiCity.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/delhiCity.jpeg"
          />
        </Col>
      </Row>
      <Row>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/bangkokCity.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/deal4.jpeg"
          />
        </Col>
        <Col class="col-3">
          <Card
            title="Culturals Tours"
            content="5-Day Oahu Tour: Honolulu, Pearl Harbor, & Diamond Head"
            price="$ 634.00"
            source="/deal5.jpeg"
          />
        </Col>
      </Row>{" "}
    </Container>
  );
}
