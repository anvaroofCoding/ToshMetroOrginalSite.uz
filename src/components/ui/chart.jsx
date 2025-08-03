"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

export function ChartContainer({ type = "line", data, xKey, yKey, className }) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey={yKey} fill="#3b82f6" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-md border bg-white p-2 shadow-sm text-sm">
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-gray-600">
        {payload.map((entry, index) => (
          <div key={index}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
