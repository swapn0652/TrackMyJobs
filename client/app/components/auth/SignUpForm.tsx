import type { SignUpProps } from "@/app/types/auth.types";

export default function SignupForm({ onSignupSuccess }: SignUpProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl text-center">Create Account 🎉</h1>

      <div className="space-y-4 text-lg sm:text-xl">
        <input placeholder="Name" className="w-full p-3 sketch-border bg-white" />
        <input placeholder="Email" className="w-full p-3 sketch-border bg-white" />
        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 sketch-border bg-white"
        />
      </div>

      <button
        onClick={onSignupSuccess}
        className="press-btn w-full p-3 sketch-border bg-yellow-200 text-xl sm:text-2xl"
      >
        Sign Up ✨
      </button>
    </div>
  );
}
