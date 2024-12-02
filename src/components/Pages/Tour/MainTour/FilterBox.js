import React, { useState } from "react";
import "../../../../styles/filterBox.css";
import StarIcon from "@mui/icons-material/Star";
import { sendSearchResult } from '../../../../api/services';

export default function FilterBox({ setSearchResults }) {
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

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Cập nhật searchTerm từ input
  };
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const res = await sendSearchResult(searchTerm);
        setSearchResults(res);  // Đảm bảo đây là hàm
        console.log("Search results:", res);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      console.log('Vui lòng nhập từ khóa tìm kiếm');
    }
  };

  // Hàm xử lý khi nhấn phím Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className="filter-box"
      style={{ height: "1155px", marginTop: "100px" }}
    >
      <h2 style={{ marginBottom: "50px" }}>Tour Search</h2>
      <div className="search-box" style={{ marginBottom: "100px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" style={{ width: "50%" }} onClick={handleSearch}>
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
