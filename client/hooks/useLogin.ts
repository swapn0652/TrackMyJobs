import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { AxiosError } from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (
    email: string,
    password: string,
    onNeedVerification: (email: string) => void
  ) => {
    try {
      setLoading(true);

      const data = await loginUser(email, password);

      login({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      window.location.href = "/dashboard";

    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const code = err.response?.data?.code;

        if (code === "EMAIL_NOT_VERIFIED") {
          onNeedVerification(email);
          return;
        }

        alert(err.response?.data?.message || "Login failed");
      } else {
        console.log("Unexpected error", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};

