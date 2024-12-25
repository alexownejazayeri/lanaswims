import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, Sun, Thermometer, Wind } from "lucide-react";

export function WeatherInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Information</CardTitle>
        <CardDescription>Current weather conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center">
            <Thermometer className="mr-2" />
            <span>Temperature: 22°C</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2" />
            <span>Wind: 10 km/h NE</span>
          </div>
          <div className="flex items-center">
            <Sun className="mr-2" />
            <span>UV Index: 6 (High)</span>
          </div>
          <div className="flex items-center">
            <Cloud className="mr-2" />
            <span>Cloud Cover: 20%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
