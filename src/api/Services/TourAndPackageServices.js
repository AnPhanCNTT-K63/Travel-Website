import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

// GET: tour/tours
export const getTours = async (page = 1, pageSize = 9) => {
  try {
    const response = await apiClient.get(`/tour/tours/${page}/${pageSize}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTourPackages = async () => {
  try {
    const response = await apiClient.get(`/package/packages`);
    return response.data; 
  } catch (error) {
    handleApiError(error); 
  }
};


export const getTourPackagesById = async (id) => {
  try {
    const response = await apiClient.get(`/package/tour/${id}`);
    return response.data; 
  } catch (error) {
    handleApiError(error); 
  }
};

//GET: tour/stars/{tour_id}
export const getTourStars = async (id) => {
  try {
    const response = await apiClient.get(`/tour/stars/${id}`);
    return response.data; 
  } catch (error) {
    handleApiError(error); 
  }
};

//GET: tour/review/{tour_id}
export const getReviews = async (id) => {
  try {
    const response = await apiClient.get(`tour/review/${id}`);
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

//GET: /tour/user/{user_id}
export const getTourByUserId = async (user_id) => {
  try {
    const response = await apiClient.get(`/tour/user/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: tour/package/{tour_id}
export const getPackageByTourId = async (tour_id) => {
  try {
    const response = await apiClient.get(`/tour/package/${tour_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: tour/package/count/{tour_id}
export const countPackageInTour = async (tour_id) => {
  try {
    const response = await apiClient.get(`/tour/package/count/${tour_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
