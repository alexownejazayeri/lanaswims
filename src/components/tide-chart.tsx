import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { useTideContinuum } from "@/hooks/useTideContinuum";
import { useTideHiLo } from "@/hooks/useTideHiLo";

const convertISOToSimpleHour = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
};

interface IHiLoPrediction {
  t: string;
  v: string;
  type: "H" | "L";
}

export function TideChart() {
  const { data, error, isPending } = useTideContinuum();
  const {
    data: hiLoData,
    error: hiLoError,
    isPending: hiLoIsPending,
  } = useTideHiLo();

  if (isPending || hiLoIsPending) {
    return <div>Loading...</div>;
  }

  if (error || hiLoError) {
    return (
      <div>
        Error: {error?.message} {hiLoError?.message}
      </div>
    );
  }

  const _data = data?.predictions?.map(
    (prediction: { t: string; v: string }) => ({
      time: prediction.t,
      height: prediction.v,
    })
  );

  const chartConfig = {
    height: {
      label: "Tide Height (ft)",
    },
  } satisfies ChartConfig;

  const todaysDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // TODO: Implement tide direction based on current time
  const isRising = true;

  return (
    <Card className="h-[400px] bg-zinc-50">
      <CardHeader className="mb-7">
        <CardTitle className="text-xl font-semibold">{todaysDate}</CardTitle>
        <CardDescription className="text-sm">{`The tide is currently ${
          isRising ? "rising" : "falling"
        } in Berkeley, CA`}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[250px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={_data}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  fill="white"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false} // Hide the axis line
                  interval={14}
                  tickLine={true}
                  tickFormatter={(value, index) => {
                    return index % 2 === 0 && index !== 0
                      ? convertISOToSimpleHour(value)
                      : "";
                  }}
                  tickMargin={8}
                />
                {/* Need to interpolate between the gaps, to have a proper continuum of tide values for the below to work */}
                {/* The problem is that the hilo data might fall outside of the provided tide predictions */}
                {/* <ReferenceLine x={"2024-12-26 08:02"} /> */}

                {hiLoData?.predictions?.map((prediction: IHiLoPrediction) => {
                  return (
                    <ReferenceLine
                      key={prediction.t} // Use unique time as the key
                      x={prediction.t} // ReferenceLine at the time of the tide event
                      stroke={prediction.type === "H" ? "blue" : "red"} // Different colors for high/low tides
                      label={{
                        value: `${
                          prediction.type === "H" ? "High" : "Low"
                        } Tide`,
                        position: "top",
                        fontSize: 12,
                        fill: prediction.type === "H" ? "blue" : "red",
                      }}
                    />
                  );
                })}
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="height"
                  type="monotone"
                  stroke="#000"
                  strokeWidth={1}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
