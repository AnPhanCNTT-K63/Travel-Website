import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

export default function TourCard({ item }) {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardMedia
        sx={{ height: "150px ", width: "100%", objectFit: "cover" }}
        image={`/${item.image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.price}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          5 <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
        </Typography>
      </CardActions>
    </Card>
  );
}
