import Cookies from "js-cookie";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = getAuthToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const getAuthToken = () => {
  const token = Cookies.get("authToken");
  return token;
};

export default axiosInstance;