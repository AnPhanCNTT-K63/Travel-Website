import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import ListCard from "./ListCard";
import "../../../../styles/TourSection.module.css";

export default function TourSection() {
  const [tours, setTours] = useState([]); // State để lưu danh sách tour
  const [page, setPage] = useState(1); // Trang hiện tại
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  const cardsPerPage = 9; // Số card mỗi trang

  // Lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    axios
      .get("/api/tours") // Địa chỉ API để lấy dữ liệu tour
      .then((response) => {
        setTours(response.data); // Lưu dữ liệu trả về vào state
        setLoading(false); // Đặt trạng thái tải xong
      })
      .catch((error) => {
        console.error("Error fetching tours", error);
        setLoading(false); // Nếu lỗi, dừng trạng thái tải
      });
  }, []);

  // Dữ liệu của trang hiện tại
  const currentPageData = tours.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  // Xử lý khi người dùng thay đổi trang
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu đang tải
  }

  return (
    <div>
      {/* Truyền dữ liệu của trang hiện tại vào ListCard */}
      <ListCard allTours={currentPageData} cardsPerPage={cardsPerPage} />
      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Pagination
          count={Math.ceil(tours.length / cardsPerPage)} // Tổng số trang
          page={page} // Trang hiện tại
          onChange={handlePageChange} // Xử lý thay đổi trang
          color="secondary"
        />
      </div>
    </div>
  );
}
