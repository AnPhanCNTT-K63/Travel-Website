import React, { useEffect, useState, useRef, useContext } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Card, Button, Avatar } from "antd";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Link } from "react-router-dom";
import { getPostByUserId } from "../../../api/Services/PostServices";
import UserContext from "../../../UserContext";
import { deleteSoftPost } from "../../../api/Services/PostServices";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Adjust the number of posts per page
  const containerRef = useRef(null); // Ref for the scrollable container
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostByUserId(user.userId);
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected an array but got:", data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    };
    if (user?.userId) {
      fetchPost();
    }
  }, [user]);

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.black,
  }));

  const handleDelete = async (postId) => {
    try {
      const res = await deleteSoftPost(postId);
      if (res.message === "Success") {
        Swal.fire({
          icon: "success",
          title: "Delete Successful",
          text: "You can see the deleted post in the trash can and permanently delete it.",
          confirmButtonText: "OK",
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post.Id !== postId));
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Unable to delete the post.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post.",
        confirmButtonText: "OK",
      });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    scrollToTop(); // Reset position to the top
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop(); // Reset position to the top
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      }}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h6 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Posts</h6>
            <p style={{ color: "#888" }}>Your Posts on the Blog Page</p>
          </div>
          <Link to="/create/post">
            <Button type="primary" size="large" style={{ fontWeight: "bold" }}>
              Add New Post
            </Button>
          </Link>
        </div>
      }
    >
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          padding: 2,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: 4,
          },
        }}
      >
        {currentPosts.map((post, index) => {
          const postHashtags =
            post.Hashtags && typeof post.Hashtags === "string"
              ? post.Hashtags.split(",")
              : [];

          return (
            <Card
              key={post.Id}
              bordered={false}
              style={{
                minWidth: "300px",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={
                <img
                  alt={post.Title}
                  src={`/${post.Image}`}
                  style={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              }
            >
              <div style={{ fontWeight: "bold", color: "#555" }}>
                Post #{index + 1 + (currentPage - 1) * postsPerPage}
              </div>
              <Typography
                sx={{
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                <StyledLink to={`/post/${post.Id}`}>{post.Title}</StyledLink>
              </Typography>
              <Box sx={{ px: 1, py: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {postHashtags.map((hashtag, index) => (
                    <span key={index} style={{ marginRight: 4 }}>
                      #{hashtag}
                    </span>
                  ))}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <StyledLink to={`/update/post/${[post.Id]}`}>
                  <Button type="primary" style={{ fontWeight: "bold" }}>
                    UPDATE
                  </Button>
                </StyledLink>
                <Button
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This post will be moved to the trash can.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(post.Id);
                      }
                    })
                  }
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#ff4d4f",
                    color: "#fff",
                    borderColor: "#ff4d4f",
                  }}
                >
                  DELETE
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* Pagination Controls */}
      <Box textAlign="center" mt={4}>
        <Button
          type="secondary"
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ fontWeight: "bold", marginRight: "1rem" }}
        >
          Previous
        </Button>
        <span style={{ fontWeight: "bold" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{ fontWeight: "bold", marginLeft: "1rem" }}
        >
          Next
        </Button>
      </Box>
    </Card>
  );
}
