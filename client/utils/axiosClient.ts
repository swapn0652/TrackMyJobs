import { useAuthStore } from "@/store/authStore";
import { useLoaderStore } from "@/store/useLoaderStore";
import axios from "axios";

// console.log("base URL: ", process.env.NEXT_PUBLIC_API_BASE_URL);

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});


axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  useLoaderStore.getState().startLoading();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axiosClient.interceptors.response.use(
  (response) => {
    useLoaderStore.getState().stopLoading();
    return response;
  },
  (error) => {
    useLoaderStore.getState().stopLoading();
    return Promise.reject(error);
  }
);