import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",  // 🔁 your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Automatically attach token before every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
