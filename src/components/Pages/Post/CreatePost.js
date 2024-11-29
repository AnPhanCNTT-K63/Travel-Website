import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../UserContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { createPost } from "../../../api/Service/PostServices";
import Swal from "sweetalert2";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState(null); // Store image file
  const [imagePreview, setImagePreview] = useState(null); // Store image preview URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useContext(UserContext);
  const role = user.role;
  const user_id = user.userId;

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !hashtags) {
      setError("Title, content, and hashtags are required.");
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Title, content, and hashtags are required.",
        confirmButtonText: "OK",
      });
      return;
    }

    const hashtagsArray = hashtags
      .split(",")
      .map((hashtag) => hashtag.trim())
      .filter((hashtag) => hashtag)
      .join(",");

    const postData = {
      Title: title,
      Content: content,
      Hashtags: hashtagsArray,
      Owner: role,
      User_Id: user_id,
      Image: image,
    };

    setLoading(true);

    try {
      // Assuming createPost handles image upload
      const post = await createPost(postData);
      console.log(post);

      // Reset fields
      setTitle("");
      setContent("");
      setHashtags("");
      setImage(null); // Reset image
      setImagePreview(null); // Reset image preview
      setError(null);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Post Created",
        text: "Your post has been created successfully!",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setError(error.message);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Post Creation Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToProfile = () => {
    navigate(`/profile/${user.userId}/#posts`);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" align="center">
          Create Post
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Hashtags (comma separated)"
            variant="outlined"
            fullWidth
            required
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* File input for image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "1rem" }}
          />

          {/* Display image preview */}
          {imagePreview && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}

          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ width: "100%", padding: "10px" }}
            >
              {loading ? <CircularProgress size={24} /> : "Create Post"}
            </Button>
          </Box>
        </form>

        {/* Button to go to the profile page */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGoToProfile}
            sx={{ width: "100%", padding: "10px" }}
          >
            Manage Posts
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreatePost;
