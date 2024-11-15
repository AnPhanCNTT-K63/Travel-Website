import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import SlideAsiaTour from "../../Slideshow/SlideAsiaTour";

export default function AsiaTour({ item }) {
  return (
    <>
    <SlideAsiaTour/>
    <div>Asia</div>

        {/* <Card sx={{ marginLeft: "100px", width: "100%", height: "100%" }}>
        <CardMedia
            sx={{ height: "200px", width: "100%", objectFit: "cover" }}
            image={`/${item.image}`}
            title="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item.name}
            </Typography>
            <Typography variant="body2" sx={{ height: 50, color: "text.secondary" }}>
            {item.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Box sx={{ width: "100%" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <span style={{ fontWeight: 'bold' }}>Price:</span>
                <Box component="span" sx={{ ml: 1 }}>
                {item.price}$
                </Box>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                5
                <StarIcon sx={{ color: "gold" }} />
                <StarIcon sx={{ color: "gold" }} />
                <StarIcon sx={{ color: "gold" }} />
                <StarIcon />
                <StarIcon />
            </Box>
            </Box>
        </CardActions>
        </Card> */}
    </>
  );
}
