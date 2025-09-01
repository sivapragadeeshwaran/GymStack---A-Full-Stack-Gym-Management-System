import axios from "axios";

const BASE_URL = "http://localhost:5000/"; // dev tunnel / production

const axiosInstance = axios.create({
  baseURL: BASE_URL, // 🔁 your backend API
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
