import type { LoginProps } from "@/app/types/auth.types";

export default function LoginForm({ onNeedVerification }: LoginProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl text-center">Welcome Back ✨</h1>

      <div className="space-y-4 text-lg sm:text-xl">
        <input
          placeholder="Email"
          className="w-full p-3 sketch-border bg-white"
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 sketch-border bg-white"
        />
      </div>

      <button className="press-btn w-full p-3 sketch-border bg-green-200 text-xl sm:text-2xl">
        Sign In 🚀
      </button>

      <button
        onClick={onNeedVerification}
        className="text-center w-full underline text-base sm:text-lg"
      >
        Didn't verify email?
      </button>
    </div>
  );
}
