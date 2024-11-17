import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Row, Col, Card, Button, Avatar, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import profilavatar from "../../../assets/images/face-1.jpg";
import convesionImg from "../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../assets/images/face-4.jpg";
import convesionImg3 from "../../../assets/images/face-5.jpeg";
import { getPosts, deletePost } from "../../../api/services";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, []);

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.common.black,
  }));

  const totalPages = Math.ceil(posts.length / postsPerPage); // Total pages based on posts

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handleDelete = async (postId) => {
    try {
      const data = await deletePost(postId);
      console.log(data);
      setPosts((prevPosts) => prevPosts.filter((post) => post.Id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
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
      <Row gutter={[24, 24]}>
        {currentPosts.map((post, index) => {
          const postHashtags =
            post.Hashtags && typeof post.Hashtags === "string"
              ? post.Hashtags.split(",")
              : [];

          return (
            <Col span={24} md={12} xl={6} key={post.Id}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                }}
                cover={
                  <img
                    alt={post.Title}
                    src={post.Image}
                    style={{
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <div
                  className="card-tag"
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  Your Post #{index + 1 + (currentPage - 1) * postsPerPage}
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
                        {hashtag}
                      </span>
                    ))}
                  </Typography>
                </Box>

                <Row
                  gutter={[6, 0]}
                  className="card-footer"
                  style={{ marginTop: 12 }}
                >
                  <Col span={12}>
                    <StyledLink to={`/post/${post.Id}`}>
                      <Button
                        type="primary"
                        ghost
                        style={{ width: "100%", fontWeight: "bold" }}
                      >
                        VIEW POST
                      </Button>
                    </StyledLink>
                  </Col>
                  <Col span={12}>
                    <StyledLink to={`/update/post/${[post.Id]}`}>
                      <Button
                        type="primary"
                        style={{ width: "100%", fontWeight: "bold" }}
                      >
                        UPDATE
                      </Button>
                    </StyledLink>
                  </Col>
                </Row>

                <Row
                  gutter={[6, 0]}
                  style={{ marginTop: 12, justifyContent: "space-between" }}
                >
                  <Col span={12}>
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>

                  <Col span={12}>
                    <Popconfirm
                      title="Are you sure you want to delete this post?"
                      onConfirm={() => handleDelete(post.Id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{
                          width: "100%",
                          fontWeight: "bold",
                          backgroundColor: "#ff4d4f",
                          color: "#fff",
                          borderColor: "#ff4d4f",
                        }}
                      >
                        DELETE
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>

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
