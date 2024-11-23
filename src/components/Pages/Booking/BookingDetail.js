import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function BookingDetail({
  tourDates,
  tourPackage,
  totalQuantity,
  setTravelDay,
  handleClickBook,
  setTravlerNumber,
  setTotal,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);

  setTravelDay(selectedDate);
  setTravlerNumber(quantity);

  const totalPrice = quantity * tourPackage?.Price;
  setTotal(totalPrice);

  return (
    <Paper elevation={8} sx={{ p: 4, borderRadius: 2, boxShadow: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "600",
          color: "#1976d2",
          mb: 3,
          textAlign: "center",
          fontSize: "28px",
        }}
      >
        Booking Details
      </Typography>
      <Divider sx={{ my: 3 }} />

      {/* Part 1: Schedule */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#455a64", fontWeight: "600" }}
        >
          Choose Your Travel Date
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {tourDates.map((date, index) => (
            <Button
              key={index}
              variant={selectedDate === date ? "contained" : "outlined"}
              onClick={() => setSelectedDate(date)}
              sx={{
                minWidth: "120px",
                borderRadius: "20px",
                color: selectedDate === date ? "#fff" : "#1976d2",
                backgroundColor:
                  selectedDate === date ? "#1976d2" : "transparent",
                "&:hover": {
                  backgroundColor: "#145ca0",
                  color: "#fff",
                },
                transition: "all 0.3s ease",
                fontWeight: "500",
              }}
            >
              {new Date(date).toLocaleDateString()}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Part 2: Selected Date */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#455a64", fontWeight: "600" }}
        >
          Selected Date
        </Typography>
        <TextField
          value={
            selectedDate
              ? new Date(selectedDate).toLocaleDateString()
              : "No date selected"
          }
          fullWidth
          disabled
          sx={{
            "& .Mui-disabled": { color: "#616161" },
            backgroundColor: "#f1f1f1",
            borderRadius: "20px",
            padding: "12px",
            fontWeight: "500",
          }}
        />
      </Box>

      {/* Part 3: Price / Person */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#455a64", fontWeight: "600" }}
        >
          Price per Person
        </Typography>
        <Typography variant="h10">
          (If you are a group of more than 10 people, please contact us for the
          best price.)
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h5"
            sx={{ flex: 1, fontWeight: "600", color: "#1976d2" }}
          >
            ${tourPackage?.Price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              color="error"
              sx={{
                "&:hover": { backgroundColor: "#f2f2f2" },
                transition: "background-color 0.2s ease",
              }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6" sx={{ color: "#1976d2" }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={() => setQuantity((prev) => prev + 1)}
              color="success"
              sx={{
                "&:hover": { backgroundColor: "#f2f2f2" },
                transition: "background-color 0.2s ease",
              }}
            >
              <Add />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "#455a64" }}>
            Remaining: {totalQuantity ? totalQuantity : "N/A"}
          </Typography>
        </Box>

        {/* Remaining Quantity */}
      </Box>

      {/* Part 4: Total Price and Book Button */}
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#455a64",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Total Price:{" "}
          <span style={{ color: "#1976d2", fontWeight: "700" }}>
            ${totalPrice.toFixed(2)}
          </span>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => handleClickBook()}
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#145ca0" },
            padding: "14px",
            borderRadius: "20px",
            fontWeight: "600",
          }}
        >
          Book Now
        </Button>
      </Box>
    </Paper>
  );
}
