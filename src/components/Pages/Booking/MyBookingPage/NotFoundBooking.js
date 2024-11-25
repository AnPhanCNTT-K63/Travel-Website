import React from "react";

import { Link } from "@mui/material";

export default function NotFoundBooking({ styles }) {
  return (
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
  );
}
