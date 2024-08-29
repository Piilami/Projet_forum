import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/auth/isConnected`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.user;
};
