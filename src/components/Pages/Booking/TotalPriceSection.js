import React from "react";
import {
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  Card,
  Stack,
} from "@mui/material";

export default function TotalPriceSection({
  ticket,
  handleOnClick,
  total,
  discount,
  VAT,
  VATCost,
}) {
  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        width: "70%",
        maxWidth: 600,
        mt: 5,
        backgroundColor: "#f4f6f8",
        border: "1px solid #cfd8dc",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1565c0", textAlign: "center" }}
      >
        Total Price Summary
      </Typography>
      <Divider sx={{ my: 3, backgroundColor: "#90caf9" }} />
      <Stack spacing={2}>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Price per person:</span>
          <strong>${ticket.price.toFixed(2)}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Number of people:</span>
          <strong>{ticket.travelerNum}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Discount:</span>
          <strong style={{ color: "#43a047" }}>- ${discount.toFixed(2)}</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>VAT ({VAT}%):</span>
          <strong>+ ${VATCost.toFixed(2)}</strong>
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "#e0e0e0" }} />
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: "#d32f2f",
          }}
        >
          <span>Total Price:</span>
          <strong>${total.toFixed(2)}</strong>
        </Typography>
      </Stack>
      <FormControlLabel
        control={<Switch />}
        label="I agree to the terms and conditions"
        sx={{ mt: 3, display: "block", textAlign: "center", color: "#5f6368" }}
      />
      <Button
        variant="contained"
        sx={{
          mt: 3,
          width: "100%",
          background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(45deg, #1565c0, #1e88e5)",
          },
          fontWeight: "bold",
          py: 1.5,
        }}
        size="large"
        onClick={handleOnClick}
      >
        Proceed to Payment
      </Button>
    </Card>
  );
}
