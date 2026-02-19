"use client";

import { useForm } from "react-hook-form";
import { useSignupMutation } from "@/hooks/useAuthMutations";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupForm({ onSignupSuccess }: any) {
  const { register, handleSubmit } = useForm<FormData>();
  const signupMutation = useSignupMutation();

  const onSubmit = async (data: FormData) => {
    await signupMutation.mutateAsync(data);
    onSignupSuccess(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl sm:text-4xl text-center">Create Account 🎉</h1>

      {signupMutation.isError && (
        <p className="text-red-600 text-center">
          {(signupMutation.error as any)?.response?.data?.message}
        </p>
      )}

      <div className="space-y-4 text-lg sm:text-xl">
        <input {...register("name", { required: true })} placeholder="Name" className="w-full p-3 sketch-border bg-white" />
        <input {...register("email", { required: true })} placeholder="Email" className="w-full p-3 sketch-border bg-white" />
        <input {...register("password", { required: true })} type="password" placeholder="Password" className="w-full p-3 sketch-border bg-white" />
      </div>

      <button className="press-btn w-full p-3 sketch-border bg-yellow-200 text-xl sm:text-2xl">
        {signupMutation.isPending ? "Signing up..." : "Sign Up ✨"}
      </button>
    </form>
  );
}
