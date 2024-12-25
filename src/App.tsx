import "./App.css";

import { TopNavigation } from "./components/top-navigation";

function App() {
  return (
    <div className="flex flex-col min-h-screen outline outline-blue-500">
      <TopNavigation />
      <main>
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
