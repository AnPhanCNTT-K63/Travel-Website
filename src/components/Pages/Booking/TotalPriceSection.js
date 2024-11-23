import React from "react";
import {
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  Card,
} from "@mui/material";

export default function TotalPriceSection({ ticket, handleOnclick }) {
  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 2,
        boxShadow: 6,
        width: "66%",
        mt: 4,
        backgroundColor: "#e8f5e9",
        border: "1px solid #a5d6a7",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2e7d32" }}
      >
        Total Price
      </Typography>
      <Divider sx={{ my: 2, backgroundColor: "#66bb6a" }} />
      <Typography variant="h6">
        Price per person: <strong>${ticket.price}</strong>
      </Typography>
      <Typography variant="h6">
        Number of people: <strong>{ticket.travelerNum}</strong>
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mt: 2, color: "#d32f2f" }}
      >
        Total Price: <strong>${ticket.totalPrice}</strong>
      </Typography>
      <FormControlLabel
        control={<Switch />}
        label="I agree to the terms and conditions"
        sx={{ mt: 3 }}
      />
      <Button
        variant="contained"
        sx={{
          mt: 2,
          width: "100%",
          background: "linear-gradient(45deg, #4caf50, #81c784)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(45deg, #388e3c, #66bb6a)",
          },
        }}
        size="large"
        onClick={() => handleOnclick()}
      >
        Save Proceed to Payment
      </Button>
    </Card>
  );
}
