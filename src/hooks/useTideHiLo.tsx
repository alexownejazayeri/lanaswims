import { useQuery } from "@tanstack/react-query";

export const useTideHiLo = () => {
  const baseUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["hilo"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?product=predictions&date=today&format=json&interval=hilo&time_zone=LST_LDT&units=english&datum=MLLW&station=9414816`
      );

      return await response.json();
    },
  });

  return { isPending, error, data, isFetching };
};
