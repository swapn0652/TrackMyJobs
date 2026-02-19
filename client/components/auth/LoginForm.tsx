"use client";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/useAuthMutations";
import { AxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm({ onNeedVerification }: any) {
  const { register, handleSubmit } = useForm<FormData>();
  const loginMutation = useLoginMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const code = err.response?.data?.code;

        if (code === "EMAIL_NOT_VERIFIED") {
          onNeedVerification(data.email);
          return;
        }

        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl sm:text-4xl text-center">Welcome Back ✨</h1>

      <div className="space-y-4 text-lg sm:text-xl">
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-3 sketch-border bg-white"
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full p-3 sketch-border bg-white"
        />
      </div>

      <button
        type="submit"
        className="press-btn w-full p-3 sketch-border bg-green-200 text-xl sm:text-2xl"
      >
        {loginMutation.isPending ? "Signing in..." : "Sign In 🚀"}
      </button>

      <button
        type="button"
        onClick={() => onNeedVerification("")}
        className="text-center w-full underline text-base sm:text-lg"
      >
        Didn't verify email?
      </button>
    </form>
  );
}
