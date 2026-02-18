"use client";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import type { LoginProps } from "@/types/auth.types";

export default function LoginForm({ onNeedVerification }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useLogin();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl text-center">Welcome Back ✨</h1>

      <div className="space-y-4 text-lg sm:text-xl">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 sketch-border bg-white"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-3 sketch-border bg-white"
        />
      </div>

      <button
        onClick={() => handleLogin(email, password, onNeedVerification)}
        className="press-btn w-full p-3 sketch-border bg-green-200 text-xl sm:text-2xl"
      >
        {loading ? "Signing in..." : "Sign In 🚀"}
      </button>


      <button
        onClick={() => onNeedVerification(email)}
        className="text-center w-full underline text-base sm:text-lg"
      >
        Didn't verify email?
      </button>

    </div>
  );
}
