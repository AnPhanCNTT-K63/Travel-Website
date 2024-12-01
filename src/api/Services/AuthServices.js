import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//POST: auth/signin
export const signin = async (user) => {
  try {
    const response = await apiClient.post(`/auth/signin`, user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: auth/signup
export const signup = async (user) => {
  try {
    const response = await apiClient.post(`/auth/signup`, user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: auth/signout
export const signout = async () => {
  try {
    const response = await apiClient.get(`/auth/signout`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: auth/password/check
export const passwordCheck = async (data) => {
  try {
    const response = await apiClient.post(`/auth/password/check`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
