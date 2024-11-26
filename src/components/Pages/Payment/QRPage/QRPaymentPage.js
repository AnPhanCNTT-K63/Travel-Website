import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import Instructions from "./QRInstructions";
import PaymentDetail from "./PaymentDetai";
import QRCodeSection from "./QRCodeSection";
import CountdownSection from "./CountdownSection";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmSection from "./ConfirmSection";

export default function QRPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state.dataTransfer);

  const onClickCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you leave, the transaction will be saved in your billing page. You can continue the process within 24 hours.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Leave Process",
      cancelButtonText: "Stay Here",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); // Navigate to home or cancel route
      }
    });
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
      {/* Cancel Button with SweetAlert2 */}
      <Button
        onClick={onClickCancel}
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
      <CountdownSection />

      {/* QR Code and Confirmation Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 600,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          mb: 3,
        }}
      >
        <QRCodeSection data={data} />

        {/* Confirmation Section */}
        <ConfirmSection data={data} />
      </Box>

      {/* Payment Details Section */}
      <PaymentDetail data={data} />

      {/* QR Payment Instructions */}
      <Instructions />
    </Box>
  );
}
