"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTides } from "@/hooks/useTides";

const convertISOToTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

export function TideChart() {
  const { data, error, isPending } = useTides();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const _data = data.predictions.map(
    (prediction: { t: string; v: string }) => ({
      time: convertISOToTime(prediction.t),
      height: prediction.v,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tide Chart</CardTitle>
        <CardDescription>Today's tide levels</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={_data}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="height"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
