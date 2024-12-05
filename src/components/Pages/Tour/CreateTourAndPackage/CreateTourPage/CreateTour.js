import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, Paper } from "@mui/material";
import { sendImage } from "../../../../../api/Services/CloudServices";

export default function CreateTour({ getTour, defaultTour }) {
  const formatTime = (time) => {
    if (!time || time.Hours == null || time.Minutes == null) return "";
    const hours = time.Hours.toString().padStart(2, "0");
    const minutes = time.Minutes.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [tour, setTour] = useState(
    defaultTour
      ? {
          ...defaultTour,
          Opening: formatTime(defaultTour.Opening),
          Ending: formatTime(defaultTour.Ending),
        }
      : {
          Name: "",
          Region: "",
          Country: "",
          City: "",
          Image: "",
          Opening: "",
          Ending: "",
          imageUpload: "",
        }
  );

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    getTour(tour);
  }, [tour, getTour]);

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);

    const fileNames = files.map((file) => file.name);
    setTour((prev) => ({
      ...prev,
      imageUpload: e.target.files[0],
      Image: prev.Image
        ? `${prev.Image}, ${fileNames.join(", ")}`
        : fileNames.join(", "),
    }));
  };

  return (
    <>
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
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Upload Images
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: "block", marginBottom: "10px" }}
            />
            <Typography variant="body2" color="textSecondary">
              Uploaded Images: {tour.Image}
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
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
    </>
  );
}
