"use client";
import { useState } from "react";
import type { SignupProps } from "@/types/auth.types";
import { useSignup } from "@/hooks/useSignup";

export default function SignupForm({ onSignupSuccess }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignup, loading, error } = useSignup();

  const onSubmit = async () => {
    try {
      await handleSignup(name, email, password);
      onSignupSuccess(email); // move to OTP step
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl text-center">Create Account 🎉</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="space-y-4 text-lg sm:text-xl">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 sketch-border bg-white"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 sketch-border bg-white"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-3 sketch-border bg-white"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="press-btn w-full p-3 sketch-border bg-yellow-200 text-xl sm:text-2xl cursor-pointer"
      >
        {loading ? "Signing up..." : "Sign Up ✨"}
      </button>
    </div>
  );
}
