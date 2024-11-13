import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { Favorite, Share, ChatBubbleOutline } from "@mui/icons-material";

const PostCard = ({ title, datetime, image, content, hashtags }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%", // To ensure uniform height in grid layout
      }}
    >
      {/* User Avatar and Title Section */}
      <Box display="flex" alignItems="center" sx={{ p: 1, pb: 0 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#6c63ff",
            marginRight: 1,
          }}
          alt="Author Name"
          src="https://source.unsplash.com/random/100x100?person"
        />
        <Box flexGrow={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {datetime}
          </Typography>
        </Box>
      </Box>

      {/* Hashtags Section */}
      <Box sx={{ px: 1, py: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {hashtags.map((hashtag, index) => (
            <span key={index} style={{ marginRight: 4 }}>
              #{hashtag}
            </span>
          ))}
        </Typography>
      </Box>

      {/* Image Section */}
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: 230, // Adjusted for compactness
          objectFit: "cover",
        }}
      />

      {/* content Section */}
      <Box sx={{ px: 1, py: 0.5 }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {content}
        </Typography>
      </Box>

      {/* Icons (Chat, Like, Share) Section */}
      <Box display="flex" justifyContent="space-around" sx={{ p: 1 }}>
        <IconButton size="small" sx={{ color: "#1976d2" }}>
          <ChatBubbleOutline fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "#f50057" }}>
          <Favorite fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "#1976d2" }}>
          <Share fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostCard;
