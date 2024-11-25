import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PurchaseCard from "./PurchaseCard";
import { Link } from "@mui/material";
import styles from "../../../../styles/MyBookingPage.module.css";

// Simulating fetched booking data (this could be replaced with an API call)
const sampleBookings = [
  {
    id: "1201176040",
    title: "Sun World Ba Na Hills in Da Nang",
    status: "Awaiting Selection of Payment Method · 27:09",
    isPaid: false,
  },
  {
    id: "1201176041",
    title: "Nguyen Dynasty Tour",
    status: "Paid · 0:00",
    isPaid: true,
  },
  {
    id: "1201176042",
    title: "Hoi An Ancient Town",
    status: "Awaiting Selection of Payment Method · 12:35",
    isPaid: false,
  },
];

export default function MyBookingPage() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating fetching booking data.
    setTimeout(() => {
      try {
        setBookings(sampleBookings);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Simulate a delay for fetching data
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.leftSide}>
        <img
          src="/app.png" // Image uploaded by the user
          alt="How to Download App"
          style={{ objectFit: "cover" }}
          className={styles.instructionImage}
        />
        <h2 className={styles.instructionTitle}>
          How to Buy VVBA Gift Voucher
        </h2>
        <ol className={styles.instructionList}>
          <li>Choose the occasion</li>
          <li>Select design, amount, and delivery method</li>
          <li>Review and proceed to payment</li>
        </ol>
        <Link href="https://www.traveloka.com/en-id" className={styles.link}>
          Corporate Gift Vouchers also available here.
        </Link>
      </div>

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
              <PurchaseCard styles={styles} booking={booking} />
            ))}
          </div>
        ) : (
          <div className={styles.noBookingsContainer}>
            <img
              src="/NoBooking.png" // Add a nice placeholder image
              alt="No bookings"
              style={{ width: "100%" }}
              className={styles.noBookingsImage}
            />
            <p className={styles.noBookings}>
              You haven't made any bookings yet. Explore some amazing tours!
            </p>
            <Link to="/tours" className={styles.exploreToursButton}>
              Explore Tours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
