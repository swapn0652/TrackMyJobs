import { VerifyOtpProps } from "@/app/types/auth.types";

export default function VerifyOTP({ email }: VerifyOtpProps) {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl sm:text-4xl">Verify Email 📬</h1>

      <p className="text-lg sm:text-xl">
        We sent an OTP to
        <br />
        <span className="font-bold break-all">
          {email || "your email"}
        </span>
      </p>

      <input
        placeholder="Enter OTP"
        className="w-full p-3 sketch-border bg-white text-lg sm:text-xl text-center tracking-[6px] sm:tracking-[8px]"
      />

      <button className="press-btn w-full p-3 sketch-border bg-blue-200 text-xl sm:text-2xl">
        Verify & Continue 🚀
      </button>
    </div>
  );
}
