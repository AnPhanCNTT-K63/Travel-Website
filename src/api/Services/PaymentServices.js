import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

//GET: payment/card/{userId}
export const getPaymentCard = async (userId) => {
  try {
    const response = await apiClient.get(`/payment/card/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: payment/create/info
export const createPaymentInfo = async (info) => {
  try {
    const response = await apiClient.post(`/payment/create/info`, {
      info: info,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: payment/update/status
export const setPaymentStatus = async (data) => {
  try {
    const response = await apiClient.patch(`/payment/update/status`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: payment/statistics/{year}
export const getPaymentStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/payment/statistics/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: payment/statistics/revenue/{year}
export const getRevenueStatistics = async (year) => {
  try {
    const response = await apiClient.get(`/payment/statistics/revenue/${year}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
