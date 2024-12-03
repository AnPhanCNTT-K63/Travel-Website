import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourDetail } from "../../../api/services";
import DetailCard from "./DetailCard";

export default function DetailPage() {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourDetail(tourId);
        setTour(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Hiển thị thông báo nếu không tìm thấy tour
  if (!tour) return <div>Loading...</div>;

  return (
    <div>
      <DetailCard item={tour} />
    </div>
  );
}