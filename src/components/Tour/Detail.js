import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourDetail } from "../../api/services";
import TourCard from "./Card";

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
      } finally {
      }
    };
    fetchTourDetail();
  }, [tourId]);

  useEffect(() => {
    if (tour) console.log(tour.image);
  }, [tour]);

  if (!tour) return <div>No tour found.</div>;
  return (
    <div>
      <TourCard item={tour} />
    </div>
  );
}
