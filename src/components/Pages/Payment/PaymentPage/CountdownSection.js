import React, { useEffect, useContext } from "react";
import TimerContext from "../../../../TimerContext";
import styles from "../../../../styles/PaymentPage.module.css";

export default function CountdownSection({ tourPackageId }) {
  const { getTimer, updateTimer, setTimerExpired } = useContext(TimerContext);

  const { timeRemaining, timerExpired } = getTimer(tourPackageId);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        updateTimer(tourPackageId, timeRemaining - 1, false);
      }, 1000);

      return () => clearInterval(timer);
    } else if (!timerExpired) {
      setTimerExpired(tourPackageId);
    }
  }, [
    timeRemaining,
    timerExpired,
    tourPackageId,
    updateTimer,
    setTimerExpired,
  ]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles.timerContainer}>
      <p className={styles.timerText}>
        {timerExpired
          ? "⚠️ Payment session expired. Restart payment process."
          : `⏳ Time remaining: ${formatTime(timeRemaining)}`}
      </p>
    </div>
  );
}
