import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import TourCard from "./../MainTour/Card";  // Đảm bảo rằng đường dẫn này chính xác
import { getTours } from "../../../../api/services";  // Lấy dữ liệu từ API
import { Box } from "@mui/material"; // Import Box từ Material-UI

export default function ListCard() {
  const [tours, setTours] = useState([]);  // Đảm bảo tours là mảng
  const [totalTours, setTotalTours] = useState(0);  // Số lượng tour tổng
  const [totalPages, setTotalPages] = useState(0);  // Tổng số trang
  const [page, setPage] = useState(1);  // Trang hiện tại
  const cardsPerPage = 9;  // Số lượng tour trên mỗi trang

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await getTours(page, cardsPerPage);
        if (Array.isArray(res.tours)) {
          setTours(res.tours);  // Cập nhật tours nếu res.tours là mảng
          setTotalTours(res.totalTours);  // Tổng số tour
          setTotalPages(res.totalPages);  // Tổng số trang
        } else {
          console.error("Dữ liệu tours không phải là mảng");
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, [page]);  // Mỗi khi trang thay đổi, sẽ gọi lại API

  const handlePageChange = (event, value) => {
    setPage(value);  // Cập nhật trang khi người dùng thay đổi
  };

  return (
    <Container>
      <Row>
        {Array.isArray(tours) && tours.length > 0 ? (
          tours.map((item) => (
            <Col className="col-4" key={item.Id}>
              <div style={{ margin: "40px 0 50px 0" }}>
                <Link to={`/detail/${item.Id}`}>
                  <TourCard item={item} />
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <p>No tours available.</p>  // Thông báo khi không có tour
        )}
      </Row>
      {/* Box để căn giữa phần Pagination */}
      <Box
        sx={{
          display: "flex",  // Dùng flexbox
          justifyContent: "center",  // Căn giữa theo chiều ngang
          marginTop: "20px",
        }}
      >
        <Pagination
          count={totalPages}  // Tổng số trang
          page={page}  // Trang hiện tại
          onChange={handlePageChange}  // Thay đổi trang
          color="secondary"
        />
      </Box>
    </Container>
  );
}
