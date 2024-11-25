import React, { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { storePaymentInfo } from "../../../../api/services";

export default function ConfirmSection({ data }) {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentInfo = {
    PaymentMethod: data.selectedPayment,
    PaymentAmount: data.data.total,
    PaymentStatus: "pending",
    // TransactionId: "",
    BookingId: data.data.TourPackageId,
    BookingDate: data.data.BookingDate,
  };

  const onClickAccept = async () => {
    // Swal.fire({
    //   title: "Confirm Payment?",
    //   text: "Have you completed your payment? Click 'Yes' to confirm.",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, I have paid!",
    //   cancelButtonText: "Cancel",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: "Thank You!",
    //       text: "We have received your confirmation. We will contact you shortly to reconfirm.",
    //       icon: "success",
    //       confirmButtonColor: "#28a745",
    //     }).then(() => {
    //       navigate("/");
    //     });
    //   }
    // });

    try {
      const res = await storePaymentInfo(paymentInfo);
      console.log(res);
    } catch (err) {
      console.error("Error sending: ", err);
    }
    ///console.log(paymentInfo);
  };

  return (
    <Box
      sx={{
        mt: 2,
        marginTop: "-50px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
      >
        Have you completed your payment?
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Click "Accept" to confirm your payment and wait for us to contact you.
      </Typography>
      <Button
        onClick={onClickAccept}
        variant="contained"
        color="primary"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          borderRadius: 3,
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        Accept
      </Button>
    </Box>
  );
}
