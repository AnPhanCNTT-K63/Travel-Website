import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import PurchaseCard from "./PurchaseCard";
import styles from "../../../../styles/MyBookingPage.module.css";
import { getMyBooking } from "../../../../api/services";
import Commercial from "./Commercial";
import NotFoundBooking from "./NotFoundBooking";
import TimerContext from "../../../../TimerContext";

export default function MyBookingPage() {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("dataTransfer"));
  const dataTransfer = storedData;

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { timeRemaining, setTimeRemaining, timerExpired, setTimerExpired } =
    useContext(TimerContext);

  const detailOnclick = (bookingId) => {
    navigate(`/payment/${bookingId}`, {
      state: {
        dataTransfer,
      },
    });
  };

  const seeTicketOnclick = () => {};

  const deleteOnclick = () => {};

  useEffect(() => {
    const fetchMyBooking = async () => {
      try {
        setIsLoading(true);
        const res = await getMyBooking(userId);
        setBookings(res);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyBooking();
  }, [userId]);

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
                detailOnclick={() => detailOnclick(booking.Id)}
                timeRemained={timeRemaining}
                timerExpire={timerExpired}
                getTimeRemaining={setTimeRemaining}
                getTimerExpired={setTimerExpired}
                seeTicketOnclick={seeTicketOnclick}
                deleteOnclick={deleteOnclick}
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
