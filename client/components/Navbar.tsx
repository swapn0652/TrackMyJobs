"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  // Route → Title map
  const routeTitles: Record<string, string> = {
    "/dashboard": "Dashboard ",
    "/jobs": "My Jobs",
    "/add-job": "Add New Job",
  };

  // Handle dynamic routes like /jobs/123
  const getTitle = () => {
    if (pathname.startsWith("/jobs/") && pathname !== "/jobs") {
      return "Job Details";
    }

    return routeTitles[pathname] || "Track My Jobs ✨";
  };

  return (
    <>
      <nav className="h-16 border-b-2 border-black flex items-center justify-between px-4 sm:px-6 bg-white">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden press-btn sketch-border p-2 bg-yellow-200 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>

          <h1 className="text-2xl sm:text-3xl">
            {getTitle()}
          </h1>
        </div>

        <div className="text-lg sm:text-xl">
          {user ? `👤 ${user.name}` : "👤"}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`fixed left-0 top-0 z-50 h-full w-[260px] bg-white border-r-2 border-black
            transform transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar />
        </div>
      </div>
    </>
  );
}