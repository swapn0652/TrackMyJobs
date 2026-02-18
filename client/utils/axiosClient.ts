import { useAuthStore } from "@/store/authStore";
import axios from "axios";

console.log("base URL: ", process.env.NEXT_PUBLIC_API_BASE_URL);

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});


axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
