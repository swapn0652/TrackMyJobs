"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/auth";

  return (
    <div className="flex h-full">
      {!isAuthPage && (
        <aside className="hidden md:block w-[260px] border-r-2 border-black">
          <Sidebar />
        </aside>
      )}

      <div className="flex-1 flex flex-col">
        <Navbar />

        <ReactQueryProvider>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
            <Toaster position="top-right" richColors />
            <GlobalLoader />
          </main>
        </ReactQueryProvider>
      </div>
    </div>
  );
}