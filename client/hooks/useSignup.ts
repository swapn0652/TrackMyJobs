"use client";
import { useState } from "react";
import { signupUser, verifyOtp } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import type { LoginResponse } from "@/types/auth.types";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);

  // Step 1: Signup → just send OTP
  const handleSignup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signupUser(name, email, password);
      return res.message; // OTP sent message
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP → log in + store in localStorage + redirect
  const handleVerifyOtp = async (email: string, otp: string) => {
    if (!email) throw new Error("Email is required");

    setLoading(true);
    setError(null);
    try {
      const data: LoginResponse = await verifyOtp(email, otp);

      login(data);

      window.location.href = "/dashboard";

      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, handleVerifyOtp, loading, error };
};
