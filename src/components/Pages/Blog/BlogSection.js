import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import PostCard from "../Post/PostCard";
import { getPosts } from "../../../api/Services/PostServices";

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  console.log(posts);

  const topRatedPosts = [
    {
      id: 1,
      title: "Mountain Adventures",
      image: "https://source.unsplash.com/random/300x200?mountain",
    },
    {
      id: 2,
      title: "Urban Exploration",
      image: "https://source.unsplash.com/random/300x200?city",
    },
    {
      id: 3,
      title: "Serenity in the Forest",
      image: "https://source.unsplash.com/random/300x200?forest",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        color="text.secondary"
      >
        Our Latest Blog Posts
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Explore our collection of travel stories, guides, and photo journeys
        from around the world.
      </Typography>

      {/* Main Content and Sidebar Grid */}
      <Grid container spacing={4}>
        {/* Sidebar: Top Rated Posts */}
        <Grid item xs={12} md={2}>
          <Paper sx={{ padding: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Top Rated Posts
            </Typography>
            <Grid container spacing={2}>
              {topRatedPosts.map((post) => (
                <Grid item key={post.id} xs={12}>
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={post.image}
                      alt={post.title}
                      sx={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "1rem",
                      }}
                    />
                    <Typography variant="body2">{post.title}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Main Blog Posts */}
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {loading ? ( // Show loading spinner while data is being fetched
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  py: 4,
                }}
              >
                <CircularProgress />
              </Box>
            ) : posts.length === 0 ? ( // Show message if no posts are available
              <Typography
                variant="h6"
                color="text.secondary"
                align="center"
                sx={{ width: "100%", py: 4 }}
              >
                No blog posts available at the moment.
              </Typography>
            ) : (
              posts.map((post) => (
                <Grid item key={post.Id} xs={12} sm={6} md={4}>
                  <PostCard post={post} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogSection;
