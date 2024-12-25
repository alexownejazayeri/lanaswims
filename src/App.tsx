import "./App.css";

import { SwimConditions } from "./components/swim-conditions";
import { TideChart } from "./components/tide-chart";
import { WeatherInfo } from "./components/weather-info";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Open Water Swim Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TideChart />
          {/* <SwimTrackingHeatmap /> */}
        </div>
        <div className="space-y-6">
          <WeatherInfo />
          <SwimConditions />
        </div>
      </div>
    </main>
  );
}

export default App;
