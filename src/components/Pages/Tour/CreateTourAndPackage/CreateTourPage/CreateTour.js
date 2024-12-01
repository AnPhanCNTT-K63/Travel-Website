import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, Paper } from "@mui/material";

export default function CreateTour({ getTour, defaultTour, uploadImage }) {
  const [tour, setTour] = useState(
    defaultTour || {
      Name: "",
      Region: "",
      Country: "",
      City: "",
      Image: "",
      Opening: "",
      Ending: "",
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

    // Generate local previews for the selected images
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);

    // Extract file names and update the Image field
    const fileNames = files.map((file) => file.name);
    setTour((prev) => ({
      ...prev,
      Image: prev.Image
        ? `${prev.Image}, ${fileNames.join(", ")}`
        : fileNames.join(", "),
    }));

    // Uncomment this block if you also want to upload the images to a server
    // try {
    //   const uploadedUrls = await Promise.all(
    //     files.map((file) => uploadImage(file))
    //   );
    //   setTour((prev) => ({
    //     ...prev,
    //     Image: prev.Image
    //       ? `${prev.Image}, ${uploadedUrls.join(", ")}`
    //       : uploadedUrls.join(", "),
    //   }));
    // } catch (error) {
    //   console.error("Image upload failed", error);
    // }
  };

  return (
    <>
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
