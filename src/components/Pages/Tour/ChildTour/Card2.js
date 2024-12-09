import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams, useNavigate } from "react-router-dom";

export default function Card2({ item, packages, rating, reviews }) {
  const handleCardClick = () => {
    navigate(`/detail/${item.id}`); // Chuyển hướng đến trang DetailPage với `id`
  };

  const { tourId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpen = (pkg) => {
    setSelectedPackage(pkg);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  console.log(rating);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating > i) {
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
    <Card
      sx={{
        margin: "10px",
        maxWidth: "300px",
        boxShadow: 3,
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={`/${item.Image}`} // Hình ảnh từ API
        alt={item.Name} // Alt text cho SEO
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.Name}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <span style={{ fontWeight: "bold" }}>Price:</span>
            <Box component="span" sx={{ ml: 1 }}>
            {`Price: $${item.MinPrice}`}
            </Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            {renderStars()}
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
