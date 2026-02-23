"use client";

import { useSummary } from "@/hooks/useDashboard";

export default function KPISection() {
  const { data } = useSummary();

  if (!data) return null;

  const cards = [
    { label: "Total Applications", value: data.totalApplications },
    { label: "Offer Rate", value: `${data.offerRate}%` },
    { label: "Interview Rate", value: `${data.interviewRate}%` },
    { label: "Rejection Rate", value: `${data.rejectionRate}%` },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white p-6 rounded-2xl shadow-md sketch-border"
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <h3 className="text-2xl font-semibold mt-2">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}