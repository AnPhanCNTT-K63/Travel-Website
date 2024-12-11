import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function PackageInfo({ tourPackage }) {
  const fallbackImage = "/images/default-tour.jpg"; // Placeholder image

  return (
    <Paper
      elevation={5}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#f9f9f9",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1e88e5",
          textAlign: "center",
          mb: 3,
        }}
      >
        Tour Package Information
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Image Section */}
      <Box
        sx={{
          mb: 3,
          textAlign: "center",
        }}
      >
        <img
          src={
            tourPackage?.Image
              ? `${distributionUrl}/Packages/${tourPackage.Image}`
              : fallbackImage
          }
          alt="Tour Package"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "16px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* Information Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body1"
          sx={{ mb: 1.5, fontSize: "1rem", color: "#424242" }}
        >
          <strong style={{ color: "#1565c0" }}>Name:</strong>{" "}
          {tourPackage?.Name || "N/A"} Package
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 1.5, fontSize: "1rem", color: "#424242" }}
        >
          <strong style={{ color: "#1565c0" }}>Check-in:</strong>{" "}
          {tourPackage?.CheckIn
            ? new Date(tourPackage.CheckIn).toLocaleDateString()
            : "N/A"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            fontSize: "1rem",
            color: tourPackage?.IsChangeSchedule ? "#4caf50" : "#f44336",
            display: "flex",
            alignItems: "center",
          }}
        >
          <strong style={{ color: "#1565c0", marginRight: "8px" }}>
            {tourPackage?.IsChangeSchedule ? (
              <CheckCircleIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            ) : (
              <CancelIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            )}
            {tourPackage?.IsChangeSchedule
              ? "Can Reschedule"
              : "Cannot Reschedule"}
          </strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            fontSize: "1rem",
            color: tourPackage?.IsRefund ? "#4caf50" : "#f44336",
            display: "flex",
            alignItems: "center",
          }}
        >
          <strong style={{ color: "#1565c0", marginRight: "8px" }}>
            {tourPackage?.IsRefund ? (
              <CheckCircleIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            ) : (
              <CancelIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
            )}
            {tourPackage?.IsRefund ? "Refund Possible" : "No Refund Possible"}
          </strong>
        </Typography>
      </Box>

      {/* Button Section */}
      <Tooltip title="Click to get more details about the package!" arrow>
        <Button
          variant="contained"
          fullWidth
          onClick={() => alert("Fetching more information...")}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
            color: "#fff",
            borderRadius: "12px",
            transition: "transform 0.3s ease, background 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
              transform: "scale(1.05)",
            },
          }}
        >
          Show Tour Package Info
        </Button>
      </Tooltip>
    </Paper>
  );
}
