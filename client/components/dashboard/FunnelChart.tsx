"use client";

import { useFunnel } from "@/hooks/useDashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#FBBF24", "#EF4444"];

export default function FunnelChart() {
  const { data } = useFunnel();

  if (!data) return null;

  const sortedData = [...data].reverse();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="mb-4 font-semibold">Application Funnel</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="stage" width={120} />
          <Tooltip />

          <Bar
            dataKey="count"
            radius={6} // single number works
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}