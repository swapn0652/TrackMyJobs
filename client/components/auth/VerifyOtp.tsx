"use client";

import { useForm } from "react-hook-form";
import { useVerifyOtpMutation } from "@/hooks/useAuthMutations";

type FormData = {
  otp: string;
};

export default function VerifyOTP({ email }: any) {
  const { register, handleSubmit } = useForm<FormData>();
  const verifyMutation = useVerifyOtpMutation();

  const onSubmit = async (data: FormData) => {
    await verifyMutation.mutateAsync({ email, otp: data.otp });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-center">
      <h1 className="text-3xl sm:text-4xl">Verify Email 📬</h1>

      <p className="text-lg sm:text-xl">
        We sent an OTP to <br />
        <span className="font-bold break-all">{email}</span>
      </p>

      {verifyMutation.isError && (
        <p className="text-red-600">
          {(verifyMutation.error as any)?.response?.data?.message}
        </p>
      )}

      <input
        {...register("otp", { required: true })}
        placeholder="Enter OTP"
        className="w-full p-3 sketch-border bg-white text-lg sm:text-xl text-center tracking-[8px]"
      />

      <button className="press-btn w-full p-3 sketch-border bg-blue-200 text-xl sm:text-2xl">
        {verifyMutation.isPending ? "Verifying..." : "Verify & Continue 🚀"}
      </button>
    </form>
  );
}
