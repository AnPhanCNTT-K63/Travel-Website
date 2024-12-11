import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PriceChange } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

// export default function TrendingCard({ title, img, price, starRating, ratings, available }) {
export default function TrendingCard({ item }) {
  var title = item.Name,
    img = item.Image,
    price = item.Price,
    starRating,
    ratings,
    available;
  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardMedia
        sx={{ height: 140, objectFit: "cover", width: "300px" }}
        image={`${distributionUrl}/Packages/${item.Image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontWeight={"bold"}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <Typography variant="body2" color="text.secondary">
            {" "}
            ({available ? "Available for booking" : "Sold out"})
          </Typography>
          <StarIcon style={{ color: "gold" }} /> {/* Icon màu vàng */}
          <Typography
            variant="body2"
            color="gold"
            component="span"
            fontWeight={"bold"}
          >
            {starRating ? starRating : "0"}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">
            {" "}
            ({ratings ? ratings : 0})
          </Typography>
          <br />
          Giá: {price ? `${price} VND` : "contact us for more detail"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}
