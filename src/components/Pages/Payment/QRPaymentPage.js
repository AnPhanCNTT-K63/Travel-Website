import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { AccessTime, ArrowBack } from "@mui/icons-material";

export default function QRPaymentPage() {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#f4f5fa",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        variant="contained"
        color="error"
        sx={{
          alignSelf: "flex-start",
          mb: 2,
          fontWeight: "bold",
          bgcolor: "#f44336",
          "&:hover": {
            bgcolor: "#d32f2f",
          },
        }}
      >
        Cancel
      </Button>

      {/* Countdown Section */}
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
          <AccessTime fontSize="medium" sx={{ mr: 1 }} /> Complete the payment
          in: {formatTime(timeLeft)}
        </Typography>
      </Paper>

      {/* QR Code Section */}
      <Card
        elevation={4}
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
          mb: 3,
          background: "#fff",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#1976d2" }}
        >
          Scan the QR Code to Pay
        </Typography>
        <Typography
          variant="body2"
          sx={{
            backgroundColor: "#fff9c4",
            p: 2,
            borderRadius: 2,
            textAlign: "center",
            color: "#f57c00",
            mb: 3,
            boxShadow: "inset 0px 0px 8px rgba(0,0,0,0.1)",
          }}
        >
          Please complete the payment before the specified time. Otherwise, the
          transaction will be automatically refunded within 10 working days.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 3,
            mb: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "#1976d2",
              boxShadow: "0px 0px 15px rgba(25, 118, 210, 0.2)",
            },
          }}
        >
          <img
            src="https://via.placeholder.com/150" // Replace with QR code URL
            alt="QR Code"
            style={{ width: "150px", height: "150px", marginBottom: "16px" }}
          />
          <Typography fontWeight="bold" sx={{ mb: 1, color: "#1976d2" }}>
            Traveloka Vietnam
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Pay before: 21:15, 23/11/2024
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            Download QR Code
          </Button>
        </Box>
      </Card>

      {/* Payment Details Section */}
      <Card
        elevation={4}
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
          mb: 3,
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography
          fontWeight="bold"
          color="textSecondary"
          mb={1}
          sx={{ fontSize: "1.1rem" }}
        >
          Payment Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography>Booking Code:</Typography>
          <Typography fontWeight="bold">1200886478</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Total Amount:</Typography>
          <Typography fontWeight="bold" color="primary">
            552,000 VND
          </Typography>
        </Box>
      </Card>

      {/* QR Payment Instructions */}
      <Card
        elevation={4}
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#1976d2" }}
        >
          QR Payment Instructions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[
            "Open an e-wallet or banking app that supports QR payment via VietQR, then scan the QR code above.",
            "Please check and ensure the amount and payment information match the order details, then complete the transaction within the payment deadline.",
            "The booking information will be automatically confirmed after successful payment. Please check your booking status on the Booking page.",
          ].map((instruction, index) => (
            <Grid item xs={12} key={index}>
              <Typography>
                {index + 1}. {instruction}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
