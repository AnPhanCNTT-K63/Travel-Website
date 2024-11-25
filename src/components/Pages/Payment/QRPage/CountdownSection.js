import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes countdown in seconds

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        maxWidth: 600,
        p: 3,
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        textAlign: "center",
        borderRadius: 3,
        mb: 3,
        color: "#0d47a1",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccessTime fontSize="medium" sx={{ mr: 1 }} /> Complete the payment in:{" "}
        {formatTime(timeLeft)}
      </Typography>
    </Paper>
  );
}
