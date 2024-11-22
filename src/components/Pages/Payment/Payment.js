import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import ShippingAddress from "./ShippingAddress";
import PaymentForm from "./PaymentForm";
import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";
import { Box, Typography } from "@mui/material";

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null); // success, error, null

  const handlePayment = async (paymentData) => {
    try {
      // Call API for payment processing
      const response = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify(paymentData),
      });
      if (response.ok) setPaymentStatus("success");
      else setPaymentStatus("error");
    } catch (error) {
      setPaymentStatus("error");
    }
  };
  const fakeOrder = {
    products: [
      {
        image: "fakeImage",
        name: "3-Day Tour to Bali",
        unitPrice: 299.99,
        quantity: 2,
      },
      {
        image: "fakeImage",
        name: "7-Day Cruise to the Caribbean",
        unitPrice: 899.99,
        quantity: 1,
      },
      {
        image: "fakeImage",
        name: "Day Trip to Eiffel Tower",
        unitPrice: 149.99,
        quantity: 3,
      },
    ],
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Tùy chọn: thêm màu nền
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <OrderSummary order={fakeOrder} />
      <ShippingAddress />
      {paymentStatus === "success" ? (
        <PaymentSuccess />
      ) : paymentStatus === "error" ? (
        <PaymentError />
      ) : (
        <PaymentForm onSubmit={handlePayment} />
      )}
    </Box>
  );
};

export default Payment;
