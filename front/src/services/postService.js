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
  throw new Error(`HTTP error! status: ${response.status}`);
};

const handleError = (error) => {
  if (error.response) {
    console.error("API Error Response Data:", error.response.data);
    console.error("API Error Response Status:", error.response.status);
    console.error("API Error Response Headers:", error.response.headers);
    throw new Error(error.response.data.message || "Unknown API Error");
  } else if (error.request) {
    console.error("API Error Request Data:", error.request);
    throw new Error("No response received from the API");
  } else {
    console.error("API Error Message:", error.message);
    throw new Error(error.message || "Unknown Error");
  }
};

export const getPosts = async () => {
  try {
    const response = await apiClient.get("/posts/");
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await apiClient.post("/posts/post", postData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await apiClient.patch(`/posts/${postId}`, postData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const reportPost = async (postId, context) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/report`, {
      context,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const votePost = async (postId, voteType) => {
  try {
    const response = await apiClient.post(`/posts/${postId}/votes`, {
      type: voteType,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const commentOnPost = async (postId, commentData) => {
  try {
    const response = await apiClient.post(
      `/posts/${postId}/comment`,
      commentData
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
