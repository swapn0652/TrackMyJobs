import { create } from "zustand";
import type { AuthState, LoginResponse } from "@/types/auth.types";

const storedAuth =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("auth") || "null")?.data
    : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: storedAuth?.user || null,
  accessToken: storedAuth?.accessToken || null,
  refreshToken: storedAuth?.refreshToken || null,

  login: (data: LoginResponse) => {
    localStorage.setItem("auth", JSON.stringify(data));
    set(data);
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));
