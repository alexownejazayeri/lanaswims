import { useQuery } from "@tanstack/react-query";

export interface ITideHiLo {
  predictions: {
    t: string;
    v: string;
    type: "H" | "L";
  }[];
}

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

  const result = {
    isPending,
    error,
    data: data as ITideHiLo,
    isFetching,
  };

  return result;
};
