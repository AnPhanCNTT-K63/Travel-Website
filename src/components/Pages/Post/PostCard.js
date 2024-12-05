import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton, Avatar, Button } from "@mui/material";
import {
  Favorite,
  Share,
  ChatBubbleOutline,
  AccessTime,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  const postTitle = post.Title || "Untitled Post";
  const postDatetime = post.Datetime || "No Date Provided";
  const postImage = `${distributionUrl}/Posts/${post.Image}` || "No Image";
  const postContent = post.Content || "No content available.";
  const postOwner = post.Owner || "";
  const postOwnerName = (
    <>
      {post.FirstName && post.LastName
        ? `${post.FirstName} ${post.LastName} `
        : "Unknown"}
      {postOwner === "admin" && (
        <span style={{ color: "red", fontWeight: "bold" }}>(Admin)</span>
      )}
    </>
  );

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
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "500px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
        },
      }}
    >
      {/* User Avatar and Title Section */}
      <Box display="flex" alignItems="center" sx={{ p: 2, pb: 1 }}>
        <Link
          style={{ textDecorationLine: "none" }}
          to={`/profile/${post.UserId}`}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#6c63ff",
              marginRight: 1.5,
            }}
            alt={postOwnerName}
            src={`/${post.Avatar}`}
          />
        </Link>
        <Box flexGrow={1}>
          {/* Post Author Name */}

          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "600",
            }}
          >
            <Link
              style={{ textDecorationLine: "none", textDecoration: "none" }}
              to={`/profile/${post.UserId}`}
            >
              {postOwnerName}
            </Link>
          </Typography>

          {/* Post Date */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <AccessTime sx={{ fontSize: "14px" }} />
            {postDatetime}
          </Typography>
        </Box>
      </Box>

      {/* Title and Hashtags Section */}
      <Box sx={{ px: 2, py: 1 }}>
        <StyledLink to={`/post/${post.Id}`}>
          <Typography variant="h6" sx={{ fontWeight: "700", marginBottom: 1 }}>
            {postTitle}
          </Typography>
        </StyledLink>
        <Typography variant="caption" color="text.secondary">
          {postHashtags.map((hashtag, index) => (
            <span key={index} style={{ marginRight: 8 }}>
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
            height: 240, // Adjusted for compactness
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </StyledLink>

      {/* Content Section */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2, // Show up to 2 lines of content
          }}
        >
          {postContent}
        </Typography>
        <StyledLink to={`/post/${post.Id}`}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginTop: 1,
              color: "#1976d2",
              borderColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            }}
          >
            Read More...
          </Button>
        </StyledLink>
      </Box>

      {/* Icons Section (Chat, Like, Share) */}
      <Box display="flex" justifyContent="space-around" sx={{ p: 2, pt: 1 }}>
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
