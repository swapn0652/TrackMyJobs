"use client";

import { useStatus } from "@/hooks/useDashboard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#EF4444", "#F59E0B"];

export default function StatusPieChart() {
  const { data } = useStatus();

  if (!data) return null;

  const formatted = data.map((item: any) => ({
    name: item.status,
    value: item._count.status,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="mb-4 font-semibold">Applications by Status</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {formatted.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}