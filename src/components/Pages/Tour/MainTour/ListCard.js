import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import TourCard from "./../MainTour/Card";
import { getTours } from "../../../../api/Services/TourAndPackageServices";

export default function ListCard({ allTours, cardsPerPage }) {
  const [page, setPage] = useState(1);

  // Tính toán dữ liệu cho trang hiện tại
  const currentPageData = allTours.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await getTours();
      setTours(res);
      console.log(res);
    };
    fetchTours();
  }, []);

  // Xử lý khi đổi trang
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Row>
        {tours.map((item, index) => (
          <Col
            className="col-4"
            key={item.Id}
            style={{
              marginTop: index < 3 ? "50px" : "10px", // Thêm marginTop 50px cho 3 card đầu tiên
            }}
          >
            <div style={{ margin: "10px" }}>
              <Link to={`/detail/${item.Id}`}>
                <TourCard item={item} />
              </Link>
            </div>
          </Col>
        ))}
      </Row>
      <div style={{ marginLeft: "400px", marginTop: "80px" }}>
        <Pagination
          count={Math.ceil(allTours.length / cardsPerPage)} // Tổng số trang
          page={page} // Trang hiện tại
          onChange={handlePageChange} // Xử lý đổi trang
          color="secondary"
        />
      </div>
    </Container>
  );
}
