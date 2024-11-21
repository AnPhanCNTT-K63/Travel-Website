import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import ListCard from "./ListCard";
import "../../../../styles/TourSection.module.css";

export default function TourSection() {
  // const [page, setPage] = useState(1);

  // Dữ liệu giả lập (tất cả các card)
  const allTours = [
    { Id: 1, Name: "Mountain Adventure", Image: "america.jpg" },
    { Id: 2, Name: "Beach Paradise", Image: "bangkokCity.jpeg" },
    { Id: 3, Name: "City Lights", Image: "delhiCity.jpeg" },
    { Id: 4, Name: "Desert Safari", Image: "dubaiCity.jpeg" },
    { Id: 5, Name: "Forest Retreat", Image: "hongkongCity.jpeg" },
    { Id: 6, Name: "Island Escape", Image: "istabulCity.jpeg" },
    { Id: 7, Name: "Mountain Peaks", Image: "londonCity.jpeg" },
    { Id: 8, Name: "Underwater World", Image: "parisCity.jpeg" },
    { Id: 9, Name: "Historic Journey", Image: "tokyoCity.jpeg" },
    { Id: 10, Name: "Snowy Adventure", Image: "Vietnam.jpeg" },
    { Id: 11, Name: "Jungle Expedition", Image: "jungle.jpg" },
    { Id: 12, Name: "City Escape", Image: "cityEscape.jpeg" },
    { Id: 13, Name: "River Cruise", Image: "riverCruise.jpeg" },
    { Id: 14, Name: "Cultural Voyage", Image: "cultureVoyage.jpeg" },
    { Id: 15, Name: "Night Safari", Image: "nightSafari.jpeg" },
    { Id: 16, Name: "Canyon Walk", Image: "canyonWalk.jpeg" },
    { Id: 17, Name: "Lake View", Image: "lakeView.jpeg" },
    { Id: 18, Name: "Winter Wonderland", Image: "winterWonderland.jpeg" },
    { Id: 1, Name: "Mountain Adventure", Image: "america.jpg" },
    { Id: 2, Name: "Beach Paradise", Image: "bangkokCity.jpeg" },
    { Id: 3, Name: "City Lights", Image: "delhiCity.jpeg" },
    { Id: 4, Name: "Desert Safari", Image: "dubaiCity.jpeg" },
    { Id: 5, Name: "Forest Retreat", Image: "hongkongCity.jpeg" },
    { Id: 6, Name: "Island Escape", Image: "istabulCity.jpeg" },
    { Id: 7, Name: "Mountain Peaks", Image: "londonCity.jpeg" },
    { Id: 8, Name: "Underwater World", Image: "parisCity.jpeg" },
    { Id: 9, Name: "Historic Journey", Image: "tokyoCity.jpeg" },
    { Id: 10, Name: "Snowy Adventure", Image: "Vietnam.jpeg" },
    { Id: 11, Name: "Jungle Expedition", Image: "jungle.jpg" },
    { Id: 12, Name: "City Escape", Image: "cityEscape.jpeg" },
    { Id: 13, Name: "River Cruise", Image: "riverCruise.jpeg" },
    { Id: 14, Name: "Cultural Voyage", Image: "cultureVoyage.jpeg" },
    { Id: 15, Name: "Night Safari", Image: "nightSafari.jpeg" },
    { Id: 16, Name: "Canyon Walk", Image: "canyonWalk.jpeg" },
    { Id: 17, Name: "Lake View", Image: "lakeView.jpeg" },
    { Id: 18, Name: "Winter Wonderland", Image: "winterWonderland.jpeg" },
    { Id: 10, Name: "Snowy Adventure", Image: "Vietnam.jpeg" },
    { Id: 11, Name: "Jungle Expedition", Image: "jungle.jpg" },
    { Id: 12, Name: "City Escape", Image: "cityEscape.jpeg" },
    { Id: 13, Name: "River Cruise", Image: "riverCruise.jpeg" },
    { Id: 14, Name: "Cultural Voyage", Image: "cultureVoyage.jpeg" },
    { Id: 15, Name: "Night Safari", Image: "nightSafari.jpeg" },
    { Id: 16, Name: "Canyon Walk", Image: "canyonWalk.jpeg" },
    { Id: 17, Name: "Lake View", Image: "lakeView.jpeg" },
    { Id: 18, Name: "Winter Wonderland", Image: "winterWonderland.jpeg" },
    { Id: 1, Name: "Mountain Adventure", Image: "america.jpg" },
    { Id: 2, Name: "Beach Paradise", Image: "bangkokCity.jpeg" },
    { Id: 3, Name: "City Lights", Image: "delhiCity.jpeg" },
    { Id: 4, Name: "Desert Safari", Image: "dubaiCity.jpeg" },
    { Id: 5, Name: "Forest Retreat", Image: "hongkongCity.jpeg" },
    { Id: 6, Name: "Island Escape", Image: "istabulCity.jpeg" },
    { Id: 7, Name: "Mountain Peaks", Image: "londonCity.jpeg" },
    { Id: 8, Name: "Underwater World", Image: "parisCity.jpeg" },
    { Id: 9, Name: "Historic Journey", Image: "tokyoCity.jpeg" },
    { Id: 10, Name: "Snowy Adventure", Image: "Vietnam.jpeg" },
    { Id: 11, Name: "Jungle Expedition", Image: "jungle.jpg" },
    { Id: 12, Name: "City Escape", Image: "cityEscape.jpeg" },
    { Id: 13, Name: "River Cruise", Image: "riverCruise.jpeg" },
    { Id: 14, Name: "Cultural Voyage", Image: "cultureVoyage.jpeg" },
    { Id: 15, Name: "Night Safari", Image: "nightSafari.jpeg" },
    { Id: 16, Name: "Canyon Walk", Image: "canyonWalk.jpeg" },
    { Id: 17, Name: "Lake View", Image: "lakeView.jpeg" },
    { Id: 18, Name: "Winter Wonderland", Image: "winterWonderland.jpeg" },
    { Id: 1, Name: "Mountain Adventure", Image: "america.jpg" },
    { Id: 2, Name: "Beach Paradise", Image: "bangkokCity.jpeg" },
    { Id: 3, Name: "City Lights", Image: "delhiCity.jpeg" },
    { Id: 4, Name: "Desert Safari", Image: "dubaiCity.jpeg" },
    { Id: 5, Name: "Forest Retreat", Image: "hongkongCity.jpeg" },
    { Id: 6, Name: "Island Escape", Image: "istabulCity.jpeg" },
    { Id: 7, Name: "Mountain Peaks", Image: "londonCity.jpeg" },
    { Id: 8, Name: "Underwater World", Image: "parisCity.jpeg" },
    { Id: 9, Name: "Historic Journey", Image: "tokyoCity.jpeg" },
    { Id: 10, Name: "Snowy Adventure", Image: "Vietnam.jpeg" },
    { Id: 11, Name: "Jungle Expedition", Image: "jungle.jpg" },
    { Id: 12, Name: "City Escape", Image: "cityEscape.jpeg" },
    { Id: 13, Name: "River Cruise", Image: "riverCruise.jpeg" },
    { Id: 14, Name: "Cultural Voyage", Image: "cultureVoyage.jpeg" },
    { Id: 15, Name: "Night Safari", Image: "nightSafari.jpeg" },
    { Id: 16, Name: "Canyon Walk", Image: "canyonWalk.jpeg" },
    { Id: 17, Name: "Lake View", Image: "lakeView.jpeg" },
    { Id: 18, Name: "Winter Wonderland", Image: "winterWonderland.jpeg" },
    { Id: 10, Name: "Snowy Adventure", Image: "Vietnam.jpeg" },
    { Id: 11, Name: "Jungle Expedition", Image: "jungle.jpg" },
    { Id: 12, Name: "City Escape", Image: "cityEscape.jpeg" },
    { Id: 13, Name: "River Cruise", Image: "riverCruise.jpeg" },
    { Id: 14, Name: "Cultural Voyage", Image: "cultureVoyage.jpeg" },
    { Id: 15, Name: "Night Safari", Image: "nightSafari.jpeg" },
    { Id: 16, Name: "Canyon Walk", Image: "canyonWalk.jpeg" },
    { Id: 17, Name: "Lake View", Image: "lakeView.jpeg" },
    { Id: 18, Name: "Winter Wonderland", Image: "winterWonderland.jpeg" },
  ];

  const cardsPerPage = 9; // Số card mỗi trang

  // // Dữ liệu cho trang hiện tại
  // const currentPageData = allTours.slice(
  //   (page - 1) * cardsPerPage,
  //   page * cardsPerPage
  // );

  // // Xử lý khi người dùng đổi trang
  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // };

  return (
    <div>
      {/* Truyền dữ liệu của trang hiện tại vào ListCard */}
      <ListCard allTours={allTours} cardsPerPage={cardsPerPage} />
      {/* <div style={{ marginLeft: "400px", marginTop: "80px" }}> */}
        {/* <Pagination
          count={Math.ceil(allTours.length / cardsPerPage)} // Tổng số trang
          page={page} // Trang hiện tại
          onChange={handlePageChange} // Xử lý đổi trang
          color="secondary"
        /> */}
      {/* </div> */}
    </div>
  );
}
