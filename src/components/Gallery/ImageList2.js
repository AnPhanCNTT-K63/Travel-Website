import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Imagelist2() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g10.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g11.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g12.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g13.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g14.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g15.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g16.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g17.jpeg" rounded className="image" />
            </div>
          </Col>
          <Col className="col-4">
            <div className="image-container">
              <Image src="/g18.jpeg" rounded className="image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
