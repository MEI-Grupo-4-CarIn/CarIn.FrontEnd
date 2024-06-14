import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ApiError } from "@/types/error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired or will expire in the next minute
    if (decodedToken.exp - currentTime < 60) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL}/auth/refreshToken`, { refreshToken });
          const newToken = response.data.token;
          localStorage.setItem("token", newToken);
          const decodedNewToken: any = jwtDecode(newToken);
          const user = {
            id: decodedNewToken.id,
            email: decodedNewToken.email,
            firstName: decodedNewToken.firstName,
            lastName: decodedNewToken.lastName,
            role: decodedNewToken.role,
          };
          // Set the new token to the header and continue
          config.headers.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          onRefreshed(newToken);
          refreshSubscribers = [];
        } catch (error) {
          isRefreshing = false;
          // Handle token refresh error
          return Promise.reject(error);
        }
      } else {
        // If token is being refreshed, wait for it to be done
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
