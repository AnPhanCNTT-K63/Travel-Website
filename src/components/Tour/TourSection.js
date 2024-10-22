import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import ListCard from "./ListCard";
import ListCard2 from "./ListCard2";

export default function TourSection() {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const components = [
    <ListCard />,
    <ListCard2 />,
    <ListCard />,
    <ListCard2 />,
    <ListCard />,
    <ListCard2 />,
    <ListCard />,
    <ListCard2 />,
    <ListCard />,
    <ListCard2 />,
  ];

  return (
    <div>
      {components[page - 1]}
      <div style={{ marginLeft: "400px", marginTop: "80px" }}>
        <Pagination
          count={10}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </div>
    </div>
  );
}
