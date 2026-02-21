"use client";

import dynamic from "next/dynamic";

const Circles = dynamic(
  () => import("react-loader-spinner").then((mod) => mod.Circles),
  { ssr: false }
);

export default function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <Circles height="80" width="80" color="#4ade80" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10">
      <Circles height="60" width="60" color="#4ade80" ariaLabel="loading" />
    </div>
  );
}