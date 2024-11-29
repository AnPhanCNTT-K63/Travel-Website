import apiClient from "../AxiosConfiguration";
import handleApiError from "../ErrorHandlle";

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

//POST: user/profile/update
export const updateUserProfile = async (profile) => {
  try {
    const response = await apiClient.put(`/user/profile/update`, {
      profile: profile,
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
