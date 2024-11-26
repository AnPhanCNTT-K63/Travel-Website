import React, { useState } from "react";
import OrderSummary from "../Billing/TransactionHistory";
import ShippingAddress from "./UserInformation";
import PaymentForm from "./PaymentForm";
import PaymentSuccess from "./PaymentSuccess";
import PaymentError from "./PaymentError";
import { Box, Typography, Grid } from "@mui/material";
import PaymentCard from "../Billing/CreditCard";
import InvoiceList from "../Billing/InvoiceList";
import MediaCard from "../Billing/MediaCard";
import MethodPayment from "../Billing/MethodPayment";
import example from "../../../assets/images/mastercard-logo.png";
import exampleLogo from "../../../assets/images/visa-logo.png";

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
        PurchaseDate: '2022-12-31',
        quantity: 2,
      },
      {
        image: "fakeImage",
        name: "7-Day Cruise to the Caribbean",
        unitPrice: 899.99,
        PurchaseDate: '2022-1-3',
        quantity: 2,

      },
      {
        image: "fakeImage",
        name: "Day Trip to Eiffel Tower",
        unitPrice: 149.99,
        PurchaseDate: '2022-2-1',
        quantity: 4,

      },
    ],
  };
  const cardNumber = "1234567812341234";
  const logoUrl = example; // Đường dẫn đến logo
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
      <Grid container spacing={2}>
        {/* PaymentCard takes 9/12 columns */}
        <Grid item xs={12} md={4}>
          <PaymentCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MediaCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <MediaCard />
            </Grid>
          </Grid>
          <MethodPayment cardNumber={cardNumber} logoSrc={logoUrl} />
          <MethodPayment cardNumber={"5426587245124245"} logoSrc={exampleLogo} />
        </Grid>
        {/* InvoiceList takes 3/12 columns */}
        <Grid item xs={12} md={4}>
          <InvoiceList />
        </Grid>
      </Grid>
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
