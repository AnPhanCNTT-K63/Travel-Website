import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourDetail } from "../../../api/services";
import TourCard from "./MainTour/Card";
import DetailCard from "./DetailCard";

export default function DetailPage() {
  const { tourId } = useParams();
  const [tour, setTour] = useState({});

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await getTourDetail(tourId);
        setTour(response);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      } finally {
      }
    };
    fetchTourDetail();
  }, [tourId]);

  console.log(tour);

  if (!tour) return <div>No tour found.</div>;
  return (
    <div>
      <DetailCard/>
    </div>
  );
}
