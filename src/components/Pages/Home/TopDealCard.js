import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function TopDealCard({ item }) {
  return (
    <Card sx={{ maxWidth: 345, objectFit: "cover" }}>
      <Link to={`/detail/${item.Id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="140"
          image={`${distributionUrl}/Tours/${item.Image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.Name}
            <Badge
              badgeContent={`-${Math.round(Math.random() * 100)}%`}
              color="primary"
              style={{ marginLeft: "20px" }}
            />
          </Typography>

          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} style={{ color: "gold" }} />
          ))}
          {/* <Typography
          variant="body2"
          color="gold"
          component="span"
          fontWeight={"bold"}
        >
          {starRating ? starRating : "5"}

        </Typography> */}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.Description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions></CardActions>
    </Card>
  );
}
