import { Card, CardContent } from "./ui/card";

import { useTideHiLo } from "@/hooks/useTideHiLo";
import { Triangle } from "lucide-react";
import { Separator } from "./ui/separator";

interface TideItemProps {
  type: "H" | "L";
  time: string;
  height: string;
  isLastItem: boolean;
}

const TideItem: React.FC<TideItemProps> = ({
  type,
  time,
  height,
  isLastItem,
}) => {
  return (
    <div className="flex flex-row items-center">
      {type === "H" ? (
        <Triangle className="h-4 w-4 mr-6 fill-black stroke-none" />
      ) : (
        <Triangle className="h-4 w-4 mr-6 fill-black rotate-180 stroke-none" />
      )}
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row items-center justify-between">
          <span
            className={`${
              type === "H" ? "text-green-500" : "text-red-500"
            } flex flex-row justify-start w-10`}
          >
            {type === "H" ? "High" : "Low"}
          </span>
          <span className="flex flex-row justify-center w-20">
            {new Date(time).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <span className="text-right flex flex-row justify-end w-10">{`${Number(
            height
          ).toFixed(1)}ft`}</span>
        </div>
        {!isLastItem ? <Separator className="relative top-3" /> : null}
      </div>
    </div>
  );
};

export const HiLo = () => {
  const { data } = useTideHiLo();

  return (
    <Card className="flex-1">
      <CardContent className="p-8">
        <div className="flex flex-col gap-6">
          {data?.predictions?.map((prediction, index) => (
            <TideItem
              key={prediction.t}
              type={prediction?.type}
              time={prediction?.t}
              height={prediction?.v}
              isLastItem={index === data.predictions.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
