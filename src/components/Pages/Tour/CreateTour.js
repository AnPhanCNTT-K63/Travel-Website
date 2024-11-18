import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateTour = () => {
  const [tour, setTour] = useState({
    Name: "",
    Region: "",
    Country: "",
    City: "",
    Image: "",
    Opening: "",
    Ending: "",
  });

  const navigate = useNavigate();

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleCreateNew = () => {
    navigate("/createTourPackage", { state: { tour } });
  };

  const handleManageTour = () => {
    navigate("/profile");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Tour
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Tour Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="Name"
              value={tour.Name}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Region"
              name="Region"
              value={tour.Region}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              name="Country"
              value={tour.Country}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              name="City"
              value={tour.City}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Image URL"
              name="Image"
              value={tour.Image}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="time"
              label="Tour Opening Time"
              name="Opening"
              value={tour.Opening}
              InputLabelProps={{
                shrink: true, // Ensures the label remains visible
              }}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="time"
              label="Tour Ending Time"
              name="Ending"
              value={tour.Ending}
              InputLabelProps={{
                shrink: true, // Ensures the label remains visible
              }}
              onChange={handleDestinationChange}
              required
            />
          </Grid>
        </Grid>
      </Paper>
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateNew}
          sx={{ mr: 2 }}
        >
          Create New
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={handleManageTour}
        >
          Manage Tour
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTour;
