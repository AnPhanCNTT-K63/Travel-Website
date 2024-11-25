import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import PurchaseCard from "./PurchaseCard";
import styles from "../../../../styles/MyBookingPage.module.css";
import { getMyBooking } from "../../../../api/services";
import Commercial from "./Commercial";
import NotFoundBooking from "./NotFoundBooking";
import TimerContext from "../../../../TimerContext";

export default function MyBookingPage() {
  const location = useLocation();
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setTimerForBooking } = useContext(TimerContext);

  const detailOnclick = (tourPackageId, bookingData) => {
    navigate(`/payment/${tourPackageId}`, {
      state: {
        dataTransfer: bookingData,
      },
    });
  };

  useEffect(() => {
    const fetchMyBooking = async () => {
      try {
        setIsLoading(true);
        const res = await getMyBooking(userId);
        setBookings(res);

        // Set timers for bookings with pending status
        res.forEach((booking) => {
          if (booking.Status === "Pending") {
            setTimerForBooking(booking.Id, 300); // Set 5 minutes for pending bookings
          }
        });
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyBooking();
  }, [userId, setTimerForBooking]);

  return (
    <div className={styles.page}>
      <Commercial />

      <div className={styles.rightSide}>
        <h1 className={styles.pageTitle}>My Bookings</h1>
        <p className={styles.pageSubtitle}>
          View and manage your tour bookings here
        </p>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}>Loading your bookings...</div>
          </div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : bookings.length > 0 ? (
          <div className={styles.bookingList}>
            {bookings.map((booking) => (
              <PurchaseCard
                key={booking.Id}
                styles={styles}
                booking={booking}
                detailOnclick={() =>
                  detailOnclick(booking.TourPackageId, booking)
                }
              />
            ))}
          </div>
        ) : (
          <NotFoundBooking styles={styles} />
        )}
      </div>
    </div>
  );
}
