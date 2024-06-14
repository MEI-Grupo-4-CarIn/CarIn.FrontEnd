import axios from "axios";
import { ApiError } from "@/types/error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || "An unexpected error occurred";
    const apiError: ApiError = { message: errorMessage };
    return Promise.reject(apiError);
  }
);

export default api;
