import React from "react";
import ListCard2 from "../ChildTour/ListCard2"; 

export default function TourSection2({ title }) {
  return (
    <div style={{ margin: "50px auto", width: "80%", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>{title}</h2>
      <ListCard2 />
    </div>
  );
}
