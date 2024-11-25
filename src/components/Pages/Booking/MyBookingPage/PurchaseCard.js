import React, { useEffect, useContext } from "react";
import classNames from "classnames";
import TimerContext from "../../../../TimerContext";

const PurchaseCard = ({ styles, booking, detailOnclick }) => {
  const { getTimer, updateTimer } = useContext(TimerContext);

  const { timeRemaining, timerExpired } = getTimer(booking.Id);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        updateTimer(booking.Id, timeRemaining - 1, false);
      }, 1000);

      return () => clearInterval(timer);
    } else if (!timerExpired) {
      updateTimer(booking.Id, 0, true);
    }
  }, [timeRemaining, timerExpired, booking.Id, updateTimer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.statusPending;
      case "Cancel":
        return styles.statusCancel;
      case "Paid":
        return styles.statusPaid;
      default:
        return "";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{booking.Name}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.bookingId}>Booking ID: {booking.Id}</span>
        <span
          className={classNames(styles.status, getStatusClass(booking.Status))}
        >
          {booking.Status === "Pending" &&
            `${
              timerExpired
                ? "⚠️ Payment session expired. Restart payment process."
                : `⏳ Time remaining: ${formatTime(timeRemaining)}`
            }`}
          {booking.Status === "Cancel" && "Payment Cancelled"}
          {booking.Status === "Paid" && "Payment Successful"}
        </span>
      </div>
      <div className={styles.footer}>
        <span className={styles.seeDetails} onClick={detailOnclick}>
          See Details
        </span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default PurchaseCard;
