import React from "react";

const transactions = [
  {
    id: 1,
    description: "Netflix",
    date: "27 March 2021, at 12:30 PM",
    amount: -2500,
    status: "completed",
  },
  {
    id: 2,
    description: "Apple",
    date: "27 March 2021, at 04:30 AM",
    amount: 2000,
    status: "completed",
  },
  {
    id: 3,
    description: "Stripe",
    date: "26 March 2021, at 12:30 AM",
    amount: 750,
    status: "completed",
  },
  {
    id: 4,
    description: "HubSpot",
    date: "26 March 2021, at 11:30 AM",
    amount: 1050,
    status: "completed",
  },
  {
    id: 5,
    description: "Creative Tim",
    date: "26 March 2021, at 07:30 AM",
    amount: 2400,
    status: "completed",
  },
  {
    id: 6,
    description: "Webflow",
    date: "26 March 2021, at 04:00 AM",
    amount: 0,
    status: "pending",
  },
];

const OrderSummary = ({ styles }) => {
  return (
    <div className={styles.transactionContainer}>
      <h1>Your Transactions</h1>
      <div
        className={styles.transactions}
        style={{
          maxHeight: "400px", // Adjust maxHeight as needed
          overflowY: transactions.length > 5 ? "scroll" : "visible",
        }}
      >
        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transaction}>
            <div className={styles.transactionHeader}>
              <span>{transaction.date}</span>
            </div>
            <div className={styles.transactionBody}>
              <span className={styles.description}>
                {transaction.description}
              </span>
              <span
                className={`${styles.amount} ${
                  transaction.amount < 0
                    ? styles.amountNegative
                    : styles.amountPositive
                }`}
              >
                {transaction.amount < 0
                  ? `- $${Math.abs(transaction.amount)}`
                  : `+ $${transaction.amount}`}
              </span>
            </div>
            <div className={styles.transactionStatus}>
              {transaction.status === "pending" ? (
                <span className={styles.pending}>Pending</span>
              ) : (
                <span className={styles.completed}>Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
