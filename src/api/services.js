import apiClient from "./AxiosConfiguration";
import handleApiError from "./ErrorHandlle";

//POST: user/ping
export const heartBeat = async (user_id) => {
  try {
    const response = await apiClient.post(`/user/ping`, {
      userId: user_id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET: /tour/tours
export const getTours = async (page = 1, pageSize = 9) => {
  try {
    const response = await apiClient.get(`/tour/tours/${page}/${pageSize}`, {
      params: {
        page: page,
        pageSize: pageSize,
      }
    });
    return response.data;  // Trả về dữ liệu bao gồm tours, totalTours và totalPages
  } catch (error) {
    handleApiError(error);
  }
};

//GET: /package/packages
export const getTourPackages = async () => {
  try {
    const response = await apiClient.get(`/package/packages`);
    return response.data; 
  } catch (error) {
    handleApiError(error); 
  }
};

//GET: /tour/detail/{id}
export const getTourDetail = async (id) => {
  try {
    const response = await apiClient.get(`/tour/detail/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: /tour/create
export const createTourAndPackages = async (data) => {
  try {
    const response = await apiClient.post(`/tour/create`, data);
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

//POST: auth/signin
export const signin = async (user) => {
  try {
    const response = await apiClient.post(`/auth/signin`, user);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

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

//GET: user/users
export const getUsers = async () => {
  try {
    const response = await apiClient.get(`/user/users`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/profile/{user_id}
export const getProfile = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/profile/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/account/{user_id}
export const getAccountInfo = async (user_id) => {
  try {
    const response = await apiClient.get(`/user/account/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PUT: user/update/account
export const updateAccount = async (user) => {
  try {
    const response = await apiClient.put(`/user/update/account`, {
      userInfo: user,
    });
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

//DELETE: user/delete/account/soft/{user_id}
export const deleteAccount = async (user_Id) => {
  try {
    const response = await apiClient.delete(
      `/user/delete/account/soft/${user_Id}`,
      {
        user_id: user_Id,
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: user/restore/account
export const restoreAccount = async (user_Id) => {
  try {
    const response = await apiClient.post(`/user/restore/account`, {
      user_id: user_Id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/info/{tourPackage_id}
export const getBookingInfo = async (tourPackageId) => {
  try {
    const response = await apiClient.get(`/booking/info/${tourPackageId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: booking/contact/{user_id}
export const getContactInfo = async (user_id) => {
  try {
    const response = await apiClient.get(`/booking/contact/${user_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: booking/create
export const sendBookingInfo = async (info) => {
  try {
    const response = await apiClient.post(`/booking/create`, info);
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

//GET: booking/user/{userId}
export const getMyBooking = async (userId) => {
  try {
    const response = await apiClient.get(`/booking/user/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//PATCH: booking/update/status
export const setStatus = async (data) => {
  try {
    const response = await apiClient.patch(`/booking/update/status`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//POST: booking/check/status
export const checkStatus = async (userId) => {
  try {
    const response = await apiClient.post(`/booking/check/status`, {
      User_Id: userId,
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

//PATCH: booking/delete/soft
export const softDeleteBooking = async (bookingId) => {
  try {
    const response = await apiClient.patch(`/booking/delete/soft`, {
      bookingId: bookingId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/request/payment
export const getUserPaymentRequest = async () => {
  try {
    const response = await apiClient.get(`/user/request/payment`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/request/payment/pending
export const getPaymentPending = async () => {
  try {
    const response = await apiClient.get(`/user/request/payment/pending`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/request/payment/processed
export const getProcessedPayment = async () => {
  try {
    const response = await apiClient.get(`/user/request/payment/processed`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/request/payment/accepted
export const getAcceptedPayment = async () => {
  try {
    const response = await apiClient.get(`/user/request/payment/accepted`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//GET: user/request/payment/unaccepted
export const getUnacceptedPayment = async () => {
  try {
    const response = await apiClient.get(`/user/request/payment/unaccepted`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
