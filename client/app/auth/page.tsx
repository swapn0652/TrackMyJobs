"use client";

import { useState } from "react";
import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignUpForm";
import VerifyOTP from "../../components/auth/VerifyOtp";

type Mode = "login" | "signup" | "verify";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [emailForVerification, setEmailForVerification] = useState("");

  return (
    <AuthCard>
      {mode === "login" && (
        <>
          <LoginForm
            onNeedVerification={(email) => {
              setEmailForVerification(email);
              setMode("verify");
            }}
          />

          <p className="text-center mt-6">
            New here?{" "}
            <button className="underline" onClick={() => setMode("signup")}>
              Create account
            </button>
          </p>
        </>
      )}

      {mode === "signup" && (
        <>
          <SignupForm
            onSignupSuccess={(email) => {
              setEmailForVerification(email);
              setMode("verify");
            }}
          />


          <p className="text-center mt-6">
            Already have an account?{" "}
            <button className="underline" onClick={() => setMode("login")}>
              Sign in
            </button>
          </p>
        </>
      )}

      {mode === "verify" && <VerifyOTP email={emailForVerification} />}
    </AuthCard>
  );
}

