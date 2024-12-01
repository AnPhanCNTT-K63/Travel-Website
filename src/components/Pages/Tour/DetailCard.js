import * as React from "react";
import { Button, Box, Typography, Divider, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailCard({ item }) {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const onClickHandle = () => {
    navigate(`/booking/${tourId}`);
  };

  // Hàm render các sao
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
      } else if (rating > i && rating < i + 1) {
        stars.push(<StarHalfIcon key={i} sx={{ color: "gold" }} />);
      } else {
        stars.push(<StarBorderIcon key={i} sx={{ color: "gold" }} />);
      }
    }
    return stars;
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1080px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Hình ảnh lớn ở trên */}
      <Box
        component="img"npm 
        src={item?.image || "Tours/a1.jpeg"}
        alt={item?.title}
        sx={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
        }}
      />

      {/* Nội dung chi tiết */}
      <Box sx={{ padding: 3 }}>
        {/* Tên và mô tả */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#2c3e50", marginBottom: 2 }}
        >
          {item?.title || "Tour Name"}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#34495e", marginBottom: 3, lineHeight: 1.8 }}
        >
          {item?.description || "Description not available."}
        </Typography>

        {/* Đánh giá sao */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 3 }}>
          {renderStars(item?.rating || 0)}
          <Typography sx={{ fontWeight: "bold", color: "#555" }}>
            {item?.rating || "0.0"} / 5.0
          </Typography>
        </Stack>

        <Divider />

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#27ae60", marginBottom: 1 }}
            >
              ${item?.price || "0.00"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#95a5a6" }}>
              Giá đã bao gồm thuế và phí
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={onClickHandle}
            sx={{
              backgroundColor: "#3498db",
              color: "#fff",
              "&:hover": { backgroundColor: "#2980b9" },
            }}
          >
            Đặt ngay
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
