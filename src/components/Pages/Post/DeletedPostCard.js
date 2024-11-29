import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton, Avatar, Button } from "@mui/material";
import { DeleteForever, AccessTime } from "@mui/icons-material";

const DeletedPostCard = ({ post, onDeleteForever }) => {
  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  const postTitle = post.Title || "Untitled Post";
  const postDatetime = post.Datetime || "No Date Provided";
  const postImage = post.Image || "https://example.com/default-image.jpg";
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
            {postOwnerName}
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
        <Typography variant="h6" sx={{ fontWeight: "700", marginBottom: 1 }}>
          {postTitle}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {postHashtags.map((hashtag, index) => (
            <span key={index} style={{ marginRight: 8 }}>
              #{hashtag}
            </span>
          ))}
        </Typography>
      </Box>

      {/* Image Section */}
      <Box
        component="img"
        src={postImage}
        alt={postTitle}
        sx={{
          width: "100%",
          height: 240,
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

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
      </Box>

      {/* Action Section */}
      <Box display="flex" justifyContent="space-around" sx={{ p: 2, pt: 1 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteForever />}
          onClick={() => onDeleteForever(post.Id)}
          sx={{
            borderColor: "red",
            "&:hover": {
              backgroundColor: "red",
              color: "#fff",
            },
          }}
        >
          Delete Forever
        </Button>
      </Box>
    </Box>
  );
};

export default DeletedPostCard;
