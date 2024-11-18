import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Imagelist1() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g1.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g2.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g3.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g4.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g5.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g6.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g7.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g8.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g9.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
