import "./App.css";

import { MapPin } from "lucide-react";
import { TideChart } from "./components/tide-chart";
import { TopNavigation } from "./components/top-navigation";

function App() {
  return (
    <div className="flex flex-col min-h-screen outline outline-blue-500">
      <TopNavigation />
      <main className="flex flex-col items-center">
        <div className="container pt-12 max-w-[1200px]">
          <h1 className="text-4xl font-bold mb-2">
            Berkeley Marina Tide Chart
          </h1>
          <div className="flex flex-row items-center mb-12">
            <MapPin className="text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-400">
              Berkeley, CA • Station #9414816
            </h3>
          </div>
          <TideChart />
        </div>

        {/* <h1 className="text-3xl font-bold mb-6">Lana Swims Berkeley Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TideChart />
        </div>
        <div className="flex flex-row justify-between outline outline-red-500">
          <WeatherInfo />
        </div>
      </div> */}
      </main>
    </div>
  );
}

export default App;
