import React from "react";

const PurchaseCard = ({ styles, key, booking }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Sun World Ba Na Hills in Da Nang</span>
        <span className={styles.cancelIcon}>❌</span>
      </div>
      <div className={styles.body}>
        <span className={styles.bookingId}>Booking ID: 1201176040</span>
        <span className={styles.status}>
          Awaiting Selection of Payment Method · 27:09
        </span>
      </div>
      <div className={styles.footer}>
        <span className={styles.seeDetails}>See Details</span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default PurchaseCard;
