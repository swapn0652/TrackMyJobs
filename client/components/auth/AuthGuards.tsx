"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const isAuthPage = pathname === "/auth";

    if (!user && !isAuthPage) {
      router.replace("/auth");
    }

    if (user && isAuthPage) {
      router.replace("/dashboard");
    }
  }, [user, pathname]);

  return <>{children}</>;
}