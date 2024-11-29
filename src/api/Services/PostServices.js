import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//GET: /post/posts
export const getPosts = async () => {
  try {
    const response = await apiClient.get(`/post/posts`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: /post/detail{id}
export const getPostDetail = async (id) => {
  try {
    const response = await apiClient.get(`/post/detail/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: /post/user/{user_id}
export const getPostByUserId = async (user_id) => {
  try {
    const response = await apiClient.get(`/post/user/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: /post/create
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post(`/post/create`, postData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PUT: post/update/{id}
export const updatePost = async (postData, id) => {
  try {
    const response = await apiClient.put(`/post/update/${id}`, postData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//DELETE: post/delete/{id}
export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/post/delete/${id}`, id);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
