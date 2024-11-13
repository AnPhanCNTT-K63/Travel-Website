import React, { useState } from "react";
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
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");

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
      Hashtags: hashtagsArray.toString(),
      Owner: role,
      User_Id: user_id,
      Image: image,
    };
    console.log(postData);

    setLoading(true);

    try {
      const post = await createPost(postData);
      console.log(post);

      setTitle("");
      setContent("");
      setHashtags("");
      setImage(null);
      setError(null);
      alert("Post created successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0].name)}
            style={{ marginBottom: "1rem" }}
          />
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
      </Box>
    </Container>
  );
};

export default CreatePost;
