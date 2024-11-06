import axios from "axios";

const API_BASE_URL = "https://localhost:44331/api";

export const getTours = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tours`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

export const getTourDetail = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tourDetail/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour detail:", error);
    throw error;
  }
};

export const signup = async (user) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/signup`, user);
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const signin = async (user) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/signin`, user);
    return res.data;
  } catch (err) {
    console.log("Error When Fetching Api", err);
  }
};

export const addTour = async (tourData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tours`, tourData);
    return response.data;
  } catch (error) {
    console.error("Error adding tour:", error);
    throw error;
  }
};

export const updateTour = async (id, updatedTourData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tours/${id}`,
      updatedTourData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
};

export const deleteTour = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tours/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};
