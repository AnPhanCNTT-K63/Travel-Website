import React from "react";
import { Grid, Container, Typography, Box, Paper } from "@mui/material";
import BlogPost from "./BlogPost";

const BlogPage = () => {
  // Sample blog post data
  const posts = [
    {
      id: 1,
      title: "Exploring the Mountains",
      datetime: "October 12, 2024",
      image: "/a1.jpeg",
      description:
        "Join us as we explore the breathtaking mountain landscapes and uncover hidden trails.",
    },
    {
      id: 2,
      title: "Cityscapes and Skylines",
      datetime: "November 4, 2024",
      image: "/a1.jpeg",
      description:
        "Discover the architectural wonders and dynamic energy of the world's most iconic cities.",
    },
    {
      id: 3,
      title: "A Journey Through Forests",
      datetime: "September 28, 2024",
      image: "/a1.jpeg",
      description:
        "Immerse yourself in the serenity and beauty of lush forests from around the globe.",
    },
    {
      id: 4,
      title: "Desert Adventures",
      datetime: "August 15, 2024",
      image: "/a1.jpeg",
      description:
        "Uncover the mysteries and unique beauty of expansive deserts and sandy landscapes.",
    },
    {
      id: 5,
      title: "Desert Adventures",
      datetime: "August 15, 2024",
      image: "/a1.jpeg",
      description:
        "Uncover the mysteries and unique beauty of expansive deserts and sandy landscapes.",
    },
    {
      id: 6,
      title: "Desert Adventures",
      datetime: "August 15, 2024",
      image: "/a1.jpeg",
      description:
        "Uncover the mysteries and unique beauty of expansive deserts and sandy landscapes.",
    },
    {
      id: 7,
      title: "Desert Adventures",
      datetime: "August 15, 2024",
      image: "/a1.jpeg",
      description:
        "Uncover the mysteries and unique beauty of expansive deserts and sandy landscapes.",
    },
  ];

  // Sample top-rated posts for the sidebar
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
      <Typography variant="h3" align="center" gutterBottom>
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
        {/* Main Blog Posts */}
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
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <BlogPost
                  title={post.title}
                  datetime={post.datetime}
                  image={post.image}
                  description={post.description}
                  hashtags={["adventure", "travel", "explore"]} // Example hashtags
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sidebar with Top Rated Posts */}
      </Grid>
    </Container>
  );
};

export default BlogPage;
