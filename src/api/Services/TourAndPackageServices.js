import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

// GET: tour/tours
export const getTours = async () => {
  try {
    const response = await apiClient.get(`/tour/tours`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: tour/detail/{id}
export const getTourDetail = async (id) => {
  try {
    const response = await apiClient.get(`/tour/detail/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: tour/create
export const createTourAndPackages = async (data) => {
  try {
    const response = await apiClient.post(`/tour/create`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: package/vouchers/{id}
export const getVoucher = async (id) => {
  try {
    const response = await apiClient.get(`/package/vouchers/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: package/VAT/{id}
export const getVAT = async (id) => {
  try {
    const response = await apiClient.get(`/package/VAT/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
