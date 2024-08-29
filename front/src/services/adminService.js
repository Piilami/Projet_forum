import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const adminService = {
  getUsersReported: () => {
    return axios.get(`${API_URL}/admin/getuserreported`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getPostsReported: () => {
    return axios.get(`${API_URL}/admin/getpostreported`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  moderateUser: (userId, actionType) => {
    return axios.put(
      `${API_URL}/admin/banuser/${userId}`,
      { action: actionType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  moderatePost: (postId) => {
    return axios.delete(`${API_URL}/admin/deletepost/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  approuvePost: (postId) => {
    return axios.delete(`${API_URL}/admin/approuvepost/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  createUser: (userData) => {
    return axios.post(`${API_URL}/admin/createuser`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default adminService;
