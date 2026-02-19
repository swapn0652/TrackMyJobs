import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser, verifyOtp } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export const useLoginMutation = () => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),

    onSuccess: (data) => {
      login(data);
      window.location.href = "/dashboard";
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => signupUser(name, email, password),
  });
};

export const useVerifyOtpMutation = () => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyOtp(email, otp),

    onSuccess: (data) => {
      login(data);
      window.location.href = "/dashboard";
    },
  });
};
