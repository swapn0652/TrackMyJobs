import { LoginResponse } from "@/types/auth.types";
import { axiosClient } from "@/utils/axiosClient";

export const loginUser = async (email: string, password: string) => {
  const res = await axiosClient.post("/api/auth/login", {
    email,
    password,
  });

  return res.data;
};


export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  const res = await axiosClient.post("/api/auth/signup", {
    name,
    email,
    password,
  });

  return res.data; 
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<LoginResponse> => {
  const res = await axiosClient.post("/api/auth/verify-otp", { email, otp });
  return res.data; 
};