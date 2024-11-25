import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function TourCard({ item }) {
  return (
    <Card
      sx={{
        marginLeft: "100px",
        width: "100%",
        height: "100%",
        marginTop: "50px",
      }}
    >
      <CardMedia
        sx={{ height: "180px ", width: "100%", objectFit: "cover" }}
        image={`/${item.Image}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"></Typography>

        <Typography
          variant="body2"
          sx={{ height: 50, color: "text.secondary" }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <span style={{ fontWeight: "bold" }}>Price: {item.MinPrice}</span>
            <Box component="span" sx={{ ml: 1 }}>
              $
            </Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            5
            <StarIcon sx={{ color: "gold" }} />
            <StarIcon sx={{ color: "gold" }} />
            <StarIcon sx={{ color: "gold" }} />
            <StarHalfIcon sx={{ color: "gold" }} />
            <StarBorderIcon sx={{ color: "gold" }} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
