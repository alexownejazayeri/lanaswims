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
  YAxis,
} from "recharts";

import { useTideHiLo } from "@/hooks/useTideHiLo";
import { useTidePredictions } from "@/hooks/useTidePredictions";
import { generateHourlyTicks } from "@/util/graphing";
import { convertISOToUnix } from "@/util/time";
import moment from "moment";

interface IHiLoPrediction {
  t: string;
  v: string;
  type: "H" | "L";
}

export function TideChart() {
  const { data, error, isPending } = useTidePredictions();
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

  const _data =
    data?.predictions?.map((prediction) => ({
      time: convertISOToUnix(prediction.t),
      height: Number(prediction.v),
    })) ?? [];

  const formattedHiLoData = hiLoData?.predictions?.map(
    (prediction: IHiLoPrediction) => ({
      time: convertISOToUnix(prediction.t),
      height: Number(prediction.v),
    })
  );

  const combinedData = [..._data, ...formattedHiLoData].sort(
    (a, b) => a.time - b.time
  );

  const tideHeights = _data.map((d) => d.height);

  const maxTideHeight = Math.max(...tideHeights);
  const minTideHeight = Math.min(...tideHeights);

  const range = [Math.floor(minTideHeight) - 1, Math.ceil(maxTideHeight) + 8];

  const chartConfig = {
    height: {
      // label: "Tide Height (ft)",
    },
  } satisfies ChartConfig;

  const todaysDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const now = new Date().getTime();

  const isRising = true;

  return (
    <Card className="h-[400px]">
      <CardHeader className="mb-0">
        <CardTitle className="text-xl font-semibold">{todaysDate}</CardTitle>
        <CardDescription className="text-sm">{`The tide is currently ${
          isRising ? "rising" : "falling"
        } at the Berkeley Marina`}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[250px] p-0 overflow-visible">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={combinedData}
                margin={{
                  top: 18,
                  left: 20,
                  right: 20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  fill="white"
                />
                <XAxis
                  dataKey="time"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  ticks={generateHourlyTicks()}
                  tickFormatter={(value) => {
                    const hour = moment(value).hour();
                    return hour % 3 === 0 && hour !== 0
                      ? moment(value).format("ha")
                      : "";
                  }}
                  tickLine={{
                    stroke: "#ccc",
                    strokeWidth: 1,
                    transform: "translate(0, -8)",
                  }}
                  axisLine={false}
                />
                <YAxis
                  hide={true}
                  domain={range}
                  tickLine={false}
                  axisLine={false}
                />
                {/* TODO: add these reference areas for sunrise/sunset */}
                {/* <ReferenceArea
                  x1={combinedData[0].time}
                  x2={combinedData[100].time}
                  y1={range[0]}
                  y2={range[1]}
                />
                <ReferenceArea
                  x1={combinedData[800].time}
                  x2={combinedData[combinedData.length - 1].time}
                  y1={range[0]}
                  y2={range[1]}
                /> */}
                <ReferenceLine
                  x={now}
                  segment={[
                    { x: now, y: range[0] },
                    { x: now, y: range[1] },
                  ]}
                  label={{
                    position: "top",
                    value: "Now",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                />
                {hiLoData?.predictions?.map((prediction: IHiLoPrediction) => {
                  return (
                    <ReferenceLine
                      key={prediction.t}
                      stroke={prediction.type === "H" ? "#66D74F" : "#F14B4B"}
                      label={{
                        value: `${prediction.v}ft`,
                        position: "top",
                        fontSize: 12,
                        fontWeight: "bold",
                        offset: 10,
                        fill: "#333",
                      }}
                      segment={[
                        {
                          x: convertISOToUnix(prediction.t),
                          y: range[0],
                        },
                        {
                          x: convertISOToUnix(prediction.t),
                          y: Number(prediction.v),
                        },
                      ]}
                    />
                  );
                })}
                <ChartTooltip
                  content={
                    <ChartTooltipContent nameKey="height" indicator="line" />
                  }
                />
                <Area
                  dataKey="height"
                  baseValue={"dataMin"}
                  type="monotone"
                  stroke="#555"
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
