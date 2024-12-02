import React, { useEffect, useContext, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import { getTourByUserId } from "../../../api/Services/TourAndPackageServices";
import UserContext from "../../../UserContext";
import { Link } from "react-router-dom";

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user?.userId) {
      return;
    }
    const fetchTours = async () => {
      try {
        const res = await getTourByUserId(user.userId);
        setTours(res);
      } catch (error) {
        alert("can get tour");
      }
    };
    fetchTours();
  }, [user.userId]);

  const handleUpdate = (id) => {
    console.log(`Update tour with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete tour with ID: ${id}`);
  };

  const handleDetail = (id) => {
    console.log(`View details for tour with ID: ${id}`);
  };

  const parseImageNames = (imageNames) => {
    if (!imageNames) return [];
    return imageNames.split(",").map((name) => name.trim());
  };

  const getTourImage = (imageName, index = 0) => {
    const images = parseImageNames(imageName);
    if (images.length > index) {
      return `/${images[index]}`;
    }
    if (typeof imageName === "string") {
      return `/${imageName}`;
    }
    return "https://via.placeholder.com/300";
  };

  function formatDate(jsonDate) {
    const timestamp = parseInt(jsonDate.match(/\d+/)[0], 10);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Tours
      </Typography>

      <Grid container spacing={3}>
        {tours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.Id}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 4,
                },
              }}
            >
              {/* Tour Image */}
              <Link to={`/detail/${tour.Id}`}>
                <CardMedia
                  component="img"
                  height="180"
                  image={getTourImage(tour.Image, 0)}
                  alt={tour.Name}
                />
              </Link>
              {/* Tour Details */}
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {tour.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {tour.City}, {tour.Country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Region: {tour.Region || "N/A"}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  Created: {formatDate(tour.CreatedAt)}
                </Typography>
              </CardContent>

              {/* Action Buttons */}
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Link to={`/detail/${tour.Id}`}>
                  <Button
                    variant="outlined"
                    startIcon={<Info />}
                    onClick={() => handleDetail(tour.Id)}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Details
                  </Button>
                </Link>
                <Box>
                  <Link to={`/tour/update/${tour.Id}`}>
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(tour.Id)}
                    >
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(tour.Id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TourManagement;
