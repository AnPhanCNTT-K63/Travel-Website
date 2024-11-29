import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Paper, Grid } from "@mui/material";
import { DeleteForever, Restore } from "@mui/icons-material";

const DeletedPostsPage = () => {
  const [deletedPosts, setDeletedPosts] = useState([]);

  // Fetch deleted posts
  //   useEffect(() => {
  //     const fetchDeletedPosts = async () => {
  //       try {
  //         const posts = await getDeletedPosts();
  //         setDeletedPosts(posts);
  //       } catch (err) {
  //         console.error("Error fetching deleted posts:", err);
  //       }
  //     };

  //     fetchDeletedPosts();
  //   }, []);

  // Handle permanent deletion
  const handleDeleteForever = async (postId) => {
    // if (window.confirm("Are you sure you want to delete this post forever?")) {
    //   try {
    //     await deletePostForever(postId);
    //     setDeletedPosts(deletedPosts.filter((post) => post.Id !== postId));
    //     alert("Post deleted forever.");
    //   } catch (err) {
    //     console.error("Error deleting post forever:", err);
    //     alert("Failed to delete post.");
    //   }
    // }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333", marginBottom: "2rem" }}
      >
        Deleted Posts
      </Typography>

      {deletedPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No deleted posts found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {deletedPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.Id}>
              <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
                {/* Post Title */}
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  {post.Title || "Untitled Post"}
                </Typography>

                {/* Post Content */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    marginBottom: "1rem",
                  }}
                >
                  {post.Content || "No content available."}
                </Typography>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteForever />}
                    onClick={() => handleDeleteForever(post.Id)}
                  >
                    Delete Forever
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DeletedPostsPage;
