import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getUser = async (userId) => {
  const response = await axios.get(`${apiUrl}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const updateUser = async (userId, userData) => {
  const response = await axios.patch(`${apiUrl}/user/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const deleteUser = async (userId) => {
  await axios.delete(`${apiUrl}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export { getUser, updateUser, deleteUser };
