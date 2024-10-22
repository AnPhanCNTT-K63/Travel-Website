import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TrendingCard({ title, img }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardMedia
        sx={{ height: 140, objectFit: "cover", width: "300px" }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}
