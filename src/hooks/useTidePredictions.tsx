import { useQuery } from "@tanstack/react-query";

type ITidePredictions = { predictions: { t: string; v: string }[] };

export const useTidePredictions = () => {
  const baseUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["tides"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?product=predictions&date=today&station=9414816&datum=MLLW&units=english&time_zone=lst_ldt&format=json&interval=1`
      );

      return await response.json();
    },
  });

  const result = {
    isPending,
    error,
    data: data as ITidePredictions,
    isFetching,
  };

  return result;
};
