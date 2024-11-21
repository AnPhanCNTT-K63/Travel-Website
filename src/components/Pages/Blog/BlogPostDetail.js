import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Grid, Chip } from "@mui/material";
import { AccessTime, LocationOn, AccountCircle } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../../api/services";

const BlogPostDetail = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostDetai = async () => {
      try {
        const post = await getPostDetail(postId);
        setPost(post);
      } catch (err) {
        console.error("Error get post detail: ", err);
      }
    };
    fetchPostDetai();
  }, [postId]);

  const postHashtags =
    post.Hashtags && typeof post.Hashtags === "string"
      ? post.Hashtags.split(",")
      : [];

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      {/* Blog Post Title */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          fontSize: "2.5rem",
          lineHeight: 1.4,
        }}
      >
        {post.Title}
      </Typography>

      {/* Blog Post Image */}
      <Box
        sx={{
          width: "100%",
          height: "400px",
          backgroundImage: `url(/${post.Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      />

      {/* Post Metadata */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircle sx={{ marginRight: "0.5rem" }} />
          <Typography variant="body2">//Author</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTime sx={{ marginRight: "0.5rem" }} />
          <Typography variant="body2">{post.Datetime}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOn sx={{ marginRight: "0.5rem" }} />
          <Typography variant="body2">//location</Typography>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        {postHashtags.map((hashtag, index) => (
          <Chip
            key={index}
            label={`#${hashtag}`}
            sx={{
              margin: "0.25rem",
              backgroundColor: "#e0e0e0",
              color: "#333",
              fontWeight: "bold",
            }}
          />
        ))}
      </Box>

      {/* Blog Post Content */}
      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          {post.Content}
        </Typography>
      </Paper>

      {/* Post Hashtags */}
    </Container>
  );
};

export default BlogPostDetail;
