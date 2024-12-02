import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

// GET: tour/tours/{page}/{pageSize}
export const getTours = async (page, pageSize) => {
  try {
    const response = await apiClient.get(`/tour/tours/${page}/${pageSize}`);
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

//PUT: tour/update
export const updateTourAndPackages = async (data) => {
  try {
    const response = await apiClient.put(`/tour/update`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: tour/delete/soft
export const deleteSoftTour = async (id) => {
  try {
    const response = await apiClient.patch(`/tour/delete/soft`, { id: id });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: tour/get/deleted
export const getDeletedTour = async () => {
  try {
    const response = await apiClient.get(`/tour/get/deleted`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//DELETE: tour/delete/permanently/{id}
export const deletePermanentlyTour = async (id) => {
  try {
    const response = await apiClient.delete(`/tour/delete/permanently/${id}`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: tour/restore
export const restoreTour = async (id) => {
  try {
    const response = await apiClient.patch(`/tour/restore`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
