import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser, verifyOtp } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),

    onSuccess: (data) => {
      login(data);
      toast.success("Welcome back 🎉 Logged in successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
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
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyOtp(email, otp),

    onSuccess: (data) => {
      login(data);
      toast.success("Account verified 🎉 Welcome!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    },
  });
};
