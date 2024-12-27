import { UseQueryResult, useQuery } from "@tanstack/react-query";

type ITidePredictionData = { t: string; v: string }[];
interface ITideContinuum
  extends Pick<UseQueryResult, "isPending" | "error" | "isFetching"> {
  data?: { predictions: ITidePredictionData };
}

export const useTideContinuum: () => ITideContinuum = () => {
  const baseUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["tides"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?product=predictions&date=today&station=9414816&datum=MLLW&units=english&time_zone=lst_ldt&format=json`
      );

      return await response.json();
    },
  });

  return { isPending, error, data, isFetching };
};
