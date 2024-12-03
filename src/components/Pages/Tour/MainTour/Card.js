import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TourCard({ item }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "12px", // Bo góc
        overflow: "hidden", // Giới hạn phần tử bên trong
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng
        transition: "transform 0.3s", // Hiệu ứng khi hover
        "&:hover": {
          transform: "scale(1.05)", // Phóng to khi hover
        },
      }}
    >
      {/* Hình ảnh */}
      <CardMedia
        component="img"
        image={`/${item.Image}`} // Hình ảnh từ API
        alt={item.Name} // Alt text cho SEO
        sx={{
          height: "230px", // Chiều cao ảnh
          objectFit: "cover", // Ảnh vừa khung mà không bị méo
        }}
      />
      {/* Nội dung */}
      <CardContent
        sx={{
          padding: "16px",
        }}
      >
        {/* Tên tour */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          {item.Name}
        </Typography>

        {/* Giá tour */}
        <Box
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontWeight: "bold",
            fontSize: "1rem",
            color:"rgb(249,115,11)",
          }}
        >
          {`Price: $${item.MinPrice}`}
        </Box>
      </CardContent>
    </Card>
  );
}
