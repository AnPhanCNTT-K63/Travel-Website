import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slide2 from "../../../Slideshow/Slide2";
import FilterBox from "./FilterBox";
import TourSection from "./TourSection";
import { useState } from "react";

const Tour = () => {
  const [searchResults, setSearchResults] = useState([]); // Khởi tạo state cho kết quả tìm kiếm
  return (
    <div>
      <Slide2 />
      <Container>
        <Row>
          <Col className="col-3">
            <FilterBox setSearchResults={setSearchResults} /> {/* Truyền hàm */}
          </Col>
          <Col className="col-9">
            <TourSection searchResults={searchResults} /> {/* Truyền dữ liệu kết quả */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tour;
