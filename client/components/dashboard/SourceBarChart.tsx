"use client";

import { useSource } from "@/hooks/useDashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SourceBarChart() {
  const { data } = useSource();

  if (!data) return null;

  const formatted = data.map((item: any) => ({
    source: item.source,
    count: item._count.source,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="mb-4 font-semibold">Applications by Source</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formatted}>
          <XAxis dataKey="source" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}