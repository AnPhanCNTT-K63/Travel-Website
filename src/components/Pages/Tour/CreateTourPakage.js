import React, { useState, useContext } from "react";
import UserContext from "../../../UserContext";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { createTourAndPackages } from "../../../api/services";

const CreateTourPackage = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const user_id = user.userId;

  const [tour, setTour] = useState(
    location.state?.tour || {
      Name: "",
      Region: "",
      Country: "",
      City: "",
      Image: "",
      Opening: "",
      Ending: "",
    }
  );

  const [tourPackages, setTourPackage] = useState([
    {
      name: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
      activity: "",
    },
  ]);

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleTourChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTours = [...tourPackages];
    updatedTours[index][name] = value;
    setTourPackage(updatedTours);
  };

  const addTour = () => {
    setTourPackage([
      ...tourPackages,
      {
        name: "",
        description: "",
        image: "",
        price: "",
        quantity: "",
        activity: "",
      },
    ]);
  };

  const removeTour = (index) => {
    const updatedTours = tourPackages.filter((_, i) => i !== index);
    setTourPackage(updatedTours);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { tour, tourPackages, user_id };
    console.log("Submitting:", data);
    const message = await createTourAndPackages(data);
    console.log(message);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Destination and tourPackages
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Destination Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Tour Details
          </Typography>
          <Grid container spacing={2}>
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
                  shrink: true,
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

        {/* Tours Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Tour Package
          </Typography>
          {tourPackages.map((tour, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                p: 2,
                mb: 3,
                position: "relative",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tour Name"
                    name="name"
                    value={tour.name}
                    onChange={(e) => handleTourChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={tour.description}
                    onChange={(e) => handleTourChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={tour.image}
                    onChange={(e) => handleTourChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={tour.price}
                    onChange={(e) => handleTourChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={tour.quantity}
                    onChange={(e) => handleTourChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Activity (comma-separated)"
                    name="activity"
                    value={tour.activity}
                    onChange={(e) => handleTourChange(index, e)}
                    required
                  />
                </Grid>
              </Grid>
              {tourPackages.length > 1 && (
                <IconButton
                  onClick={() => removeTour(index)}
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                  }}
                >
                  <RemoveCircleIcon color="error" />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={addTour}
            sx={{ mt: 2 }}
          >
            Add Another Tour
          </Button>
        </Paper>

        {/* Submit Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTourPackage;
