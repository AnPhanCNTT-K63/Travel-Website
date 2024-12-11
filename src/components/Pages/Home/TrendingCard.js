import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function TrendingCard({ item }) {
  const styles = {
    card: {
      maxWidth: 345,
      margin: "10px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    },
    cardMedia: {
      height: 140,
      objectFit: "cover",
      width: "100%",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    cardContent: {
      padding: "16px",
      fontFamily: "'Roboto', sans-serif",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "8px",
    },
    cardDetails: {
      color: "#666",
      fontSize: "14px",
      lineHeight: 1.5,
    },
    starIcon: {
      color: "gold",
    },
    price: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#d32f2f",
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px 16px",
    },
    button: {
      color: "#1976d2",
      fontSize: "14px",
      textTransform: "none",
      transition: "color 0.3s ease",
    },
    buttonHover: {
      color: "#0d47a1",
    },
  };

  const { Name: title, Image: img, Price: price, starRating, ratings, available } = item;

  return (
    <Card
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style = { ...styles.card, ...styles.cardHover })}
      onMouseLeave={(e) => (e.currentTarget.style = styles.card)}
    >
      <CardMedia
        style={styles.cardMedia}
        image={`${distributionUrl}/Packages/${img}`}
        title={title}
      />
      <CardContent style={styles.cardContent}>
        <Typography style={styles.cardTitle}>{title}</Typography>
        <Typography style={styles.cardDetails}>
          <Typography component="span">
            {available ? "Available for booking" : "Sold out"}
          </Typography>
          <br />
          <StarIcon style={styles.starIcon} /> {/* Icon màu vàng */}
          <span>{starRating ? starRating : "0"}</span> ({ratings || 0})
          <br />
          <Typography style={styles.price}>
            Giá: {price ? `${price} VND` : "contact us for more detail"}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions style={styles.cardActions}>
        <Button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.color = styles.buttonHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.button.color)}
        >
          Share
        </Button>
        <Button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.color = styles.buttonHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.button.color)}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}
