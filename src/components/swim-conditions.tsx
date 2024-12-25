import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export function SwimConditions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Swim Conditions</CardTitle>
        <CardDescription>Factors to consider for your swim</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" />
            <span>Water temperature: 18°C (64°F) - Suitable for swimming</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" />
            <span>Wave height: 0.5m - Calm conditions</span>
          </li>
          <li className="flex items-center">
            <XCircle className="mr-2 text-red-500" />
            <span>Rip currents: Moderate risk - Exercise caution</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" />
            <span>Visibility: Good - Clear water</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
