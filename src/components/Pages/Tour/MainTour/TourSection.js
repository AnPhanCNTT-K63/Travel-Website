import React, { useState } from "react";
import ListCard from "./ListCard";
import "../../../../styles/TourSection.module.css";
import TourCard from "./Card";





export default function TourSection({ searchResults }) {

  const cardsPerPage = 9; // Số card mỗi trang

  return (
    <div>

      {/* Truyền dữ liệu của trang hiện tại vào ListCard */}
      {/* <div style={{ marginLeft: "400px", marginTop: "80px" }}> */}
      {/* <Pagination
          count={Math.ceil(allTours.length / cardsPerPage)} // Tổng số trang
          page={page} // Trang hiện tại
          onChange={handlePageChange} // Xử lý đổi trang
          color="secondary"
        /> */}
      {/* </div> */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {searchResults.length > 0 ? (
          searchResults.map((item) => <TourCard key={item.Id} item={item} />)
        ) : (
          <ListCard cardsPerPage={cardsPerPage} />
        )}
      </div>

      {/* <ListCard cardsPerPage={cardsPerPage} /> */}
    </div>
  );
}
