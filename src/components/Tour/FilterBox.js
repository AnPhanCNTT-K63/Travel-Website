import React, { useState } from "react";
import "../../styles/filterBox.css";
import StarIcon from "@mui/icons-material/Star";

export default function FilterBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState([]);
  const [price, setPrice] = useState(500);
  const [city, setCity] = useState("London");

  const handleRatingChange = (event) => {
    const value = event.target.value;
    if (rating.includes(value)) {
      setRating(rating.filter((r) => r !== value));
    } else {
      setRating([...rating, value]);
    }
  };

  return (
    <div className="filter-box" style={{ marginTop: "80px" }}>
      <h2 style={{ marginBottom: "50px" }}>Tour Search</h2>
      <div className="search-box" style={{ marginBottom: "100px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" style={{ width: "50%" }}>
          Search
        </button>
      </div>

      <div className="filter-section" style={{ marginBottom: "80px" }}>
        <h5>Guest Rating</h5>
        <div className="checkbox-group">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars}>
              <input
                type="checkbox"
                id={`rating-${stars}`}
                value={stars}
                onChange={handleRatingChange}
              />
              <label htmlFor={`rating-${stars}`}>
                {" "}
                {stars}
                {Array.from({ length: stars }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section" style={{ marginBottom: "80px" }}>
        <h5>Price Range</h5>
        <input
          type="range"
          min="500"
          max="2000000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div>Selected: ${price}</div>
      </div>

      <div className="filter-section">
        <h5>City</h5>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="London">London</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Tokyo">Tokyo</option>
          <option value="New York">New York</option>
          <option value="Ha Noi">Ha Noi</option>
          <option value="Gareny">Gareny</option>
        </select>
      </div>
    </div>
  );
}
