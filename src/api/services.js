import axios from "axios";

const API_URL = "https://localhost:44331";

axios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage");
    }
    console.log("Authorization header:", config.headers["Authorization"]);
    return config;
  },
  (error) => Promise.reject(error)
);

export const heartBeat = async (user_id) => {
  try {
    const response = await axios.post(`${API_URL}/User/heartBeat`, {
      userId: user_id,
    }); // POST: /User/heartBeat
    console.log("a");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getTours = async () => {
  try {
    const response = await axios.get(`${API_URL}/Tour/tours`); // GET: /Tour/tours
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

export const getTourDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/Tour/detail/tour/${id}`); //GET: /Tour/detail/tour/{id}
    return response.data;
  } catch (error) {
    console.error("Error fetching tour detail:", error);
    throw error;
  }
};

export const createTourAndPackages = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/Tour/create/tourAndPackages`,
      data
    ); //POST: /Tour/create/tourAndPackages
    return response.data;
  } catch (error) {
    console.error("Error adding tour:", error);
    throw error;
  }
};

export const signup = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/Auth/signup`, user); //POST: /Auth/signup
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const signout = async () => {
  try {
    const res = await axios.get(`${API_URL}/Auth/signout`); //POST: /Auth/signout
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const signin = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/Auth/signin`, user); //POST: /Auth/signin
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const getPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/Post/posts`); //GET: /Post/posts
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const getPostDetail = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/Post/detail/post/${id}`); //GET: /Post/detail/post/{id}
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const getPostByUserId = async (user_id) => {
  try {
    const res = await axios.get(`${API_URL}/Post/findByUserId/post/${user_id}`); //GET: /Post/findByUserId/post
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const createPost = async (postData) => {
  try {
    const res = await axios.post(`${API_URL}/Post/create/post`, postData); //POST: /Post/create/post
    return res.data;
  } catch (error) {
    console.error("Error creating post: ", error);
    throw error;
  }
};

export const updatePost = async (postData, id) => {
  try {
    const res = await axios.put(`${API_URL}/Post/update/post/${id}`, postData); //PUT: /Post/update/post/{id}
    return res.data;
  } catch (error) {
    console.error("Error updating post: ", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/Post/delete/post/${id}`, id); //DELETE: /Post/delete/post/{id}
    return res.data;
  } catch (error) {
    console.error("Error Deleting post: ", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/User/users`); //GET: /User/users
    return res.data;
  } catch (error) {
    console.error("Error Get users: ", error);
    throw error;
  }
};

export const updateTour = async (id, updatedTourData) => {
  try {
    const response = await axios.put(`${API_URL}/tours/${id}`, updatedTourData);
    return response.data;
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
};

export const deleteTour = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tours/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};
