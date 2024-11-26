import React, { createContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const initialTime = parseInt(localStorage.getItem("time"));
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    localStorage.setItem("time", timeRemaining);

    if (timeRemaining <= 0) {
      setTimerExpired(true);
    }
  }, [timeRemaining]);

  useEffect(() => {
    // Countdown logic: decrease time every second
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [timeRemaining]);

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        setTimeRemaining,
        timerExpired,
        setTimerExpired,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
