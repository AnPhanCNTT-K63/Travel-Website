import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Card2 = ({ item }) => {
  const { title, description, image, price, rating } = item;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
      } else if (rating > i && rating < i + 1) {
        stars.push(<StarHalfIcon key={i} sx={{ color: "gold" }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "gold" }} />);
      }
    }
    return stars;
  };

  return (
    <Card sx={{ margin: "10px", maxWidth: "300px", boxShadow: 3 }}>
      <CardMedia
        sx={{ height: "180px", objectFit: "cover" }}
        image={image || "https://via.placeholder.com/300"}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title || "Default Title"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description || "Default description goes here."}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <span style={{ fontWeight: "bold" }}>Price:</span>
            <Box component="span" sx={{ ml: 1 }}>
              ${price || "0.00"}
            </Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {renderStars()}
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Card2;
