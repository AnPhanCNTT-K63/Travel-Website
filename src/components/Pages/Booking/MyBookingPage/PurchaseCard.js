import React, { useState, useEffect } from "react";
import classNames from "classnames";

const PurchaseCard = ({
  styles,
  booking,
  detailOnclick,
  timeRemained,
  getTimeRemaining,
  timerExpire,
  getTimerExpired,
  seeTicketOnclick,
  deleteOnclick,
}) => {
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

  const [timeRemaining, setTimeRemaining] = useState(timeRemained);
  const [timerExpired, setTimerExpired] = useState(timerExpire);

  getTimeRemaining(timeRemaining);
  getTimerExpired(timerExpired);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimerExpired(true);
    }
  }, [timeRemaining, setTimeRemaining, setTimerExpired]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
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
          {booking.Status === "pending" &&
            `${
              timerExpired
                ? "⚠️ Payment Cancelled"
                : `⏳ Time remaining: ${formatTime(timeRemaining)}`
            }`}
          {booking.Status === "Paid" && "Payment Successful"}
        </span>
      </div>
      {booking.Status === "pending" && (
        <div className={styles.footer}>
          <span className={styles.seeDetails} onClick={detailOnclick}>
            See Details
          </span>
          <span className={styles.dot}></span>
        </div>
      )}
      {booking.Status === "paid" && (
        <div className={styles.footer}>
          <span className={styles.seeDetails} onClick={seeTicketOnclick}>
            Click here to see Your Ticket
          </span>
          <span className={styles.dot}></span>
        </div>
      )}
      {booking.Status === "cancel" && (
        <div className={styles.footer}>
          <span className={styles.seeDetails} onClick={deleteOnclick}>
            Payment has been Cancelled
          </span>
          <span className={styles.dot}></span>
        </div>
      )}
    </div>
  );
};

export default PurchaseCard;
