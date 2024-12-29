import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { WavesLadder } from "lucide-react";

interface TideCountdownProps {
  nextTideTime: Date | "tomorrow";
  nextTideType: "low" | "high";
}

export function TideCountdown({
  nextTideTime,
  nextTideType,
}: TideCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (nextTideTime === "tomorrow") {
      setTimeLeft({
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextTideTime.getTime() - now;

      // If we've passed the tide time, clear the interval
      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      // Calculate time units
      const hours = String(Math.floor(distance / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((distance % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [nextTideTime]);

  const countdownText = `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`;
  const headerText =
    nextTideTime === "tomorrow"
      ? `Next tide...`
      : `Next ${nextTideType} tide in...`;

  return (
    <Card>
      <CardContent className="h-full p-8">
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center mb-8 text-2xl font-semibold">
            <WavesLadder className="h-8 w-8 mr-2" />
            <span>{headerText}</span>
          </div>

          <div className="font-mono text-5xl font-bold tracking-wider">
            {nextTideTime === "tomorrow" ? "tomorrow" : countdownText}
          </div>
          {nextTideTime !== "tomorrow" && (
            <>
              <Separator className="my-4" />
              <div className="flex justify-between w-full text-sm text-muted-foreground">
                <span className="flex-1 text-center">Hours</span>
                <span className="flex-1 text-center">Minutes</span>
                <span className="flex-1 text-center">Seconds</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
