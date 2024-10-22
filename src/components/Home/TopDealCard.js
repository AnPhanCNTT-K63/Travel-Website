import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TopDealCard({ title, content, source }) {
  return (
    <Card sx={{ maxWidth: 345, objectFit: "cover" }}>
      <CardMedia component="img" height="140" image={source} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
