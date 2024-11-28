import React, { useState } from "react";
import ListCard from "./ListCard";
import "../../../../styles/TourSection.module.css";

export default function TourSection() {
  const cardsPerPage = 9; // Số card mỗi trang

  return (
    <div>
      <ListCard cardsPerPage={cardsPerPage} />
    </div>
  );
}
