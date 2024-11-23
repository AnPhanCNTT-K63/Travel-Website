import React from "react";
import {
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
} from "@mui/material";
import {
  LocalOffer,
  CalendarToday,
  People,
  Sync,
  MonetizationOn,
  Info,
} from "@mui/icons-material";

export default function Ticket({ ticket }) {
  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: "#f9f9f9",
      }}
    >
      <CardHeader
        title="Ticket Information"
        avatar={<LocalOffer fontSize="large" sx={{ color: "#4caf50" }} />}
        titleTypographyProps={{
          variant: "h5",
          fontWeight: "bold",
          color: "primary",
        }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Info sx={{ color: "#3f51b5", mr: 1 }} />
              <Typography variant="h6" component="span">
                <strong>TourPackage:</strong> {ticket.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Info sx={{ color: "#3f51b5", mr: 1 }} />
              <Typography variant="h6" component="span">
                <strong>Description:</strong> {ticket.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <CalendarToday sx={{ color: "#ff5722", mr: 1 }} />
              <Typography variant="body1">
                <strong>Date of Travel:</strong> {ticket.date}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <People sx={{ color: "#2196f3", mr: 1 }} />
              <Typography variant="body1">
                <strong>Number of Travelers:</strong> {ticket.travelerNum}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <Sync sx={{ color: "#9c27b0", mr: 1 }} />
              <Typography variant="body1">
                <strong>Can Change Schedule:</strong>{" "}
                {ticket.isChangeSchedule ? "Yes" : "No"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <MonetizationOn sx={{ color: "#4caf50", mr: 1 }} />
              <Typography variant="body1">
                <strong>Refundable:</strong> {ticket.isRefund ? "Yes" : "No"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
