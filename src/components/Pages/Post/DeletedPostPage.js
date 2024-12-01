import React, { useState, useEffect, useContext } from "react";
import { Container, Typography, Box, Button, Paper, Grid } from "@mui/material";
import { DeleteForever, Restore } from "@mui/icons-material";
import {
  getDeletedPost,
  deletePost,
  restorePost,
} from "../../../api/Services/PostServices";
import UserContext from "../../../UserContext";
import DeletedPostCard from "./DeletedPostCard";

const DeletedPostsPage = () => {
  const [deletedPosts, setDeletedPosts] = useState([]);
  const user = useContext(UserContext);
  const id = user.userId;
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchDeletedPosts = async () => {
      try {
        const posts = await getDeletedPost(id);
        console.log(posts);
        setDeletedPosts(posts);
      } catch (err) {
        alert("Can't get");
      }
    };

    fetchDeletedPosts();
  }, [id]);

  // Handle permanent deletion
  const handleDeleteForever = async (postId) => {
    try {
      await deletePost(postId);
      setDeletedPosts(deletedPosts.filter((post) => post.Id !== postId));
    } catch (err) {
      console.error("Error deleting post forever:", err);
      alert("Failed to delete post.");
    }
  };

  const handleStorePost = async (postId) => {
    try {
      await restorePost(postId);
      setDeletedPosts(deletedPosts.filter((post) => post.Id !== postId));
    } catch (err) {
      console.error("Error deleting post forever:", err);
      alert("Failed to restore post.");
    }
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
              <DeletedPostCard
                post={post}
                handleDeleteForever={handleDeleteForever}
                handleStorePost={handleStorePost}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DeletedPostsPage;
