import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Imagelist3() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g19.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g20.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g21.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g22.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g23.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g24.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g25.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g26.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g27.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
