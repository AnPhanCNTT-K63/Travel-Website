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
  const [timeRemaining, setTimeRemaining] = useState(timeRemained);
  const [timerExpired, setTimerExpired] = useState(timerExpire);

  // Update parent with current timeRemaining and timerExpired
  useEffect(() => {
    getTimeRemaining(timeRemaining);
    getTimerExpired(timerExpired);
  }, [timeRemaining, timerExpired, getTimeRemaining, getTimerExpired]);

  // Countdown timer logic
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimerExpired(true);
    }
  }, [timeRemaining]);

  // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Map status to class, message, and footer
  const statusMap = {
    pending: {
      class: styles.statusPending,
      message: timerExpired
        ? "⚠️ Expired"
        : `⏳ Time remaining: ${formatTime(timeRemaining)}`,
      footer: (
        <span
          className={classNames(styles.seeDetails, styles.pending)}
          onClick={detailOnclick}
        >
          See Details
        </span>
      ),
    },
    waiting: {
      class: styles.statusWaiting,
      message: "Waiting for payment approval",
      footer: (
        <span className={classNames(styles.seeDetails, styles.waiting)}>
          Please wait for approval
        </span>
      ),
    },
    success: {
      class: styles.statusSuccess,
      message: "Payment Successful",
      footer: (
        <span
          className={classNames(styles.seeDetails, styles.success)}
          onClick={seeTicketOnclick}
        >
          Click here to see Your Ticket
        </span>
      ),
    },
    cancel: {
      class: styles.statusCancel,
      message: "Payment Cancelled",
      footer: (
        <span className={classNames(styles.seeDetails, styles.cancel)}>
          Payment has been Cancelled
        </span>
      ),
    },
    fail: {
      class: styles.statusFail,
      message: "Your Payment Has Been Declined",
      footer: (
        <span
          className={classNames(styles.seeDetails, styles.fail)}
          onClick={deleteOnclick}
        >
          Contact support for details.
        </span>
      ),
    },
  };

  const {
    class: statusClass,
    message,
    footer,
  } = statusMap[booking.Status] || {};

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{booking.Name}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.bookingId}>Booking ID: {booking.Id}</span>
        <span className={classNames(styles.status, statusClass)}>
          {message}
        </span>
      </div>
      <div className={styles.footer}>
        {footer}
        <span className={styles.dot}></span>
      </div>
      {/* Delete Button */}
      {booking.Status !== "waiting" && booking.Status !== "pending" && (
        <button
          className={classNames(styles.deleteButton)}
          onClick={() => deleteOnclick(booking.Id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PurchaseCard;
