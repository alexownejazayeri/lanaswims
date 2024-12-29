import "./App.css";

import { MapPin } from "lucide-react";
import { HiLo } from "./components/hi-lo";
import { NextLowTide } from "./components/next-low-tide";
import { SpotSummary } from "./components/spot-summary";
import { TideChart } from "./components/tide-chart";
import { TopNavigation } from "./components/top-navigation";
import { useSunlight } from "./hooks/useSunlight";
import { useTideHiLo } from "./hooks/useTideHiLo";

function App() {
  const { data } = useTideHiLo();
  const { data: sunlightData } = useSunlight();

  const now = new Date().getTime();

  let nextHighTide = "tomorrow";
  let nextLowTide = "tomorrow";

  for (const prediction of data?.predictions ?? []) {
    const currTime = new Date(prediction.t).getTime();

    if (currTime > now && prediction.type === "H") {
      const nextHighTideTime = new Date(prediction.t).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
        }
      );

      nextHighTide = nextHighTideTime;
      break;
    }
  }

  for (const prediction of data?.predictions ?? []) {
    const currTime = new Date(prediction.t).getTime();

    if (currTime > now && prediction.type === "L") {
      const nextLowTideTime = new Date(prediction.t).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
        }
      );

      nextLowTide = nextLowTideTime;
      break;
    }
  }

  const sunrise = sunlightData?.results?.sunrise;
  const sunset = sunlightData?.results?.sunset;

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      <main className="flex flex-col items-center">
        <div className="container py-12 max-w-[1200px]">
          <h1 className="text-4xl font-bold mb-2">
            Berkeley Marina Tide Chart
          </h1>
          <div className="flex flex-row items-center mb-8">
            <MapPin className="text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-400">
              Berkeley, CA • Station #9414816
            </h3>
          </div>
          <div>
            <div className="mb-6">
              <TideChart />
            </div>
            <div className="flex flew-row justify-between gap-6">
              <SpotSummary
                nextHighTide={nextHighTide}
                nextLowTide={nextLowTide}
                sunrise={sunrise}
                sunset={sunset}
              />
              <HiLo />
              <NextLowTide />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
