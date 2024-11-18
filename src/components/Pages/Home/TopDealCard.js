import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TopDealCard({ item }) {
  return (
    <Card sx={{ maxWidth: 345, objectFit: "cover" }}>
      <CardMedia component="img" height="140" image={`/Tours/${item.Image}`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.Name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.Description}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
