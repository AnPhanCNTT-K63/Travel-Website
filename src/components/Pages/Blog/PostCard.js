import React from "react";
import { styled } from "@mui/material/styles";

import { Box, Typography, IconButton, Avatar } from "@mui/material";
import {
  Favorite,
  Share,
  ChatBubbleOutline,
  AccessTime,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  // Ensure hashtags are properly split
  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  // Fallback for missing or undefined post data
  const postTitle = post.Title || "Untitled Post";
  const postDatetime = post.Datetime || "No Date Provided";
  const postImage = post.Image || "https://example.com/default-image.jpg";
  const postContent = post.Content || "No content available.";
  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.black,
  }));
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
            <StyledLink to={`/post/${post.Id}`}>{postTitle}</StyledLink>
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {postDatetime}
            <AccessTime sx={{ marginLeft: "10px" }} />
          </Typography>
        </Box>
      </Box>

      {/* Hashtags Section */}
      <Box sx={{ px: 1, py: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {postHashtags.map((hashtag, index) => (
            <span key={index} style={{ marginRight: 4 }}>
              #{hashtag}
            </span>
          ))}
        </Typography>
      </Box>

      {/* Image Section */}
      <StyledLink to={`/post/${post.Id}`}>
        <Box
          component="img"
          src={postImage}
          alt={postTitle}
          sx={{
            width: "100%",
            height: 230, // Adjusted for compactness
            objectFit: "cover",
          }}
        />
      </StyledLink>

      {/* Content Section */}
      <Box sx={{ px: 1, py: 0.5 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
          }}
        >
          {postContent}
        </Typography>
        <StyledLink to={`/post/${post.Id}`}>
          <Button variant="text">Read More...</Button>
        </StyledLink>
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
