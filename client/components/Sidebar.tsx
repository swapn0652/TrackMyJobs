"use client";

import { useRouter } from "next/navigation";

export default function Sidebar({ onItemClick }: { onItemClick?: () => void }) {
  const router = useRouter();

  const items = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Jobs", path: "/jobs" },
    { label: "Add Job", path: "/jobs/add-job" },
  ];

  const colors = ["bg-yellow-100", "bg-green-100", "bg-blue-100", "bg-pink-100"];

  return (
    <div className="h-full p-6 space-y-6 bg-white">
      <h2 className="text-3xl mb-8">Track My Jobs</h2>

      <nav className="space-y-4 text-xl">
        {items.map((item, idx) => (
          <div
            key={item.label}
            className={`sketch-border p-3 cursor-pointer press-btn ${colors[idx]}`}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
}