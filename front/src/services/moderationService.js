import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(`HTTP error! Status: ${response.status}`);
};

const handleError = (error) => {
  if (error.response) {
    console.error("API Error Response Data:", error.response.data);
    throw new Error(error.response.data.message || "Unknown API Error");
  } else if (error.request) {
    console.error("API Error Request Data:", error.request);
    throw new Error("No response received from the API");
  } else {
    console.error("API Error Message:", error.message);
    throw new Error(error.message || "Unknown Error");
  }
};

export const reportPost = async (postId, context) => {
  try {
    const response = await apiClient.post(`/admin/reportpost`, {
      postId,
      context,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const reportUser = async (userId, context) => {
  try {
    const response = await apiClient.post(`/admin/reportuser`, {
      userId,
      context,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getReportedPosts = async () => {
  try {
    const response = await apiClient.get(`/admin/getpostreported`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getReportedUsers = async () => {
  try {
    const response = await apiClient.get(`/admin/getuserreported`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
