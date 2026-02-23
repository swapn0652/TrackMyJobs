import { useAuthStore } from "@/store/auth.store";
import { useLoaderStore } from "@/store/useLoader.store";
import axios from "axios";


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

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);