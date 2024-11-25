import React, { createContext, useState, useEffect } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    parseInt(localStorage.getItem("timeRemaining")) || 300 // 5 minutes default
  );
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerActive, setTimerActive] = useState(false); // Track if the timer is active

  // Start the timer when it's active
  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setTimerExpired(true);
            clearInterval(timer);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      // Save to localStorage every second
      return () => clearInterval(timer);
    } else if (timeRemaining <= 0) {
      setTimerExpired(true);
    }
  }, [timeRemaining, timerActive]);

  // Persist timeRemaining in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("timeRemaining", timeRemaining);
  }, [timeRemaining]);

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        setTimeRemaining,
        timerExpired,
        setTimerExpired,
        setTimerActive, // Provide a way to control the timer active state
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
