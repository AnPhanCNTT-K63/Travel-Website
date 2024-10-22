import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

export default function MediaCard({ title, content, price, source }) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia
        sx={{ height: 140, width: "100%", objectFit: "cover" }}
        image={source}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          5 <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
        </Typography>
      </CardActions>
    </Card>
  );
}
