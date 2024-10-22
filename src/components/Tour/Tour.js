import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slide2 from "../Slideshow/Slide2";
import FilterBox from "./FilterBox";
import Footer from "../Footer/Footer";
import ListCard from "./ListCard";
import TourSection from "./TourSection";

const Tour = () => {
  return (
    <div>
      <Slide2 />
      <Container>
        <Row>
          <Col className="col-3">
            <FilterBox />
          </Col>
          <Col className="col-9">
            <TourSection />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tour;
