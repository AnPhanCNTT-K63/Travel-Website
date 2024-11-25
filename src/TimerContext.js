import React, { createContext, useState } from "react";

// Create the context
const TimerContext = createContext();

// TimerProvider Component
export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState({});

  const setTimerForBooking = (bookingId, duration) => {
    setTimers((prev) => ({
      ...prev,
      [bookingId]: { timeRemaining: duration, timerExpired: false },
    }));
  };

  const updateTimer = (bookingId, timeRemaining, timerExpired) => {
    setTimers((prev) => ({
      ...prev,
      [bookingId]: { timeRemaining, timerExpired },
    }));
  };

  const setTimerExpired = (bookingId) => {
    setTimers((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], timerExpired: true },
    }));
  };

  const getTimer = (bookingId) => {
    return timers[bookingId] || { timeRemaining: 0, timerExpired: false };
  };

  return (
    <TimerContext.Provider
      value={{
        setTimerForBooking,
        updateTimer,
        setTimerExpired,
        getTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
