"use client";
import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import type { VerifyOtpProps } from "@/types/auth.types";

export default function VerifyOTP({ email }: VerifyOtpProps) {
  const [otp, setOtp] = useState("");
  const { handleVerifyOtp, loading, error } = useSignup();

  const onSubmit = async () => {
    if (!email) return;

    try {
      await handleVerifyOtp(email, otp); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl sm:text-4xl">Verify Email 📬</h1>

      <p className="text-lg sm:text-xl">
        We sent an OTP to
        <br />
        <span className="font-bold break-all">{email}</span>
      </p>

      {error && <p className="text-red-600">{error}</p>}

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full p-3 sketch-border bg-white text-lg sm:text-xl text-center tracking-[6px] sm:tracking-[8px]"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="press-btn w-full p-3 sketch-border bg-blue-200 text-xl sm:text-2xl cursor-pointer"
      >
        {loading ? "Verifying..." : "Verify & Continue 🚀"}
      </button>
    </div>
  );
}
