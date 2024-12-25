"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "00:00", height: 1.2 },
  { time: "03:00", height: 2.5 },
  { time: "06:00", height: 1.8 },
  { time: "09:00", height: 0.5 },
  { time: "12:00", height: 1.0 },
  { time: "15:00", height: 2.2 },
  { time: "18:00", height: 1.9 },
  { time: "21:00", height: 0.8 },
];

export function TideChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tide Chart</CardTitle>
        <CardDescription>Today's tide levels</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="height"
                stroke="#0ea5e9"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
