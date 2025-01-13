import axios from 'axios';
const BACKEND_BASE_URL = import.meta.env.VITE_HOST_API;
// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true
});

export default axiosInstance;
