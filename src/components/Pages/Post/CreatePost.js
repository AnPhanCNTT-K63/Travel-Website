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
import { createPost } from "../../../api/services";

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

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file.name); // Store the file
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !hashtags) {
      setError("Title, content, and hashtags are required.");
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
      Image: image, // Send the image file (you can handle it in backend or local storage)
    };

    console.log(postData);

    setLoading(true);

    try {
      // Assuming createPost handles image upload
      const post = await createPost(postData);
      console.log(post);

      setTitle("");
      setContent("");
      setHashtags("");
      setImage(null); // Reset image
      setImagePreview(null); // Reset image preview
      setError(null);
      alert("Post created successfully!");
    } catch (error) {
      setError(error.message);
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
