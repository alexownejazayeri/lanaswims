import { LanaSwimsIcon } from "./lanaswims-icon";

export const TopNavigation = () => {
  return (
    <nav className="flex justify-between items-center h-[56px] border-b-[1px] px-8">
      <LanaSwimsIcon />
      <div className="text-2xl font-bold">Open Water Swim Dashboard</div>
      <div className="font-medium">For Mama Lana 🏊</div>
    </nav>
  );
};
