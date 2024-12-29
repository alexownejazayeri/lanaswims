import { ClockArrowDown, ClockArrowUp, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ISpotSummaryProps {
  nextHighTide: string | undefined;
  nextLowTide: string | undefined;
  sunrise: string | undefined;
  sunset: string | undefined;
}

export const SpotSummary: React.FC<ISpotSummaryProps> = ({
  nextHighTide,
  nextLowTide,
  sunrise,
  sunset,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Today's Spot Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center">
            <ClockArrowUp className="mr-2 h-5 stroke-gray-700" />
            <span className="text-base text-gray-700">
              {`Next high tide - ${nextHighTide}`}
            </span>
          </li>
          <li className="flex items-center">
            <ClockArrowDown className="mr-2 h-5 stroke-gray-700" />
            <span className="text-base text-gray-700">{`Next low tide - ${nextLowTide}`}</span>
          </li>
          <li className="flex items-center">
            <Sunrise className="mr-2 h-5 stroke-gray-700" />
            <span className="text-base text-gray-700">{`Sunrise - ${sunrise}`}</span>
          </li>
          <li className="flex items-center">
            <Sunset className="mr-2 h-5 stroke-gray-700" />
            <span className="text-base text-gray-700">
              {`Sunset - ${sunset}`}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
